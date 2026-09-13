/**
 * Submit VXNA inclusion request to V2EX (node: vxna).
 *
 * Requires a Personal Access Token with write scope:
 *   https://www.v2ex.com/settings/tokens
 *
 * Usage:
 *   set V2EX_TOKEN=your-token   (PowerShell: $env:V2EX_TOKEN="...")
 *   npm run vxna:submit
 *
 * Without a token, prints the post body for manual paste at /go/vxna.
 */

const SITE = "https://resume.tensorview.cc";
const BLOG = `${SITE}/blog/`;
const FEED = `${SITE}/feed.xml`;

const TITLE = "申请 VXNA 收录";
const BODY = `申请 VXNA 收录

网站：${BLOG}
Feed：${FEED}

个人技术博客，嵌入式 Linux / RK3588 / AI 视频等方向，持续更新。`;

async function submitViaApi(token) {
  const res = await fetch("https://www.v2ex.com/api/v2/topics/new", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: TITLE,
      content: BODY,
      node_name: "vxna",
    }),
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`V2EX API non-JSON (${res.status}): ${text.slice(0, 200)}`);
  }

  if (!res.ok || data.result === false) {
    throw new Error(data.message || data.msg || `V2EX API error (${res.status})`);
  }

  return data.url || data.topic?.url || "https://www.v2ex.com/go/vxna";
}

async function main() {
  const token = process.env.V2EX_TOKEN?.trim();

  if (!token) {
    console.log("V2EX_TOKEN 未设置，请手动发帖：");
    console.log("");
    console.log("  1. 登录 V2EX");
    console.log("  2. 打开 https://www.v2ex.com/go/vxna");
    console.log("  3. 点「创建新主题」，粘贴以下内容");
    console.log("");
    console.log("--- 标题 ---");
    console.log(TITLE);
    console.log("");
    console.log("--- 正文 ---");
    console.log(BODY);
    console.log("");
    console.log("或设置 Token 后重跑：npm run vxna:submit");
    console.log("Token 创建：https://www.v2ex.com/settings/tokens");
    process.exit(1);
  }

  const url = await submitViaApi(token);
  console.log("VXNA 申请已提交：", url);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
