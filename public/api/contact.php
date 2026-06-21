<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

require __DIR__ . '/vendor/autoload.php';

$configPath = __DIR__ . '/config.php';
if (!is_readable($configPath)) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Email is not configured on the server. Please try again later or call us directly.',
    ]);
    exit;
}

/** @var array<string, mixed> $config */
$config = require $configPath;

$raw = file_get_contents('php://input') ?: '';
/** @var array<string, mixed>|null $data */
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid form data.']);
    exit;
}

// Honeypot
if (!empty($data['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$phone = trim((string) ($data['phone'] ?? ''));
$subject = trim((string) ($data['subject'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

if (strlen($name) < 2 || strlen($name) > 120) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Please enter your name.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 200) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Please enter a valid email address.']);
    exit;
}

if (strlen($phone) > 40) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Phone number is too long.']);
    exit;
}

if (strlen($subject) < 2 || strlen($subject) > 200) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Please enter a subject.']);
    exit;
}

if (strlen($message) < 10 || strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Please enter a longer message.']);
    exit;
}

$recipients = $config['to'] ?? [];
if (!is_array($recipients) || count($recipients) === 0) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Email is not configured on the server.']);
    exit;
}

$phoneLine = $phone !== '' ? $phone : '—';
$textBody = implode("\n", [
    'New message from the OFM Montreal website',
    '',
    "Name: {$name}",
    "Email: {$email}",
    "Phone: {$phoneLine}",
    "Subject: {$subject}",
    '',
    'Message:',
    $message,
]);

$htmlBody = sprintf(
    '<h2>New contact form message</h2>
    <p><strong>Name:</strong> %s</p>
    <p><strong>Email:</strong> %s</p>
    <p><strong>Phone:</strong> %s</p>
    <p><strong>Subject:</strong> %s</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">%s</p>',
    htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
    htmlspecialchars($email, ENT_QUOTES, 'UTF-8'),
    htmlspecialchars($phoneLine, ENT_QUOTES, 'UTF-8'),
    htmlspecialchars($subject, ENT_QUOTES, 'UTF-8'),
    nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')),
);

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = (string) ($config['smtp_host'] ?? 'ofmmontreal.com');
    $mail->SMTPAuth = true;
    $mail->Username = (string) ($config['smtp_user'] ?? '');
    $mail->Password = (string) ($config['smtp_pass'] ?? '');
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = (int) ($config['smtp_port'] ?? 465);
    $mail->CharSet = PHPMailer::CHARSET_UTF8;

    $fromEmail = (string) ($config['from_email'] ?? $mail->Username);
    $fromName = (string) ($config['from_name'] ?? 'Omega Fire Ministries Montreal');
    $mail->setFrom($fromEmail, $fromName);
    $mail->addReplyTo($email, $name);

    foreach ($recipients as $to) {
        if (is_string($to) && $to !== '') {
            $mail->addAddress($to);
        }
    }

    $mail->isHTML(true);
    $mail->Subject = '[OFM Montreal] ' . $subject;
    $mail->Body = $htmlBody;
    $mail->AltBody = $textBody;

    $mail->send();

    echo json_encode(['ok' => true]);
} catch (Exception $e) {
    error_log('Contact form error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'We could not send your message. Please try again or call us directly.',
    ]);
}
