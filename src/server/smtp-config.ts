import { loadServerEnv } from "./load-env";

export type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  fromName: string;
  fromEmail: string;
  to: string[];
};

function readEnv(name: string): string | undefined {
  const value = process.env[name];
  return value?.trim() || undefined;
}

function required(name: string): string {
  const value = readEnv(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getSmtpConfig(): SmtpConfig {
  loadServerEnv();

  const toRaw =
    readEnv("CONTACT_TO") ??
    "omegafireministries06@gmail.com,info@ofmmontreal.com";

  return {
    host: readEnv("SMTP_HOST") ?? "ofmmontreal.com",
    port: Number(readEnv("SMTP_PORT") ?? "465"),
    user: readEnv("SMTP_USER") ?? "info@ofmmontreal.com",
    pass: required("SMTP_PASSWORD"),
    fromName: readEnv("SMTP_FROM_NAME") ?? "Omega Fire Ministries Montreal",
    fromEmail: readEnv("SMTP_FROM_EMAIL") ?? "info@ofmmontreal.com",
    to: toRaw
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean),
  };
}
