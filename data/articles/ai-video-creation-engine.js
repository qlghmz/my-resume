window.ARTICLE = {
  id: "ai-video-creation-engine",
  date: "2026.01.30",
  title: {
    zh: "我构建了一个分布式 AI 视频创作引擎",
    en: "Reimagining Video Creation with AI & GPU Acceleration",
    ja: "分散型 AI 動画制作エンジンを構築した話",
  },
  lede: {
    zh: "FastAPI + GPU / NVENC：逻辑与渲染解耦的视频合成后端",
    en: "FastAPI + GPU / NVENC: business logic decoupled from render",
    ja: "FastAPI + GPU / NVENC：ロジックとレンダリングを分離した動画合成バックエンド",
  },
  tags: ["Python", "FastAPI", "AI", "FFmpeg", "NVIDIA", "GPU"],
  tagLabel: { zh: "后端", en: "Backend", ja: "バックエンド" },
  related: [
    {
      href: "/resume/#video",
      label: {
        zh: "GPU 视频处理 API（FastAPI + NVENC）",
        en: "GPU video API service (FastAPI + NVENC)",
        ja: "GPU 動画処理 API（FastAPI + NVENC）",
      },
    },
    {
      href: "/resume/#tensorview",
      label: {
        zh: "TensorView AI 写网页平台",
        en: "TensorView AI website builder",
        ja: "TensorView AI Web サイト構築",
      },
    },
  ],
  sections: [
    {
      paragraphs: [
        {
          zh: "我独立完成了一套 AI 视频分割与自动合成后端。为了渲染效率，放弃单机纯 CPU 方案，改用 FastAPI + 分布式 GPU：CPU 节点跑业务逻辑，编解码交给显卡，配合 FFmpeg CUDA（NVENC）硬加速，合成相对传统 CPU 路径大约快 8–10 倍。",
          en: "I built a distributed AI video splitting and synthesis backend. FastAPI handles logic on CPU nodes while encode/decode rides NVIDIA GPUs via FFmpeg CUDA (NVENC) — about 8–10× faster than CPU-only rendering.",
          ja: "AI 動画の分割と自動合成バックエンドを一人で構築した。レンダ効率のため、単機の純 CPU 案を捨て、FastAPI + 分散 GPU に変更：CPU ノードで業務ロジック、エンコード／デコードは GPU、FFmpeg CUDA（NVENC）ハード加速で、従来の CPU 経路よりおよそ 8〜10 倍速い。",
        },
      ],
      figures: [
        {
          src: "/img/blog/ai-video-cover.jpg",
          caption: {
            zh: "小程序端「AI 原创」：分割、分镜、口播与一键合成。",
            en: "Mini-program “AI Original”: split, scenes, voiceover, one-tap synthesize.",
            ja: "ミニプログラム「AI 原創」：分割、分鏡、口播、ワンタップ合成。",
          },
        },
      ],
    },
    {
      heading: {
        zh: "核心亮点",
        en: "Key features",
        ja: "主なポイント",
      },
      bullets: [
        {
          zh: "<strong>异构计算：</strong>业务逻辑与 GPU 算力解耦，支持高并发任务调度。",
          en: "<strong>Heterogeneous compute:</strong> logic decoupled from GPU render for concurrent jobs.",
          ja: "<strong>異種計算：</strong>業務ロジックと GPU 計算を分離し、高並行タスクをスケジューリング。",
        },
        {
          zh: "<strong>AI 全链路：</strong>DeepSeek 文案重写，Edge-TTS 自动配音。",
          en: "<strong>AI workflow:</strong> DeepSeek rewrite plus Edge-TTS voiceover.",
          ja: "<strong>AI フルパイプライン：</strong>DeepSeek で文案の書き換え、Edge-TTS で自動音声。",
        },
        {
          zh: "<strong>智能存储：</strong>本地缓存 + 七牛云 OSS，LRU 自动清理。",
          en: "<strong>Storage:</strong> local cache + Qiniu OSS with LRU cleanup.",
          ja: "<strong>スマートストレージ：</strong>ローカルキャッシュ + 七牛クラウド OSS、LRU 自動クリーンアップ。",
        },
        {
          zh: "<strong>硬核编解码：</strong>支持 4K 无损分割与多轨音频实时混音。",
          en: "<strong>Pro codecs:</strong> lossless 4K splitting and real-time multi-track mix.",
          ja: "<strong>本格エンコード／デコード：</strong>4K ロスレス分割とマルチトラック音声のリアルタイムミックス。",
        },
      ],
      figures: [
        {
          src: "/img/blog/ai-video-script.jpg",
          caption: {
            zh: "AI 写口播：DeepSeek 创作 / 改写，并选择 Edge-TTS 主播音色。",
            en: "AI script UI: DeepSeek create/rewrite with Edge-TTS voice pick.",
            ja: "AI 口播作成：DeepSeek で作成／改写し、Edge-TTS のボイスを選択。",
          },
        },
        {
          src: "/img/blog/ai-video-history.jpg",
          caption: {
            zh: "历史记录：合成任务状态、预览与下载。",
            en: "History: synthesis status, preview, and download.",
            ja: "履歴：合成タスクの状態、プレビュー、ダウンロード。",
          },
        },
      ],
    },
    {
      heading: {
        zh: "小结",
        en: "Closing",
        ja: "まとめ",
      },
      paragraphs: [
        {
          zh: "无论是短视频矩阵还是自动化内容产出，这套底层都能提供更快的合成支撑。欢迎就性能优化或音视频自动化继续交流。",
          en: "Whether you run a short-video matrix or automated content pipelines, this stack is built for faster synthesis. Always happy to talk optimization or A/V automation.",
          ja: "ショート動画マトリクスでも自動化コンテンツでも、この基盤はより速い合成を支える。性能最適化や音動画の自動化について、ぜひご交流ください。",
        },
      ],
    },
  ],
};
