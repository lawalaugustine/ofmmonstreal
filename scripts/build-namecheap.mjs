/**
 * Builds a static site package for Namecheap shared hosting (cPanel / public_html).
 *
 * Output:
 *   deploy/namecheap-upload/   — upload these files into public_html
 *   deploy/ofm-montreal-site.zip — same folder as a zip
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = path.join(root, "dist", "client");
const uploadDir = path.join(root, "deploy", "namecheap-upload");
const zipPath = path.join(root, "deploy", "ofm-montreal-site.zip");
const htaccessSrc = path.join(root, "deploy", ".htaccess");

console.log("Building static site for Namecheap hosting...\n"); 

execSync("npx vite build", {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, NAMECHEAP_BUILD: "1" },
});

if (!fs.existsSync(path.join(clientDir, "index.html"))) {
  console.error("Build failed: dist/client/index.html not found.");
  process.exit(1);
}

console.log("\nPackaging for upload...");

fs.rmSync(uploadDir, { recursive: true, force: true });
fs.mkdirSync(path.dirname(uploadDir), { recursive: true });
fs.cpSync(clientDir, uploadDir, { recursive: true });
fs.copyFileSync(htaccessSrc, path.join(uploadDir, ".htaccess"));

// Do not ship secrets — church creates config.php on the server
const configPhp = path.join(uploadDir, "api", "config.php");
if (fs.existsSync(configPhp)) {
  fs.rmSync(configPhp);
}

fs.rmSync(zipPath, { force: true });
if (process.platform === "win32") {
  execSync(
    `powershell -NoProfile -Command "Compress-Archive -Path '${uploadDir.replace(/'/g, "''")}\\*' -DestinationPath '${zipPath.replace(/'/g, "''")}' -Force"`,
    { stdio: "inherit" },
  );
} else {
  execSync(`cd "${uploadDir}" && zip -r "${zipPath}" .`, { stdio: "inherit" });
}

console.log("\nDone!");
console.log(`  Folder: ${uploadDir}`);
console.log(`  Zip:    ${zipPath}`);
console.log("\nUpload steps (Namecheap cPanel):");
console.log("  1. File Manager → public_html → delete old site files (backup first)");
console.log("  2. Upload everything inside deploy/namecheap-upload/ (or extract the zip)");
console.log("  3. api/ → copy config.example.php to config.php and set SMTP password");
console.log("  4. Visit your domain — homepage should load with styles and images\n");
