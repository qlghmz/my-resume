window.BLOG_CATEGORIES = [
  {
    id: "daily",
    label: { zh: "日常", en: "Daily", ja: "日常" },
  },
  {
    id: "tech",
    label: { zh: "技术", en: "Tech", ja: "技術" },
  },
  {
    id: "growth",
    label: { zh: "个人发展", en: "Growth", ja: "キャリア" },
  },
];

window.POSTS = [
  {
    id: "secure-download-site-flask-qiniu",
    category: "tech",
    date: "2026.09.17",
    href: "/blog/secure-download-site-flask-qiniu.html",
    cover: "/img/blog/download-site-pc.jpg",
    title: {
      zh: "外包下载站怎么搭：前端页 + 七牛私有链 + 云服务器部署",
      en: "How I Ship a Controlled Download Site: HTML + Private Object Storage + VPS",
      ja: "外注ダウンロードサイトの作り方：HTML＋署名付き配信＋VPS デプロイ",
    },
    summary: {
      zh: "按真实外包流程：三页前端、七牛私有桶、Flask 签发、VPS + Nginx/HTTPS；补验收标准、微信缓存与改包计价。",
      en: "Real freelance flow: three pages, private bucket, Flask signed URLs, VPS + Nginx/HTTPS — plus acceptance, chat cache, and re-upload pricing.",
      ja: "実際の外注の流れ：画面三枚、プライベートバケット、Flask 署名 URL、VPS＋Nginx／HTTPS。検収基準、チャット内キャッシュ、差し替え課金も補足。",
    },
  },
  {
    id: "outsource-ai-side-hustle-part-2",
    category: "growth",
    date: "2026.09.08",
    href: "/blog/outsource-ai-side-hustle-part-2.html",
    title: {
      zh: "外包篇 2：AI 接互联网零活，钱从哪来、坑在哪",
      en: "Outsourcing Part 2: AI Side Jobs on the Web — Where Money and Pain Come From",
      ja: "外注編 2：AI で Web の副業を受ける——収入の源と落とし穴",
    },
    summary: {
      zh: "网站 / 小程序怎么用 AI 赶；月入 3～4k 常见、运气好可到 8k；两天 HTML 拖两月、急单加卡服务器为什么千万别碰。",
      en: "Web & mini-program gigs with AI; ¥3–4k common, luck to ¥8k; why a two-day HTML and a rush job on a bad server hurt.",
      ja: "サイト／ミニプログラムを AI でどう進めるか。月 3〜4 千元が目安、運が良ければ 8 千。2 日の HTML が 2 か月延びた話と、急ぎ案件＋遅いサーバに手を出してはいけない理由。",
    },
  },
  {
    id: "taobao-outsource-group-half-year",
    category: "growth",
    date: "2026.09.06",
    href: "/blog/taobao-outsource-group-half-year.html",
    title: {
      zh: "淘宝外包群接单半年：流程怎么走，坑在哪里",
      en: "Six Months in Taobao Outsource Groups: The Flow and the Traps",
      ja: "淘宝外注グループで半年受注：流れと落とし穴",
    },
    summary: {
      zh: "个人分享，不是埋怨行业。淘宝网店进群 → 报价开工 → 月底结算；钱、单价、抽成和回头客上的真实感受。",
      en: "Personal sharing, not a rant. Shop groups → quote & build → month-end pay; notes on cash timing, rates, cuts, and repeats.",
      ja: "個人の体験共有であり、業界批判ではありません。淘宝ネット店からグループへ → 見積もりと着手 → 月末精算。入金・単価・中間マージン・リピートについての実感。",
    },
  },
  {
    id: "i2c-trise-ack-trap",
    category: "tech",
    date: "2026.03.15",
    href: "/blog/i2c-trise-ack-trap.html",
    title: {
      zh: "Linux I2C 驱动调试实录：寄存器快照 + 示波器揪出隐藏时序陷阱",
      en: "Embedded Linux I2C Debugging: How a Register Dump Saved Me from an Invisible Timing Trap",
      ja: "Linux I2C ドライバ実録：レジスタダンプとオシロで隠れたタイミング罠を追う",
    },
    summary: {
      zh: "偶发 EIO / 无 ACK。CCR 看着完美，示波器却看到 SCL 拖尾；失败瞬间 SR1.AF=1，根因是 TRISE 配小了。",
      en: "Intermittent EIO and missing ACKs. CCR looked perfect, but the scope showed SCL trailing edges; SR1.AF=1 at failure — TRISE was set too low.",
      ja: "間欠的な EIO / ACK 欠落。CCR は完璧に見えたが、オシロでは SCL の立ち上がりが遅延。失敗瞬間に SR1.AF=1——原因は TRISE が小さすぎたこと。",
    },
  },
  {
    id: "rk3588-rga-multi-camera",
    category: "tech",
    date: "2026.02.07",
    href: "/blog/rk3588-rga-multi-camera.html",
    cover: "/img/blog/rk3588-cover.jpg",
    title: {
      zh: "基于 RK3588 RGA 硬件加速的三路相机并发预览方案设计",
      en: "Architecting High-Performance Multi-Camera Streaming with RGA Hardware Acceleration",
      ja: "RK3588 RGA ハードウェア加速による 3 系統カメラ同時プレビュー設計",
    },
    summary: {
      zh: "三路高分辨率相机同时预览。RGA + DMA 零拷贝做格式转换，统一异构源，CPU 占用很低。",
      en: "Concurrent preview of three high-res cameras. RGA + DMA zero-copy conversion with a unified buffer layer — low CPU use.",
      ja: "高解像度カメラ 3 系統の同時プレビュー。RGA + DMA ゼロコピーで形式変換し、異種ソースを統一。CPU 負荷は低い。",
    },
  },
  {
    id: "ai-video-creation-engine",
    category: "tech",
    date: "2026.01.30",
    href: "/blog/ai-video-creation-engine.html",
    cover: "/img/blog/ai-video-cover.jpg",
    title: {
      zh: "我构建了一个分布式 AI 视频创作引擎",
      en: "Reimagining Video Creation with AI & GPU Acceleration",
      ja: "分散型 AI 動画制作エンジンを構築した話",
    },
    summary: {
      zh: "FastAPI + 分布式 GPU / NVENC。DeepSeek 改写、Edge-TTS 配音，合成相对 CPU 方案提速约 8–10 倍。",
      en: "FastAPI + distributed GPU / NVENC. DeepSeek copywriting, Edge-TTS voiceover — about 8–10× faster than CPU rendering.",
      ja: "FastAPI + 分散 GPU / NVENC。DeepSeek で文案、Edge-TTS で音声。CPU 経路よりおよそ 8〜10 倍速い合成。",
    },
  },
  {
    id: "tonometer-freertos-threads",
    category: "tech",
    date: "2025.12",
    draft: true,
    href: "#",
    title: {
      zh: "眼压机 MCU：FreeRTOS 四线程与气路 / 电机队列设计",
      en: "Tonometer MCU: FreeRTOS four-thread and pneumatic / motor queues",
      ja: "眼圧計 MCU：FreeRTOS 4 スレッドと気路／モータキュー設計",
    },
    summary: {
      zh: "uart / handle / pump / motor 如何用队列协作，以及 DMA 串口帧的分段接收——草稿占位。",
      en: "How uart / handle / pump / motor cooperate via queues, plus segmented DMA UART framing — draft placeholder.",
      ja: "uart / handle / pump / motor がキューでどう協調するか、DMA UART フレームの分割受信——下書きプレースホルダ。",
    },
  },
];
