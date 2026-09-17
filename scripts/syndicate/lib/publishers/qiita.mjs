import { requireEnv } from "../env.mjs";

const API = "https://qiita.com/api/v2";

function headers(token) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

async function request(method, path, token, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: headers(token),
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    const msg =
      data?.message ||
      data?.error ||
      (Array.isArray(data?.errors) ? JSON.stringify(data.errors) : null) ||
      text ||
      res.statusText;
    throw new Error(`Qiita ${method} ${path} → ${res.status}: ${msg}`);
  }
  return data;
}

function toQiitaTags(tags) {
  const out = [];
  const seen = new Set();
  for (const t of tags || []) {
    // Qiita tag names: letters, numbers, and a few symbols; keep it simple.
    let name = String(t)
      .trim()
      .replace(/\s+/g, "")
      .replace(/[^\w\u3040-\u30ff\u3400-\u9fff.+#-]/g, "")
      .slice(0, 32);
    if (!name) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ name, versions: [] });
    if (out.length >= 5) break;
  }
  if (!out.length) out.push({ name: "技術ブログ", versions: [] });
  return out;
}

/**
 * Create or update a Qiita item.
 * Qiita has no draft flag — use private:true as "review first".
 * @param {object} payload syndicate payload
 * @param {{ live?: boolean, remoteId?: string|null }} options
 */
export async function publishQiita(payload, options = {}) {
  const { live = false, remoteId = null } = options;
  const token = requireEnv("QIITA_TOKEN");

  const item = {
    title: payload.title,
    body: payload.body,
    private: !live,
    tags: toQiitaTags(payload.tags),
    tweet: false,
  };

  let data;
  if (remoteId) {
    data = await request("PATCH", `/items/${remoteId}`, token, item);
  } else {
    data = await request("POST", `/items`, token, item);
  }

  return {
    platform: "qiita",
    remoteId: data.id,
    url: data.url || null,
    published: !data.private,
    raw: {
      id: data.id,
      url: data.url,
      private: data.private,
      updated_at: data.updated_at,
    },
  };
}
