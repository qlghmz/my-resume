# VXNA 收录指南

[VXNA](https://blog.v2ex.com/vxna/) 是 V2EX 的博客聚合器。收录后，新文章会出现在 [V2EX 首页 XNA tab](https://www.v2ex.com/xna)，点击直接跳转到你的源站（外链），不经过 V2EX 内页。

## 前置条件

站点需要同时提供：

| 项目 | 本仓库 |
|------|--------|
| 博客首页 | https://resume.tensorview.cc/blog/ |
| Atom Feed | https://resume.tensorview.cc/feed.xml |

Feed 由 `data/posts.js` 生成，**不含** `draft: true` 且必须有对应 `data/articles/<id>.js` 的文章。

## 发新文后更新 Feed

```bash
npm run feed
```

合并到 `main` 后 CI 部署前也会自动跑 `npm run feed`。本地预览时改完 posts 记得手动跑一次。

## 申请收录（一次性）

### 方式 A：命令行（需 V2EX Token）

1. 在 [V2EX → Settings → Tokens](https://www.v2ex.com/settings/tokens) 创建 Personal Access Token
2. 运行：

```bash
# PowerShell
$env:V2EX_TOKEN="粘贴你的-token"
npm run vxna:submit
```

成功后会输出帖子 URL；失败则检查 Token 权限或改用手动发帖。

### 方式 B：手动

1. 打开 [VXNA 节点](https://www.v2ex.com/go/vxna)
2. 创建新主题，标题 **申请 VXNA 收录**，正文：

```
申请 VXNA 收录

网站：https://resume.tensorview.cc/blog/
Feed：https://resume.tensorview.cc/feed.xml

个人技术博客，嵌入式 Linux / RK3588 / AI 视频等方向，持续更新。
```

3. 等 Livid 人工审核（可能数天到数周，批量处理）
4. 收录后在 https://www.v2ex.com/xna 能看到你的源

## 收录之后

- 发新文 → `npm run feed` → 合并部署 → VXNA 定期抓取，首页 XNA tab 会出现新条目
- 不需要每篇都去 V2EX 发帖；VXNA 负责被动曝光
- 想加速某篇传播：另开「分享创造」帖，带摘要 + 链接（和 VXNA 不冲突）

## 内容建议（避免被移除）

VXNA 会过滤质量过低的条目，例如：

- Feed 里只有标题、正文页几乎为空
- 大量「碎碎念」级短内容

本仓库草稿（`draft: true`）不会进 feed；长文发在 `data/articles/` 即可。

## 自检

部署后浏览器打开：

- https://resume.tensorview.cc/feed.xml — 应看到 Atom XML，条目链接能点开
- https://resume.tensorview.cc/blog/ — 页面源码里有 `<link rel="alternate" … feed.xml">`

本地：

```bash
npm run feed
npm run dev
# 打开 http://127.0.0.1:8787/feed.xml
```
