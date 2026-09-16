window.ARTICLE = {
  id: "rk3588-rga-multi-camera",
  date: "2026.02.07",
  title: {
    zh: "基于 RK3588 RGA 硬件加速的三路相机并发预览方案设计",
    en: "Architecting High-Performance Multi-Camera Streaming with RGA Hardware Acceleration",
    ja: "RK3588 RGA ハードウェア加速による 3 系統カメラ同時プレビュー設計",
  },
  lede: {
    zh: "用 RGA + DMA 零拷贝撑起三路高清预览",
    en: "RGA + DMA zero-copy for three high-res camera streams",
    ja: "RGA + DMA ゼロコピーで 3 系統フル HD プレビューを支える",
  },
  tags: ["Embedded", "Linux", "Rockchip", "RGA", "C++", "Qt"],
  tagLabel: { zh: "嵌入式", en: "Embedded", ja: "組み込み" },
  related: [
    {
      href: "/resume/#mmitest",
      label: {
        zh: "MMITest / LongTest：RK3588 工厂与老化测试",
        en: "MMITest / LongTest: RK3588 factory & burn-in tools",
        ja: "MMITest / LongTest：RK3588 工場・エージング試験",
      },
    },
  ],
  sections: [
    {
      paragraphs: [
        {
          zh: "在最近的嵌入式 Linux 项目中，我负责核心视觉采集模块，目标是三路高分辨率相机（同轴、USB 及无线图传）同时开启与实时预览。若继续用 CPU 软解（如 cv::cvtColor）做 YUV→RGB，会抢走算力，拖垮 UI。",
          en: "In a recent RK3588 Embedded Linux project I owned the vision capture path: three high-resolution streams (coaxial, USB, wireless) previewed at once. CPU soft conversion would choke the UI thread under that throughput.",
          ja: "最近の組み込み Linux 案件で、コアの映像キャプチャを担当した。目標は高解像度カメラ 3 系統（同軸、USB、無線図伝）の同時起動とリアルタイムプレビュー。CPU ソフト変換（例：cv::cvtColor）で YUV→RGB を続けると、計算資源を奪い UI が落ちる。",
        },
      ],
      figures: [
        {
          src: "/img/blog/rk3588-legacy.jpg",
          caption: {
            zh: "传统 CPU 软解路径：高负载读写与 UI 争抢算力。",
            en: "Legacy CPU soft-decode path: heavy memory traffic fights the UI thread.",
            ja: "従来の CPU ソフト変換経路：高負荷な読み書きが UI と計算資源を奪い合う。",
          },
        },
      ],
    },
    {
      heading: {
        zh: "架构选型与实现方案",
        en: "The architectural decision",
        ja: "アーキテクチャ選定と実装",
      },
      paragraphs: [
        {
          zh: "基于 Rockchip SoC，我把流水线建在内置 RGA（2D Raster Graphic Acceleration）上，并用 DMA 零拷贝：物理连续内存里的原始 YUV 直接喂给 RGA 做格式转换与缩放，绕过多余 Cache 刷新，吃满总线带宽。",
          en: "I designed around the on-SoC RGA from day one. A DMA path feeds raw YUV from contiguous buffers into RGA for YUV→RGB and scaling, skipping extra CPU cache churn.",
          ja: "Rockchip SoC を前提に、内蔵 RGA（2D Raster Graphic Acceleration）上にパイプラインを組み、DMA ゼロコピーを使う：物理連続メモリ上の生 YUV を直接 RGA に渡し、形式変換とスケールを行い、余分な Cache フラッシュを避けてバス帯域を活かす。",
        },
      ],
      figures: [
        {
          src: "/img/blog/rk3588-rga.jpg",
          caption: {
            zh: "RGA 硬件加速方案：CPU 只下轻量配置，像素路径走 DMA。",
            en: "RGA hardware path: CPU only configures; pixels stay on DMA.",
            ja: "RGA ハードウェア加速：CPU は軽い設定のみ、画素経路は DMA。",
          },
        },
      ],
    },
    {
      heading: {
        zh: "攻克的技术难点",
        en: "Technical challenges",
        ja: "乗り越えた技術課題",
      },
      bullets: [
        {
          zh: "<strong>内存对齐：</strong>RGA 对地址对齐极严。用 posix_memalign 做 4K 页对齐内存池，稳定 DMA，避免撕裂与段错误。",
          en: "<strong>Strict alignment:</strong> posix_memalign 4K page-aligned pools keep DMA stable and avoid tearing / faults.",
          ja: "<strong>メモリアライメント：</strong>RGA はアドレス整列が非常に厳しい。posix_memalign で 4K ページ整列プールを作り、DMA を安定させ、ティアリングやセグフォルトを防ぐ。",
        },
        {
          zh: "<strong>异构源统一：</strong>三路接口不同（MIPI / USB），格式也不一样（UYVY / YUYV）。统一 Buffer 层按 V4L2 元数据动态配 RGA 通道。",
          en: "<strong>Heterogeneous sources:</strong> a unified buffer layer configures RGA from V4L2 metadata (UYVY vs YUYV, MIPI vs USB).",
          ja: "<strong>異種ソースの統一：</strong>3 系統はインタフェース（MIPI / USB）も形式（UYVY / YUYV）も異なる。統一 Buffer 層が V4L2 メタデータに応じて RGA チャネルを動的設定。",
        },
      ],
      figures: [
        {
          src: "/img/blog/rk3588-cover.jpg",
          caption: {
            zh: "现场预览界面：同轴 / 视野 / RX 可切换，硬件控制与存图在同一套 UI。",
            en: "Live preview UI: switch coaxial / FOV / RX with hardware controls in one panel.",
            ja: "現場プレビュー UI：同軸／視野／RX を切替可能。ハード制御と保存が同一 UI。",
          },
        },
      ],
    },
    {
      heading: {
        zh: "最终成果",
        en: "Outcome",
        ja: "最終成果",
      },
      paragraphs: [
        {
          zh: "三路并发预览流畅。满负载下视频路径 CPU 占用仍很低，给业务与复杂 UI 留足余量——嵌入式里软硬结合仍然关键。",
          en: "All three cameras preview smoothly with negligible CPU on the video path, leaving headroom for business logic and UI. Hardware-aware design still wins in embedded.",
          ja: "3 系統の同時プレビューは滑らか。フル負荷でも映像経路の CPU 使用率は低く、業務ロジックと複雑な UI に余裕を残す——組み込みではソフトとハードの連携が依然として鍵だ。",
        },
      ],
    },
  ],
};
