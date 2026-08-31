window.ARTICLE = {
  id: "ai-video-creation-engine",
  date: "2026.01.30",
  title: {
    zh: "我构建了一个分布式 AI 视频创作引擎",
    en: "Reimagining Video Creation with AI & GPU Acceleration",
  },
  lede: {
    zh: "FastAPI + GPU / NVENC：逻辑与渲染解耦的视频合成后端",
    en: "FastAPI + GPU / NVENC: business logic decoupled from render",
  },
  tags: ["Python", "FastAPI", "AI", "FFmpeg", "NVIDIA", "GPU"],
  tagLabel: { zh: "后端", en: "Backend" },
  sections: [
    {
      paragraphs: [
        {
          zh: "我独立完成了一套 AI 视频分割与自动合成后端。为了渲染效率，放弃单机纯 CPU 方案，改用 FastAPI + 分布式 GPU：CPU 节点跑业务逻辑，编解码交给显卡，配合 FFmpeg CUDA（NVENC）硬加速，合成相对传统 CPU 路径大约快 8–10 倍。",
          en: "I built a distributed AI video splitting and synthesis backend. FastAPI handles logic on CPU nodes while encode/decode rides NVIDIA GPUs via FFmpeg CUDA (NVENC) — about 8–10× faster than CPU-only rendering.",
        },
      ],
      figures: [
        {
          src: "/img/blog/ai-video-cover.jpg",
          caption: {
            zh: "小程序端「AI 原创」：分割、分镜、口播与一键合成。",
            en: "Mini-program “AI Original”: split, scenes, voiceover, one-tap synthesize.",
          },
        },
      ],
    },
    {
      heading: {
        zh: "核心亮点",
        en: "Key features",
      },
      bullets: [
        {
          zh: "<strong>异构计算：</strong>业务逻辑与 GPU 算力解耦，支持高并发任务调度。",
          en: "<strong>Heterogeneous compute:</strong> logic decoupled from GPU render for concurrent jobs.",
        },
        {
          zh: "<strong>AI 全链路：</strong>DeepSeek 文案重写，Edge-TTS 自动配音。",
          en: "<strong>AI workflow:</strong> DeepSeek rewrite plus Edge-TTS voiceover.",
        },
        {
          zh: "<strong>智能存储：</strong>本地缓存 + 七牛云 OSS，LRU 自动清理。",
          en: "<strong>Storage:</strong> local cache + Qiniu OSS with LRU cleanup.",
        },
        {
          zh: "<strong>硬核编解码：</strong>支持 4K 无损分割与多轨音频实时混音。",
          en: "<strong>Pro codecs:</strong> lossless 4K splitting and real-time multi-track mix.",
        },
      ],
      figures: [
        {
          src: "/img/blog/ai-video-script.jpg",
          caption: {
            zh: "AI 写口播：DeepSeek 创作 / 改写，并选择 Edge-TTS 主播音色。",
            en: "AI script UI: DeepSeek create/rewrite with Edge-TTS voice pick.",
          },
        },
        {
          src: "/img/blog/ai-video-history.jpg",
          caption: {
            zh: "历史记录：合成任务状态、预览与下载。",
            en: "History: synthesis status, preview, and download.",
          },
        },
      ],
    },
    {
      heading: {
        zh: "小结",
        en: "Closing",
      },
      paragraphs: [
        {
          zh: "无论是短视频矩阵还是自动化内容产出，这套底层都能提供更快的合成支撑。欢迎就性能优化或音视频自动化继续交流。",
          en: "Whether you run a short-video matrix or automated content pipelines, this stack is built for faster synthesis. Always happy to talk optimization or A/V automation.",
        },
      ],
    },
  ],
};
