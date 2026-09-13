import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONFIG_PATH = path.join(ROOT, "data", "analytics.js");
const DOMAIN = "resume.tensorview.cc";
const API = "https://api.umami.is/v1/us";

function parseArgs() {
  const out = { deploy: false, websiteId: "", apiKey: "" };
  for (const arg of process.argv.slice(2)) {
    if (arg === "--deploy") out.deploy = true;
    else if (arg.startsWith("--website-id=")) out.websiteId = arg.slice(13).trim();
    else if (arg.startsWith("--api-key=")) out.apiKey = arg.slice(10).trim();
  }
  out.apiKey ||= process.env.UMAMI_API_KEY || "";
  return out;
}

async function apiJson(url, apiKey, init) {
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...(init?.headers || {}),
    },
  });
  const text = await res.text();
  let body;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  if (!res.ok) {
    const detail = typeof body === "string" ? body : JSON.stringify(body);
    throw new Error(`Umami API ${res.status}: ${detail}`);
  }
  return body;
}

function websiteList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.websites)) return payload.websites;
  return [];
}

async function resolveWebsiteId(apiKey) {
  const list = await apiJson(`${API}/websites`, apiKey);
  const found = websiteList(list).find(
    (w) => w.domain === DOMAIN || w.domains?.includes?.(DOMAIN),
  );
  if (found?.id) return found.id;

  const created = await apiJson(`${API}/websites`, apiKey, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "resume", domain: DOMAIN }),
  });
  const id = created?.id || created?.websiteId;
  if (!id) throw new Error("Umami API did not return a website id");
  return id;
}

function patchConfig(websiteId) {
  let src = fs.readFileSync(CONFIG_PATH, "utf8");
  if (!/enabled:\s*false/.test(src)) {
    src = src.replace(/enabled:\s*true/, "enabled: true");
  } else {
    src = src.replace(/enabled:\s*false/, "enabled: true");
  }
  if (!/websiteId:\s*"[^"]*"/.test(src)) {
    throw new Error("Unexpected analytics.js format");
  }
  src = src.replace(/websiteId:\s*"[^"]*"/, `websiteId: "${websiteId}"`);
  fs.writeFileSync(CONFIG_PATH, src);
}

function deploy() {
  const wrangler = path.join(ROOT, "node_modules", "wrangler", "bin", "wrangler.js");
  const r = spawnSync(process.execPath, [wrangler, "deploy"], {
    cwd: ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

async function main() {
  const { deploy: doDeploy, websiteId: argId, apiKey } = parseArgs();
  let websiteId = argId;

  if (!websiteId) {
    if (!apiKey) {
      console.error(`Missing Umami credentials.

Option A — API key (creates site if missing):
  $env:UMAMI_API_KEY="your-key"; npm run setup:analytics -- --deploy

Option B — Website ID from dashboard:
  npm run setup:analytics -- --website-id=<uuid> --deploy

Get API key: https://cloud.umami.is → profile → Settings → API keys → Create key`);
      process.exit(1);
    }
    websiteId = await resolveWebsiteId(apiKey);
    console.log(`Website ready: ${DOMAIN} → ${websiteId}`);
  }

  patchConfig(websiteId);
  console.log(`Updated ${path.relative(ROOT, CONFIG_PATH)} (enabled: true)`);

  if (doDeploy) {
    console.log("Deploying to Cloudflare…");
    deploy();
    console.log("Done. Visit https://resume.tensorview.cc and check Umami Realtime.");
  } else {
    console.log("Next: npm run setup:analytics -- --website-id=" + websiteId + " --deploy");
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
