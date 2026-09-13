/**
 * Submit VXNA inclusion request to V2EX (node: vxna).
 *
 * V2EX API 2.0 目前未公开「创建主题」接口（POST topics/new → 405），
 * 因此默认输出可复制正文，需在 /go/vxna 手动发帖。
 *
 * Usage:
 *   set V2EX_TOKEN=your-token   (PowerShell: $env:V2EX_TOKEN="...")
 *   npm run vxna:submit
 */

const SITE = "https://resume.tensorview.cc";
const BLOG = `${SITE}/blog/`;
const FEED = `${SITE}/feed.xml`;

const TITLE = "申请 VXNA 收录";
const BODY = `申请 VXNA 收录

网站：${BLOG}
Feed：${FEED}

个人技术博客，嵌入式 Linux / RK3588 / AI 视频等方向，持续更新。`;

function printManualSteps(extra = "") {
  if (extra) {
    console.log(extra);
    console.log("");
  }
  console.log("请手动发帖（一次性）：");
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
}

async function verifyToken(token) {
  const res = await fetch("https://www.v2ex.com/api/v2/member", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Token 校验失败 (${res.status})`);
  }
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Token 无效或已过期");
  }
  return data.result?.username || "unknown";
}

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

  if (res.status === 405) {
    return { ok: false, reason: "api_not_available" };
  }

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`V2EX API 非 JSON (${res.status}): ${text.slice(0, 200)}`);
  }

  if (!res.ok || data.result === false) {
    throw new Error(data.message || data.msg || `V2EX API 错误 (${res.status})`);
  }

  return { ok: true, url: data.url || data.topic?.url || "https://www.v2ex.com/go/vxna" };
}

async function main() {
  const token = process.env.V2EX_TOKEN?.trim();

  if (!token) {
    printManualSteps("V2EX_TOKEN 未设置。");
    process.exit(1);
  }

  const username = await verifyToken(token);
  console.log(`Token 有效（@${username}），尝试 API 发帖…`);

  const result = await submitViaApi(token);
  if (result.ok) {
    console.log("VXNA 申请已提交：", result.url);
    return;
  }

  printManualSteps(
    "V2EX 官方 API 2.0 暂不支持创建主题（405），无法代发。VXNA 收录只需发这一次帖，之后靠 feed 自动聚合，不必再维护 Token。",
  );
  process.exit(1);
}

main().catch((err) => {
  const msg = err.cause?.message || err.message || String(err);
  console.error(msg);
  console.log("");
  printManualSteps();
  process.exit(1);
});
