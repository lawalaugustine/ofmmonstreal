import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

let loaded = false;

/** Parse .dev.vars / .env lines (supports quoted values so `#` in passwords works). */
function parseEnvFile(content: string): Record<string, string> {
  const result: Record<string, string> = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const eq = line.indexOf("=");
    if (eq === -1) continue;

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    } else {
      const hash = value.indexOf("#");
      if (hash !== -1) value = value.slice(0, hash).trim();
    }

    if (key) result[key] = value;
  }

  return result;
}

/** Load SMTP and contact env from project root (dev / Node SSR). No-op if already set. */
export function loadServerEnv(): void {
  if (loaded) return;
  loaded = true;

  if (typeof process === "undefined") return;

  const root = process.cwd();
  for (const file of [".dev.vars", ".env"]) {
    const path = resolve(root, file);
    if (!existsSync(path)) continue;

    try {
      const vars = parseEnvFile(readFileSync(path, "utf8"));
      for (const [key, value] of Object.entries(vars)) {
        if (!process.env[key]) process.env[key] = value;
      }
    } catch {
      /* ignore read errors */
    }
  }
}
