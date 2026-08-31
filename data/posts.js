window.POSTS = [
  {
    id: "rk3588-rga-multi-camera",
    date: "2026.02.07",
    href: "/blog/rk3588-rga-multi-camera.html",
    title: {
      zh: "基于 RK3588 RGA 硬件加速的三路相机并发预览方案设计",
      en: "Architecting High-Performance Multi-Camera Streaming with RGA Hardware Acceleration",
    },
    summary: {
      zh: "三路高分辨率相机同时预览。用 SoC 内置 RGA 和 DMA 零拷贝做格式转换，解决内存对齐与异构源统一抽象，CPU 占用很低。",
      en: "Concurrent preview of three high-resolution cameras. SoC RGA plus DMA zero-copy conversion, with memory alignment and a unified buffer layer for heterogeneous sources — low CPU use.",
    },
  },
  {
    id: "ls2p300-i2c-trise",
    date: "2026.03",
    draft: true,
    href: "#",
    title: {
      zh: "龙芯 LS2P300：I2C TRISE 配错导致无 ACK 的一次排障",
      en: "Loongson LS2P300: fixing I2C no-ACK from a wrong TRISE setting",
    },
    summary: {
      zh: "SGM4593 拓展板无应答。对照 APB 时钟与模式公式重算上升时间后通信恢复——笔记待整理发布。",
      en: "SGM4593 expander silent until TRISE was recomputed from APB clock and mode. Write-up coming.",
    },
  },
  {
    id: "tonometer-freertos-threads",
    date: "2025.12",
    draft: true,
    href: "#",
    title: {
      zh: "眼压机 MCU：FreeRTOS 四线程与气路 / 电机队列设计",
      en: "Tonometer MCU: FreeRTOS four-thread and pneumatic / motor queues",
    },
    summary: {
      zh: "uart / handle / pump / motor 如何用队列协作，以及 DMA 串口帧的分段接收——草稿占位，方便先看卡牌切换效果。",
      en: "How uart / handle / pump / motor cooperate via queues, plus segmented DMA UART framing — draft placeholder for the deck demo.",
    },
  },
];
