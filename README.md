# 董家辉个人站

本地：`npm run dev` → http://127.0.0.1:8787/

首页是 Persona 3 Reload 风格暂停菜单（静态 HTML/CSS/JS，无框架）。未使用 Atlus 官方素材/字体/BGM。

- `/` 主菜单
- `/works/` 作品
- `/resume/` 简历
- `/blog/` 博客
- `/contact/` 联系

- 作品数据：`data/works.js`
- 博客数据：`data/posts.js`

## 版本

当前线上基线：**v1.1.0**

| 东西 | 规则 |
| --- | --- |
| `main` | 生产。合入后才算发布。 |
| 分支 | 从 `main` 拉：`feat/...`、`fix/...`、`release/vX.Y.Z` |
| PR | 所有改动都走 Pull Request，不要直推 `main` |
| tag | 合入 `main` 后打 `vX.Y.Z`，与这次发布对应 |

### 日常流程

```text
git checkout main && git pull
git checkout -b feat/短名
# 改完、commit、push
# 开 PR → 检查 → merge 进 main
git checkout main && git pull
git tag -a vX.Y.Z -m "简短说明"
git push origin vX.Y.Z
```

## 部署

线上 https://resume.tensorview.cc 是 Cloudflare Worker **`resume-tensorview-cc`**（assets-only，没有 `main` 脚本）。

合入 GitHub **不等于**上线。以前 `/` 会 302 到 `/en/`（旧双语页），是因为线上还跑着带 Worker 脚本的旧部署。`wrangler.jsonc` 里不要再加 `main`，也不要把 `/` 指到 `/en/`。

### 合入 `main` 之后自动上线

1. Cloudflare → API Tokens → 用 **Edit Cloudflare Workers** 模板建 token（要能写 Workers，不能只用 DNS Edit）
2. GitHub 仓库 Settings → Secrets → Actions → 加 `CLOUDFLARE_API_TOKEN`
3. 合入 `main`（或 Actions 里手动跑 **Deploy**）

PR 上只做 `wrangler deploy --dry-run`，不会改生产。

### 本地先上线

```text
npx wrangler login
npm run deploy
```

不要把「只能改 DNS」的 token 设成 `CLOUDFLARE_API_TOKEN`，Wrangler 会优先用它然后部署失败。OAuth 过期就重新 `wrangler login`。
