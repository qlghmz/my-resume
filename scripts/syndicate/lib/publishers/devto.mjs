import { requireEnv } from "../env.mjs";

const API = "https://dev.to/api";

function headers(apiKey) {
  return {
    "api-key": apiKey,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function retryAfterMs(res, data, text) {
  const h = res.headers.get("retry-after");
  if (h && /^\d+$/.test(h)) return Number(h) * 1000;
  const msg = String(data?.error || data?.message || text || "");
  const m = msg.match(/try again in\s+(\d+)\s+seconds/i);
  if (m) return Number(m[1]) * 1000;
  return 60_000;
}

async function request(method, path, apiKey, body, { retries = 4 } = {}) {
  let attempt = 0;
  for (;;) {
    const res = await fetch(`${API}${path}`, {
      method,
      headers: headers(apiKey),
      body: body ? JSON.stringify(body) : undefined,
    });
    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }
    if (res.ok) return data;

    if (res.status === 429 && attempt < retries) {
      const wait = retryAfterMs(res, data, text);
      console.log(`    ⏳ Dev.to rate limit — wait ${Math.ceil(wait / 1000)}s then retry…`);
      await sleep(wait + 2000);
      attempt++;
      continue;
    }

    const msg =
      data?.error ||
      data?.message ||
      (typeof data === "string" ? data : text) ||
      res.statusText;
    throw new Error(`Dev.to ${method} ${path} → ${res.status}: ${msg}`);
  }
}

/**
 * Create or update a Dev.to article.
 * @param {object} payload syndicate payload
 * @param {{ live?: boolean, remoteId?: string|number|null }} options
 */
export async function publishDevto(payload, options = {}) {
  const { live = false, remoteId = null } = options;
  const apiKey = requireEnv("DEVTO_API_KEY");

  const tags = (payload.tags || [])
    .slice(0, 4)
    .map((t) =>
      String(t)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .slice(0, 30),
    )
    .filter(Boolean);

  const article = {
    title: payload.title,
    body_markdown: payload.body,
    published: !!live,
    canonical_url: payload.canonical,
    description: String(payload.summary || "").slice(0, 140),
    tags,
  };

  let data;
  if (remoteId) {
    data = await request("PUT", `/articles/${remoteId}`, apiKey, { article });
  } else {
    data = await request("POST", `/articles`, apiKey, { article });
    // DEV.to sometimes ignores published:true on first POST — force with PUT.
    if (live && data?.id && !isPublished(data)) {
      await sleep(1500);
      data = await request("PUT", `/articles/${data.id}`, apiKey, {
        article: { ...article, published: true },
      });
    }
  }

  // Final verify if still draft while live requested
  if (live && data?.id && !isPublished(data)) {
    await sleep(2000);
    data = await request("PUT", `/articles/${data.id}`, apiKey, {
      article: { published: true },
    });
  }

  return {
    platform: "devto",
    remoteId: data.id,
    url: data.url || data.canonical_url || null,
    published: isPublished(data),
    raw: {
      id: data.id,
      url: data.url,
      slug: data.slug,
      published: isPublished(data),
      published_at: data.published_at || null,
    },
  };
}

function isPublished(data) {
  if (!data) return false;
  if (data.published === true) return true;
  if (data.published === false) return false;
  // Newer DEV API omits boolean `published`; use timestamp instead.
  return Boolean(data.published_at || data.published_timestamp);
}
