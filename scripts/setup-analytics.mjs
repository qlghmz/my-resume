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
  const out = { deploy: false, token: "", apiToken: "" };
  for (const arg of process.argv.slice(2)) {
    if (arg === "--deploy") out.deploy = true;
    else if (arg.startsWith("--token=")) out.token = arg.slice(8).trim();
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

  let sites = [];
  try {
    sites = await cfApi(
      apiToken,
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/rum/site_info/list`,
    );
  } catch (err) {
    throw new Error(
      `Cloudflare API cannot manage Web Analytics with this token.\n` +
        `${err.message}\n` +
        `Create a token with Account → Account Analytics → Edit, or paste a beacon token manually.`,
    );
  }

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

function patchConfig(token) {
  let src = fs.readFileSync(CONFIG_PATH, "utf8");
  src = src.replace(/enabled:\s*false/, "enabled: true");
  if (!/token:\s*"[^"]*"/.test(src)) {
    throw new Error("Unexpected analytics.js format");
  }
  src = src.replace(/token:\s*"[^"]*"/, `token: "${token}"`);
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

function printManualHelp() {
  console.error(`Need a Cloudflare Web Analytics beacon token.

Option A — paste token (fastest, free):
  npm run setup:analytics -- --token=YOUR_TOKEN --deploy

  Get token: Cloudflare Dashboard → Analytics & Logs → Web Analytics
  → Add a site → hostname ${DOMAIN} → copy the token from the snippet.

Option B — API token with Web Analytics permission:
  $env:CLOUDFLARE_API_TOKEN="..."
  npm run setup:analytics -- --deploy

Dashboard after setup:
  Cloudflare → Analytics & Logs → Web Analytics → ${DOMAIN}`);
}

async function main() {
  const { deploy: doDeploy, token: argToken, apiToken } = parseArgs();
  let token = argToken;

  if (!token) {
    const bearer = apiToken || readWranglerOAuth();
    if (bearer) {
      try {
        token = await resolveTokenViaApi(bearer);
        console.log(`Cloudflare Web Analytics ready for ${DOMAIN}`);
      } catch (err) {
        console.warn(String(err.message || err));
      }
    }
  }

  if (!token) {
    printManualHelp();
    process.exit(1);
  }

  patchConfig(token);
  console.log(`Updated ${path.relative(ROOT, CONFIG_PATH)} (enabled: true)`);

  if (doDeploy) {
    console.log("Deploying to Cloudflare…");
    deploy();
    console.log("Done. Open Web Analytics in Cloudflare dashboard, then visit https://resume.tensorview.cc");
  } else {
    console.log(`Next: npm run setup:analytics -- --token=${token} --deploy`);
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
