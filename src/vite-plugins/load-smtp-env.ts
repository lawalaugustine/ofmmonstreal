import type { Plugin } from "vite";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

function applyEnvFile(filename: string) {
  const path = resolve(process.cwd(), filename);
  if (!existsSync(path)) return;

  const content = readFileSync(path, "utf8");
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

    if (key && !process.env[key]) process.env[key] = value;
  }
}

/** Loads `.dev.vars` / `.env` into process.env when Vite starts (fixes `vite dev` without Cloudflare plugin). */
export function loadSmtpEnvPlugin(): Plugin {
  return {
    name: "ofm-load-smtp-env",
    config() {
      applyEnvFile(".dev.vars");
      applyEnvFile(".env");
    },
  };
}
