window.ARTICLE = {
  id: "i2c-trise-ack-trap",
  date: "2026.03.15",
  title: {
    zh: "Linux I2C 驱动调试实录：如何用寄存器快照外加示波器，揪出隐藏的时序陷阱",
    en: "Embedded Linux I2C Debugging: How a Register Dump Saved Me from an Invisible Timing Trap",
  },
  lede: {
    zh: "CCR 看起来完美，真正翻车的是 TRISE。",
    en: "CCR looked flawless. TRISE was the real trap.",
  },
  tags: ["Embedded", "Linux", "I2C", "Driver", "Hardware"],
  tagLabel: { zh: "嵌入式", en: "Embedded" },
  sections: [
    {
      paragraphs: [
        {
          zh: "最近在处理一个引脚资源受限的项目，需要通过 I2C 总线挂载拓展芯片来外扩 GPIO。本以为是常规任务，却碰上了偶发性恶魔：系统频繁抛出 EIO (-5)，从机偶发无 ACK。",
          en: "Recently I worked on a layout where the host MCU needed more GPIOs, so we hung an I2C expander. Standard architecture — until intermittent EIO (-5) errors and missing slave ACKs showed up.",
        },
        {
          zh: "面对软硬件交织的模糊报错，盲目改驱动多半是碰运气。我选择了结构化组合拳：示波器抓波 + 失败瞬间硬件寄存器 Dump。",
          en: "Instead of guessing at the driver, I took a structured path: scope the bus and dump physical I2C registers at the moment of failure.",
        },
      ],
    },
    {
      heading: {
        zh: "完美的假象",
        en: "The Illusion",
      },
      paragraphs: [
        {
          zh: "检查分频寄存器 CCR，按 100 kHz Standard Mode 手算完全对得上，波特率在纸面上无懈可击。",
          en: "The Clock Control Register (CCR) was calculated correctly for 100 kHz Standard Mode. On paper the baud rate looked flawless.",
        },
      ],
    },
    {
      heading: {
        zh: "异常的现场",
        en: "The Symptom",
      },
      paragraphs: [
        {
          zh: "示波器上 SCL 上升沿有轻微拖尾（爬坡偏慢）；内核在失败瞬间打出的寄存器快照显示 SR1.AF = 1（应答失败）。",
          en: "The oscilloscope showed a slight trailing edge on the SCL rise. The register snapshot at failure captured SR1.AF = 1 (Acknowledge Failure).",
        },
      ],
    },
    {
      heading: {
        zh: "致命的根因",
        en: "The Root Cause",
      },
      paragraphs: [
        {
          zh: "问题出在常被忽略的 TRISE（最大上升时间寄存器）。配置值过小，硬件状态机抢跑——SCL 还没爬到稳定高电平（Vih）就开始采样或进入下一比特，于是误码和 NACK。",
          en: "TRISE (maximum rise time) was set too low. The I2C state machine jumped the gun — sampling before SCL had reached a valid high (Vih).",
        },
      ],
    },
    {
      heading: {
        zh: "闭环与验证",
        en: "The Fix",
      },
      paragraphs: [
        {
          zh: "按外设时钟（PCLK）与 I2C 规范重算 TRISE，修正 Device Tree / 驱动初始化。10,000 次循环压力测试零报错。",
          en: "I recomputed TRISE from PCLK and the I2C spec, updated Device Tree / driver init, and the bus stayed clean across a 10,000-cycle stress test.",
        },
      ],
    },
    {
      heading: {
        zh: "一点心得",
        en: "Key Takeaway",
      },
      paragraphs: [
        {
          zh: "上层驱动框架常会掩盖物理层波形。抽象层报出模糊错误时，直接读 MMIO 打一份寄存器快照——硬件比代码更诚实。",
          en: "High-level abstractions often mask physical reality. When a driver throws a generic error, dump the hardware registers. Registers do not lie.",
        },
      ],
    },
  ],
};
