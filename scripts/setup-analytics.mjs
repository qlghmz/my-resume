import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONFIG_PATH = path.join(ROOT, "data", "analytics.js");
const WRANGLER_JSONC = path.join(ROOT, "wrangler.jsonc");
const DOMAIN = "resume.tensorview.cc";
const ZONE_NAME = "tensorview.cc";

function parseArgs() {
  const out = { deploy: false, token: "", umamiId: "", apiToken: "" };
  for (const arg of process.argv.slice(2)) {
    if (arg === "--deploy") out.deploy = true;
    else if (arg.startsWith("--token=")) out.token = arg.slice(8).trim();
    else if (arg.startsWith("--umami-id=")) out.umamiId = arg.slice(11).trim();
    else if (arg.startsWith("--api-token=")) out.apiToken = arg.slice(12).trim();
  }
  out.apiToken ||= process.env.CLOUDFLARE_API_TOKEN || "";
  return out;
}

function readAccountId() {
  const text = fs.readFileSync(WRANGLER_JSONC, "utf8");
  const match = text.match(/"account_id"\s*:\s*"([^"]+)"/);
  if (!match) throw new Error("account_id not found in wrangler.jsonc");
  return match[1];
}

function readWranglerOAuth() {
  const cfg = path.join(
    os.homedir(),
    "AppData/Roaming/xdg.config/.wrangler/config/default.toml",
  );
  if (!fs.existsSync(cfg)) return "";
  const text = fs.readFileSync(cfg, "utf8");
  return text.match(/oauth_token = "([^"]+)"/)?.[1] || "";
}

async function cfApi(token, url, init) {
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  const body = await res.json();
  if (!body.success) {
    throw new Error(`${url} → ${JSON.stringify(body.errors || body)}`);
  }
  return body.result;
}

function siteHost(site) {
  return site?.rules?.[0]?.host || "";
}

async function resolveTokenViaApi(apiToken) {
  const accountId = readAccountId();
  const zones = await cfApi(
    apiToken,
    `https://api.cloudflare.com/client/v4/zones?name=${ZONE_NAME}`,
  );
  const zone = zones?.[0];
  if (!zone?.id) throw new Error(`Zone not found: ${ZONE_NAME}`);

  const sites = await cfApi(
    apiToken,
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/rum/site_info/list`,
  );

  let site = (sites || []).find(
    (s) => siteHost(s) === DOMAIN || siteHost(s) === ZONE_NAME,
  );
  if (!site) {
    site = await cfApi(
      apiToken,
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/rum/site_info`,
      {
        method: "POST",
        body: JSON.stringify({
          auto_install: false,
          host: DOMAIN,
          zone_tag: zone.id,
        }),
      },
    );
  }
  const token = site?.site_token;
  if (!token) throw new Error("Cloudflare API did not return site_token");
  return token;
}

function patchField(src, key, value) {
  const re = new RegExp(`(${key}:\\s*)(true|false|"[^"]*")`);
  if (!re.test(src)) throw new Error(`Field not found: ${key}`);
  const lit = typeof value === "boolean" ? String(value) : `"${value}"`;
  return src.replace(re, `$1${lit}`);
}

function patchConfig({ cfToken, umamiId }) {
  let src = fs.readFileSync(CONFIG_PATH, "utf8");
  if (cfToken) {
    src = patchField(src, "token", cfToken);
    src = patchField(src, "enabled", true);
  }
  if (umamiId) {
    src = patchField(src, "websiteId", umamiId);
    src = src.replace(/(umami:\s*\{[\s\S]*?enabled:\s*)false/, "$1true");
  }
  src = src.replace(/^(\s*enabled:\s*)false/m, "$1true");
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

function printHelp() {
  console.error(`Usage:
  npm run setup:analytics -- --token=CF_TOKEN [--umami-id=UUID] [--deploy]

Cloudflare token: Dashboard → Analytics & Logs → Web Analytics → ${DOMAIN}
Umami website id: https://cloud.umami.is → Add website → copy Website ID (Hobby free, no API)

Example:
  npm run setup:analytics -- --token=abc --umami-id=uuid --deploy`);
}

async function main() {
  const { deploy: doDeploy, token: argToken, umamiId, apiToken } = parseArgs();
  let cfToken = argToken;

  if (!cfToken && !umamiId) {
    const bearer = apiToken || readWranglerOAuth();
    if (bearer) {
      try {
        cfToken = await resolveTokenViaApi(bearer);
      } catch (err) {
        console.warn(String(err.message || err));
      }
    }
  }

  if (!cfToken && !umamiId) {
    printHelp();
    process.exit(1);
  }

  patchConfig({ cfToken: cfToken || undefined, umamiId: umamiId || undefined });
  console.log(`Updated ${path.relative(ROOT, CONFIG_PATH)}`);

  if (doDeploy) {
    deploy();
    console.log("Deployed. Dashboards:");
    console.log("  CF Web Analytics → performance + pageviews");
    if (umamiId) console.log("  Umami → countries, referrers, events");
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
