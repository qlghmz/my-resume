import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./load.mjs";

let loaded = false;

/**
 * Lightweight .env loader (no dependency). Does not override existing process.env.
 * Reads `.env` then `.env.local` from repo root.
 */
export function loadEnv() {
  if (loaded) return;
  loaded = true;
  for (const name of [".env", ".env.local"]) {
    const file = path.join(ROOT, name);
    if (!fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq <= 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  }
}

export function requireEnv(name) {
  loadEnv();
  const v = process.env[name];
  if (!v) {
    throw new Error(
      `Missing ${name}. Put it in .env (see .env.example) or export it in your shell.`,
    );
  }
  return v;
}
