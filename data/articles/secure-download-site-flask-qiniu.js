window.ARTICLE = {
  id: "secure-download-site-flask-qiniu",
  date: "2026.09.17",
  title: {
    zh: "外包下载站怎么搭：前端页 + 七牛私有链 + 云服务器部署",
    en: "How I Ship a Controlled Download Site: HTML + Private Object Storage + VPS",
    ja: "外注ダウンロードサイトの作り方：HTML＋署名付き配信＋VPS デプロイ",
  },
  lede: {
    zh: "这篇按我实际做过的流程写：先做页面，再接对象存储私有链，最后上云服务器。文中截图来自脱敏演示站「澄光智学 / 探微助手」。",
    en: "This is the real flow I used — front-end page, private object-storage URLs, then a VPS. Screenshots are from an anonymized demo brand.",
    ja: "本稿は実際に手がけた流れ：まず画面、次にオブジェクトストレージの署名付き URL、最後に VPS。画面は匿名化したデモブランドの截図。",
  },
  tags: ["Flask", "Qiniu", "Nginx", "Freelance", "Web"],
  tagLabel: { zh: "技术", en: "Tech", ja: "技術" },
  related: [
    {
      href: "/blog/outsource-ai-side-hustle-part-2.html",
      label: {
        zh: "外包篇 2：AI 接互联网零活",
        en: "Outsourcing Part 2: AI side jobs",
        ja: "外注編 2：AI で Web の副業を受ける",
      },
    },
    {
      href: "/blog/taobao-outsource-group-half-year.html",
      label: {
        zh: "淘宝外包群接单半年",
        en: "Six months in Taobao outsource groups",
        ja: "淘宝外注グループで半年受注",
      },
    },
  ],
  sections: [
    {
      paragraphs: [
        {
          zh: "你的小总结基本对：页面 → 七牛 → 上传联通 → 租服务器 → git 上去跑。外包交付里，差的往往不是「会不会写 HTML」，而是中间几处细节：密钥放哪、链接怎么过期、微信缓存怎么破、Nginx 怎么反代。下面按搭建 / 部署两段写清楚，并补上我踩过的坑。",
          en: "Your outline is right: page → object storage → wire uploads → rent a VPS → git and run. What usually fails in freelance delivery is not “can you write HTML,” but the edges: where secrets live, how links expire, chat-app cache, and the reverse proxy. Below is build, then deploy, plus the traps I hit.",
          ja: "あなたの整理はおおむね正しい：画面 → オブジェクトストレージ → アップロード連携 → VPS 契約 → git して起動。外注で差がつくのは「HTML が書けるか」ではなく、鍵の置き場、リンクの期限、チャットアプリのキャッシュ、リバースプロキシといった境界だ。以下は構築／デプロイの二段に分け、実際に踏んだ罠も補う。",
        },
      ],
      figures: [
        {
          src: "/img/blog/download-site-pc.jpg",
          caption: {
            zh: "演示站下载页（电脑端）：顶栏品牌 + Windows 下载按钮 + 卖点卡片。",
            en: "Demo download page (desktop): brand nav, Windows button, feature cards.",
            ja: "デモのダウンロード画面（PC）：ブランドナビ、Windows ボタン、特徴カード。",
          },
        },
      ],
    },
    {
      heading: {
        zh: "一、先想清楚验收标准",
        en: "1. Lock acceptance before you code",
        ja: "一、まず検収基準を固める",
      },
      paragraphs: [
        {
          zh: "开工前先和客户对齐「什么叫做完」。否则你会变成免费上传员——对方改一版 App，你就再传一次七牛。我建议至少写进报价/合同的验收点如下。",
          en: "Agree what “done” means before coding. Otherwise you become their unpaid upload clerk every time the app binary changes. At minimum, put these acceptance checks in the quote.",
          ja: "着手前に「完了の定義」を合意する。そうしないと、App の版が出るたびに無料のアップロード係になる。見積もり／契約に少なくとも次の検収点を書く。",
        },
      ],
      bullets: [
        {
          zh: "<strong>能下：</strong>PC / Android 各自能拿到安装包，按钮有明确反馈。",
          en: "<strong>Can download:</strong> PC and Android each get a package; the button gives clear feedback.",
          ja: "<strong>落とせる：</strong>PC／Android それぞれパッケージを取得でき、ボタンに明確なフィードバックがある。",
        },
        {
          zh: "<strong>能过期：</strong>链接带时效（常见 24 小时），过期后不能再下。",
          en: "<strong>Can expire:</strong> signed URLs time out (often 24h) and stop working.",
          ja: "<strong>期限切れ：</strong>署名 URL に有効期限（よくあるのは 24 時間）。切れれば再ダウンロード不可。",
        },
        {
          zh: "<strong>密钥不进前端：</strong>AccessKey / Secret 只在服务器环境变量或配置里。",
          en: "<strong>No secrets in the browser:</strong> keys only in server env/config.",
          ja: "<strong>鍵はフロントに置かない：</strong>AccessKey／Secret はサーバの環境変数か設定のみ。",
        },
        {
          zh: "<strong>微信不脏缓存：</strong>客户在微信里打开，应看到最新页，而不是上周的旧按钮文案。",
          en: "<strong>Chat cache does not stick:</strong> opening in WeChat/Line-like in-apps shows the latest page, not last week’s copy.",
          ja: "<strong>キャッシュ汚染しない：</strong>WeChat 等のアプリ内ブラウザで開いても、先週の古い文言ではなく最新画面が出る。",
        },
        {
          zh: "<strong>改包次数：</strong>约定免费重传几次；超出按次计费。",
          en: "<strong>Re-upload rounds:</strong> how many free binary updates; extras billed per push.",
          ja: "<strong>再アップロード回数：</strong>無料の差し替え回数を決め、超過は都度課金。",
        },
      ],
    },
    {
      heading: {
        zh: "二、搭建：前端页面",
        en: "2. Build: the front-end pages",
        ja: "二、構築：フロントの画面",
      },
      paragraphs: [
        {
          zh: "第一块就是「看起来像官网下载中心」的静态页。常见三页：软件下载、常见问题、售后服务。下载页要有电脑端 / 移动端切换，FAQ 用图文把安装步骤写死，售后放分区联系方式。技术上可以是纯 HTML + CSS + 一点 jQuery/JS；后端只负责签发下载地址。",
          en: "First deliverable is a download-center lookalike: download, FAQ, support. The download page switches desktop/mobile; FAQ locks install steps with screenshots; support lists regional contacts. Technically: HTML/CSS plus a little JS. The backend only mints download URLs.",
          ja: "最初の成果物は「公式のダウンロードセンター」に見える静的ページ。よくある三枚：ダウンロード、FAQ、サポート。DL 画面は PC／モバイル切替、FAQ は截図付きで手順を固定、サポートは地域連絡先。技術的には HTML／CSS＋少しの JS。バックエンドはダウンロード URL の発行だけを担う。",
        },
      ],
      figures: [
        {
          src: "/img/blog/download-site-android.jpg",
          caption: {
            zh: "同一下载页切换到移动端：二维码 + Android 按钮。",
            en: "Same page on the mobile tab: QR + Android button.",
            ja: "同じ DL 画面のモバイルタブ：QR＋Android ボタン。",
          },
        },
        {
          src: "/img/blog/download-site-mobile.jpg",
          caption: {
            zh: "窄屏效果：顶栏品牌与导航纵向排布，方便手机预览验收。",
            en: "Narrow viewport: brand + nav stack for phone acceptance checks.",
            ja: "狭い画面：ブランドとナビが縦に並び、スマホ検収しやすい。",
          },
        },
      ],
      bullets: [
        {
          zh: "<strong>下载按钮：</strong>点击后 POST 到后端拿 URL，再 window 跳转；成功后做 5 秒倒计时防连点。",
          en: "<strong>Download button:</strong> POST for a URL, then navigate; 5s cooldown stops double-taps.",
          ja: "<strong>ダウンロードボタン：</strong>クリック後に POST で URL を取得して遷移。成功後 5 秒クールダウンで連打防止。",
        },
        {
          zh: "<strong>资源路径：</strong>CSS/JS/图片加版本参数（如 ?v=日期），减少「改了样式客户看不见」。",
          en: "<strong>Asset busting:</strong> version query on CSS/JS/images so clients see CSS updates.",
          ja: "<strong>アセットのキャッシュ破り：</strong>CSS／JS／画像に版クエリを付け、見た目更新が届くようにする。",
        },
        {
          zh: "<strong>文案与脱敏：</strong>若要写进个人博客，先把公司名、ICP、真实客服换成演示品牌——截图才安全。",
          en: "<strong>Anonymize for portfolio:</strong> swap company name, ICP, real support contacts before blogging screenshots.",
          ja: "<strong>個人ブログ用の匿名化：</strong>会社名・ICP・実在のサポート連絡先をデモブランドに差し替えてから截図する。",
        },
      ],
    },
    {
      heading: {
        zh: "三、搭建：七牛云（对象存储）",
        en: "3. Build: object storage (Qiniu in this case)",
        ja: "三、構築：オブジェクトストレージ（本例は七牛）",
      },
      paragraphs: [
        {
          zh: "安装包不要放在自己服务器硬盘上裸链下载——带宽贵、也难控传播。做法是：对象存储私有空间存 exe/apk，后端用官方 SDK 生成带签名的临时下载地址。国内常见七牛；出海场景同一模式可换成 AWS S3、Cloudflare R2 等，只是 SDK 不同。",
          en: "Do not host installers as naked files on the VPS — bandwidth and leak control both suffer. Put binaries in a private object bucket; the backend SDK mints time-limited signed URLs. This case used Qiniu; overseas, the same pattern maps to S3 or R2.",
          ja: "インストーラを VPS の素の直リンクに置かない。帯域も流通制御も不利だ。バイナリはプライベートなオブジェクト領域に置き、バックエンド SDK で期限付き署名 URL を出す。本例は七牛。海外では同じ型を S3 や R2 に置き換えられる（SDK だけ違う）。",
        },
      ],
      bullets: [
        {
          zh: "<strong>建桶：</strong>创建空间，访问控制设为私有；绑定下载用 CDN 域名（如 file.example.com）。",
          en: "<strong>Bucket:</strong> create a private space; bind a download CDN domain.",
          ja: "<strong>バケット：</strong>プライベート空間を作り、配信用 CDN ドメインを紐づける。",
        },
        {
          zh: "<strong>密钥：</strong>在控制台创建 AccessKey / SecretKey；只给服务器，不进 Git、不进前端。",
          en: "<strong>Keys:</strong> create Access/Secret keys for the server only — never commit, never ship to JS.",
          ja: "<strong>鍵：</strong>コンソールで Access／Secret を発行。サーバ専用。Git にもフロントにも入れない。",
        },
        {
          zh: "<strong>文件 key：</strong>约定对象路径，例如 exe/app-windows.exe、exe/app-android.apk；前后端用同一套名字。",
          en: "<strong>Object keys:</strong> agree paths like exe/app-windows.exe and exe/app-android.apk; same names front and back.",
          ja: "<strong>オブジェクトキー：</strong>exe/app-windows.exe や exe/app-android.apk のようにパスを合意し、前後で同じ名前を使う。",
        },
        {
          zh: "<strong>防盗链（可选加强）：</strong>CDN 控制台可再开时间戳防盗链 / 单 IP 频率限制，与后端签名叠加。",
          en: "<strong>Optional CDN locks:</strong> timestamp hotlink protection / per-IP rate limits on top of signed URLs.",
          ja: "<strong>任意の CDN 強化：</strong>タイムスタンプ防盗や単一 IP 頻度制限を、署名 URL に重ねられる。",
        },
      ],
    },
    {
      heading: {
        zh: "四、搭建：上传安装包并写好联通",
        en: "4. Build: upload binaries and wire the API",
        ja: "四、構築：パッケージを上げて API でつなぐ",
      },
      paragraphs: [
        {
          zh: "把 exe/apk 传到桶里对应 key 后，后端（我这边是 Flask）提供例如 POST /api/download，body 里 type=pc|android。服务端取客户端 IP、做短窗限流、再调七牛 private_download_url，返回 JSON：{ success, url }。前端拿到 url 再跳转。健康检查可用 GET /api/health，方便部署后自检。",
          en: "After uploading to the right keys, the backend (Flask here) exposes POST /api/download with type=pc|android. It reads client IP, applies a short rate window, calls the private URL API, and returns { success, url }. The front-end navigates to that URL. GET /api/health helps smoke-test deploys.",
          ja: "正しいキーへアップロードしたら、バックエンド（本例は Flask）が POST /api/download（type=pc|android）を出す。クライアント IP を取り、短時間のレート制限をかけ、署名 URL API を呼び、{ success, url } を返す。フロントはその URL へ遷移。GET /api/health でデプロイ後の煙テストができる。",
        },
      ],
      bullets: [
        {
          zh: "<strong>联通自测：</strong>curl 调 API，应返回带 e= 与 token= 的长链接；浏览器打开应开始下载。",
          en: "<strong>Smoke test:</strong> curl the API — expect a long URL with e= and token=; opening it should start the download.",
          ja: "<strong>疎通確認：</strong>curl で API を叩き、e= と token= 付きの長い URL が返ること。開くとダウンロードが始まること。",
        },
        {
          zh: "<strong>限流：</strong>同 IP 例如每 5 秒最多 2 次；超限返回 429 与 wait_time，按钮提示等待。",
          en: "<strong>Rate limit:</strong> e.g. 2 requests / 5s per IP; over limit → 429 + wait_time for the UI.",
          ja: "<strong>レート制限：</strong>例として同一 IP で 5 秒に 2 回まで。超過は 429 と wait_time を返し、UI で待つ。",
        },
        {
          zh: "<strong>配置方式：</strong>优先环境变量；示例配置进仓库，真实密钥永不提交。",
          en: "<strong>Config:</strong> prefer env vars; commit examples only, never real secrets.",
          ja: "<strong>設定：</strong>環境変数優先。リポジトリには example のみ。実鍵は絶対にコミットしない。",
        },
      ],
    },
    {
      heading: {
        zh: "五、部署：云服务器",
        en: "5. Deploy: rent a VPS",
        ja: "五、デプロイ：VPS を借りる",
      },
      paragraphs: [
        {
          zh: "轻量云即可（1 核 2G 往往够这种下载引导站）。系统选 Ubuntu LTS。开放 80/443；SSH 用密钥登录。域名解析到服务器公网 IP。若客户已有域名，让他们加 A 记录指向你；没有就先用 IP + 临时域名验收。",
          en: "A small VPS is enough (1C2G often fine for this guide site). Ubuntu LTS, open 80/443, SSH keys only. Point DNS A records at the public IP. If the client owns the domain, they add the record; otherwise accept on IP / temp domain first.",
          ja: "軽量 VPS で足りる（案内サイトなら 1C2G で十分なことが多い）。Ubuntu LTS、80／443 を開け、SSH は鍵認証。DNS の A レコードを公開 IP へ。顧客ドメインなら相手がレコード追加。なければ IP／仮ドメインで先に検収。",
        },
      ],
    },
    {
      heading: {
        zh: "六、部署：代码上服务器并跑起来",
        en: "6. Deploy: git, run, reverse-proxy",
        ja: "六、デプロイ：git して起動し、リバースプロキシ",
      },
      paragraphs: [
        {
          zh: "流程可以收成一条链：git clone（或 pull）→ python -m venv → pip install -r requirements.txt → 配环境变量 → 开发期 python app.py，生产用 gunicorn -w 4 -b 127.0.0.1:5000 app:app。前面再挂 Nginx：静态 HTML/CSS/JS 直接由 Nginx 或 Flask 提供均可，/api 反代到 gunicorn。最后用 certbot 上 HTTPS。",
          en: "One chain: git clone/pull → venv → pip install → env vars → python app.py for dev, gunicorn bound to 127.0.0.1:5000 in prod. Nginx in front: static files + /api reverse-proxy. Finish with certbot HTTPS.",
          ja: "一本の鎖にする：git clone／pull → venv → pip install → 環境変数 → 開発は python app.py、本番は 127.0.0.1:5000 の gunicorn。手前に Nginx：静的ファイルと /api のリバースプロキシ。最後に certbot で HTTPS。",
        },
      ],
      bullets: [
        {
          zh: "<strong>systemd：</strong>写成 service，开机自启；挂了自动拉起，少半夜被客户微信炸。",
          en: "<strong>systemd:</strong> enable on boot and restart on failure — fewer midnight WeChat pings.",
          ja: "<strong>systemd：</strong>起動時自動、落ちたら再起。真夜中の催促を減らす。",
        },
        {
          zh: "<strong>日志：</strong>保留 gunicorn / nginx error 日志路径，出问题先看 502 还是 429。",
          en: "<strong>Logs:</strong> keep gunicorn/nginx error paths; first ask if it is 502 or 429.",
          ja: "<strong>ログ：</strong>gunicorn／nginx の error パスを確保。まず 502 か 429 かを見る。",
        },
        {
          zh: "<strong>权限：</strong>跑服务的用户只要读项目目录权限；密钥文件 chmod 收紧。",
          en: "<strong>Permissions:</strong> service user needs read on the app tree; tighten secret file modes.",
          ja: "<strong>権限：</strong>実行ユーザーはアプリ読取で足りる。秘密ファイルの chmod は締める。",
        },
      ],
      figures: [
        {
          src: "/img/blog/download-site-faq.jpg",
          caption: {
            zh: "FAQ 页：用截图把安装步骤固化，减少售后重复问答。",
            en: "FAQ page: screenshot-backed install steps cut repeat support.",
            ja: "FAQ：截図付き手順で、同じ問い合わせを減らす。",
          },
        },
        {
          src: "/img/blog/download-site-service.jpg",
          caption: {
            zh: "售后页（演示数据）：分区邮箱占位，真实项目换成客户提供的联系方式。",
            en: "Support page (demo data): regional mail placeholders — swap for client contacts in production.",
            ja: "サポート画面（デモデータ）：地域メールはプレースホルダ。本番は顧客の連絡先に差し替え。",
          },
        },
      ],
    },
    {
      heading: {
        zh: "七、容易忽略的细节",
        en: "7. Details that bite in production",
        ja: "七、本番で効いてくる細部",
      },
      bullets: [
        {
          zh: "<strong>微信缓存：</strong>HTML 加 Cache-Control: no-store；URL 带 _t= 时间戳强制刷新。这是下载站外包里很「显本事」的一点。",
          en: "<strong>In-app cache:</strong> Cache-Control: no-store on HTML; append _t= timestamps. Small detail, big for WeChat-like clients.",
          ja: "<strong>アプリ内キャッシュ：</strong>HTML に Cache-Control: no-store。URL に _t= を付けて強制更新。チャット内ブラウザ案件では差が出る一点。",
        },
        {
          zh: "<strong>文件 key 写错：</strong>桶里是 exe/foo.exe，代码写成 foo.exe，会 404「Document not found」。上传后务必对照控制台路径。",
          en: "<strong>Wrong object key:</strong> bucket has exe/foo.exe but code says foo.exe → Document not found. Match the console path.",
          ja: "<strong>キー表記ミス：</strong>バケットは exe/foo.exe なのにコードが foo.exe だと Document not found。コンソールのパスと照合する。",
        },
        {
          zh: "<strong>域名与证书：</strong>下载域名（CDN）和站点域名可以分开；证书到期前续期，避免「链接能签但 HTTPS 红字」。",
          en: "<strong>Domain vs CDN:</strong> site domain and file CDN domain can differ; renew certs before expiry.",
          ja: "<strong>サイトと CDN：</strong>サイト域名とファイル配信域名は分けてよい。証明書の更新忘れに注意。",
        },
        {
          zh: "<strong>验收清单口头不够：</strong>发客户一份：健康检查 URL、下载页 URL、过期后再点一次应失败、微信内打开截图。",
          en: "<strong>Written checklist:</strong> health URL, download URL, expired-link failure, in-app screenshot — send it to the client.",
          ja: "<strong>書面の検収リスト：</strong>health URL、DL ページ、期限切れ後の失敗、アプリ内ブラウザの截図を顧客へ渡す。",
        },
      ],
    },
    {
      heading: {
        zh: "八、流程收束（可当报价附件）",
        en: "8. End-to-end flow (quote appendix)",
        ja: "八、流れの要約（見積添付用）",
      },
      paragraphs: [
        {
          zh: "搭建：前端三页 → 对象存储私有桶 + CDN 域名 → 上传安装包 → Flask 签发接口与前端按钮联通。部署：云服务器 → git → venv/依赖 → 环境变量 → gunicorn + Nginx + HTTPS → 微信内与过期链接验收。边界清晰、可截图验收，所以这类单适合固定价；但务必把「改包次数」写进报价，否则日历会被客户产品节奏绑死。",
          en: "Build: three pages → private bucket + CDN → upload binaries → Flask mint API wired to buttons. Deploy: VPS → git → venv → env → gunicorn + Nginx + HTTPS → accept in-app and expired-link cases. Clear edges and screenshotable checks make fixed-price gigs viable — if re-upload rounds are priced.",
          ja: "構築：画面三枚 → プライベートバケット＋CDN → パッケージ上传 → Flask の発行 API をボタンに接続。デプロイ：VPS → git → venv → 環境変数 → gunicorn＋Nginx＋HTTPS → アプリ内と期限切れで検収。境界が明確で截図検収できるので固定価格向き。ただし「差し替え回数」を見積に書かないと、カレンダーが顧客の製品ペースに縛られる。",
        },
        {
          zh: "文中界面是匿名化演示，不代表真实客户品牌。若你也在接同类外包，可以把这篇当检查单；和我之前写的淘宝外包群、AI 赶零活是同一条路上的不同切片。",
          en: "Screenshots are anonymized demos, not a real client brand. Treat this as a checklist if you take similar gigs — same road as my Taobao-group and AI side-job notes, different slice.",
          ja: "画面は匿名化デモであり、実在顧客ブランドではない。同種の外注を受けるならチェックリストとして使ってほしい。淘宝外注グループや AI 副業のノートと同じ道の、別の断面だ。",
        },
      ],
    },
  ],
};
