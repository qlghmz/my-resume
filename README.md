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

当前线上基线：**v1.0.0**

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

Cloudflare 若已把本仓库接到 Worker（Settings → Builds → 连接 GitHub），则：

- 合入 **`main`**：自动部署到 https://resume.tensorview.cc
- 其它分支 / PR：预览版本，不上生产

若还没接 Git，合入不会更新网站，需要在 Cloudflare 控制台接上，或本地执行 `npm run deploy`。
