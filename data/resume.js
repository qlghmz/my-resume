window.RESUME = {
  sections: [
    {
      id: "work-deli",
      heading: { zh: "工作经历", en: "Work Experience" },
      counter: { zh: "得力集团", en: "Deli Group" },
      org: {
        zh: "得力集团有限公司 · 嵌入式 Linux 驱动工程师",
        en: "Deli Group Co., Ltd. · Embedded Linux Driver Engineer",
      },
      cards: [
        {
          id: "ls2p300",
          meta: { zh: "2026.02 – 至今", en: "2026.02 – Present" },
          title: {
            zh: "龙芯 LS2P300 SoC 平台驱动开发与系统集成（JuraL 打印扫描一体机）",
            en: "Loongson LS2P300 SoC drivers & integration (JuraL MFP)",
          },
          lead: {
            zh: "项目运行于龙芯 LS2P300 三核 SoC：主核 Linux 6.6 + 两个小核 FreeRTOS（打印引擎 / 扫描引擎），负责 Linux 侧外设驱动调试、应用层接口与大小核协同。",
            en: "LS2P300 triple-core SoC: Linux 6.6 on the big core + FreeRTOS on two small cores (print / scan engines). Own Linux-side peripheral bring-up, app APIs, and big–little coordination.",
          },
          bullets: [
            {
              zh: "<strong>I2C 控制器驱动：</strong>排查 SGM4593 IO 拓展板硬件 I2C 无 ACK；定位原厂驱动 TRISE 固定配置错误，按 APB 时钟与 I2C 模式公式重算上升时间后恢复通信；封装统一 I2C IO 接口（大核直控 / 小核 Mailbox 转发），完成并发互斥测试。",
              en: "<strong>I2C controller:</strong> fixed SGM4593 expander no-ACK; corrected vendor TRISE register math from APB clock / I2C mode; unified I2C IO API (direct + Mailbox forward) with concurrency tests.",
            },
            {
              zh: "<strong>SPI / OP 面板驱动：</strong>分析 OP 面板 SPI 逐字节中断刷新（~2 万中断/秒）；研究 CR/IER/SR/DR 等寄存器，推进 DMA SPI 传输以降低中断开销。",
              en: "<strong>SPI / OP panel:</strong> analyzed byte-interrupt refresh (~20k IRQ/s); studied CR/IER/SR/DR; moving to DMA SPI to cut IRQ cost.",
            },
            {
              zh: "<strong>大小核通信：</strong>梳理 Mailbox（/dev/mailbox、/dev/mailbox2）、共享内存与 SysV 消息队列；调整启动顺序，解决小核先于 U209 传感器初始化的竞态。",
              en: "<strong>Big–little IPC:</strong> Mailbox (/dev/mailbox, /dev/mailbox2), shared memory, SysV queues; fixed boot-order race before U209 sensor init.",
            },
            {
              zh: "<strong>设备树与构建：</strong>参与 ls2p300 平台 DTS 与 Buildroot 交叉编译环境；熟悉 LoongArch 工具链与内核驱动模块开发。",
              en: "<strong>DT & build:</strong> ls2p300 DTS and Buildroot cross env; LoongArch toolchain and kernel module workflow.",
            },
            {
              zh: "<strong>技术栈：</strong>Linux 6.6 · LoongArch · 龙芯 LS2P300 · I2C/SPI/GPIO · Mailbox · FreeRTOS · Device Tree · Buildroot",
              en: "<strong>Stack:</strong> Linux 6.6 · LoongArch · LS2P300 · I2C/SPI/GPIO · Mailbox · FreeRTOS · Device Tree · Buildroot",
            },
          ],
        },
      ],
    },
    {
      id: "work-jiamu",
      heading: { zh: "工作经历", en: "Work Experience" },
      counter: { zh: "佳目医疗", en: "Jiamu Medical" },
      org: {
        zh: "浙江佳目医疗科技有限公司 · 2024.08 – 2026.01（约 1.5 年）",
        en: "Zhejiang Jiamu Medical Technology Co., Ltd. · 2024.08 – 2026.01 (~1.5 yrs)",
      },
      cards: [
        {
          id: "mcu",
          meta: { zh: "2025.08 – 2026.01", en: "2025.08 – 2026.01" },
          title: {
            zh: "医用款眼压机 MCU 程序开发（MCU RTOS）",
            en: "Medical tonometer MCU firmware (MCU RTOS)",
          },
          lead: {
            zh: "完成整个 MCU 系统、外设的开发，协助电机工程师完成电机控制。",
            en: "Owned the full MCU system and peripherals; assisted motor control bring-up.",
          },
          bullets: [
            {
              zh: "<strong>系统：</strong>FreeRTOS，四个线程 uart、handle、pump、motor，等待队列指令运作。",
              en: "<strong>System:</strong> FreeRTOS with uart / handle / pump / motor threads driven by queues.",
            },
            {
              zh: "<strong>外设：</strong>IO（风扇、电源使能、trigger）、UART（上位机 + 电机驱动板）、ADC（手柄/气体压力/压力传感器）、I²C（气压传感器、按键板）、EXTI（光耦、手柄按键、按键板中断）。",
              en: "<strong>Peripherals:</strong> GPIO (fan, power enable, trigger); UART (host + motor board); ADC (handle / gas / pressure); I²C (baro, keypad); EXTI (optocoupler, keys).",
            },
            {
              zh: "<strong>串口：</strong>协议 head,command_type,seq,uTick,length,data,crc,tail；分段接收；DMA 发送和接收。",
              en: "<strong>UART:</strong> head,command_type,seq,uTick,length,data,crc,tail; segmented RX; DMA TX/RX.",
            },
            {
              zh: "<strong>手柄 / 气路 / 电机：</strong>DMA 实时检测手柄与按键并入队；打气至指定气缸压力、开阀吹气取值；S 曲线加减速。",
              en: "<strong>Handle / pneumatics / motor:</strong> DMA key sampling to queues; inflate to target, valve blow sample; S-curve accel/decel.",
            },
          ],
        },
        {
          id: "mmitest",
          meta: { zh: "2024.08 – 2026.01", en: "2024.08 – 2026.01" },
          title: {
            zh: "眼压机 mmitest、longtest 工厂测试与老化工具（Qt RK3588 RGA）",
            en: "Tonometer mmitest / longtest factory & burn-in tools (Qt, RK3588, RGA)",
          },
          lead: {
            zh: "基于 Qt 的工厂测试与老化工具，运行于 RK3588，涵盖串口、相机、气路/电机校准与老化、传感器与外设测试、固件更新等。",
            en: "Qt factory and burn-in suite on RK3588: serial, cameras, pneumatic/motor cal & aging, sensors, firmware update.",
          },
          bullets: [
            {
              zh: "<strong>平台与 RGA：</strong>Rockchip RGA（wrapbuffer_fd / wrapbuffer_virtualaddr），V4L2 DMA 或指针 UYVY/YUYV 经 imresize 转 RGB 供 Qt 显示；同轴（DMA FD）与 USB（虚拟地址）输入。",
              en: "<strong>Platform & RGA:</strong> wrapbuffer_fd / virtualaddr; V4L2 DMA or pointer UYVY/YUYV → RGB via imresize; coax (DMA FD) and USB (vaddr) paths.",
            },
            {
              zh: "<strong>相机：</strong>RkCamera + V4L2（MPLANE 同轴 UYVY / CAPTURE USB YUYV）；mmap、VIDIOC_EXPBUF 导出 DMA FD；GLVideoWidget OpenGL 预览，RX 路 Bayer SBGGR8 fragment shader Debayer。",
              en: "<strong>Cameras:</strong> RkCamera + V4L2 (MPLANE coax UYVY / CAPTURE USB YUYV); mmap + EXPBUF DMA FD; OpenGL preview; Bayer SBGGR8 debayer shader on RX.",
            },
            {
              zh: "<strong>串口与界面：</strong>QSerialPort 协议解析，McuControl 分发；气路/电机/相机/老化/固件更新/一键测试/传感器/ScreenTest/VirtualKeyboard 等模块。",
              en: "<strong>Serial & UI:</strong> QSerialPort parse + McuControl dispatch; modules for pneumatics, motor, camera, aging, OTA, one-click test, sensors, ScreenTest, VirtualKeyboard.",
            },
            {
              zh: "<strong>校准：</strong>打气/吹气自校准、出厂气路与光学校准、整机老化流程。",
              en: "<strong>Calibration:</strong> inflate/blow auto-cal, factory pneumatic & optics cal, full-unit burn-in.",
            },
          ],
        },
        {
          id: "debian-image",
          title: {
            zh: "公司 Debian 镜像制作与固件打包（RK3588/RK3399 Ubuntu）",
            en: "Debian image build & firmware pack (RK3588/RK3399 Ubuntu)",
          },
          bullets: [
            {
              zh: "rsync 导出 rootfs → dd + mkfs.ext4 → e2fsck + resize2fs -M → rk3588/rk3399-mkupdate.sh 打包 update.img，供 RKDevTool 刷机。",
              en: "rsync rootfs → dd + mkfs.ext4 → e2fsck + resize2fs -M → rk*-mkupdate.sh → update.img for RKDevTool.",
            },
          ],
        },
        {
          id: "ymodem-ota",
          title: {
            zh: "眼压机自动更新工具（MCU 固件 + Ymodem Qt）",
            en: "Tonometer auto-update tool (MCU firmware + Ymodem Qt)",
          },
          bullets: [
            {
              zh: "Ymodem（SOH/STX、128/1024 字节、CRC）+ 串口帧（0xAA55…0x66BB）；SlaveCheck 区分 BootLoader/应用；YmodemMaster 与 mmitest 协议一致。",
              en: "Ymodem (SOH/STX, 128/1024, CRC) + frame 0xAA55…0x66BB; SlaveCheck BootLoader vs app; YmodemMaster aligned with mmitest.",
            },
          ],
        },
        {
          id: "optics",
          title: {
            zh: "optics 光学测试工具（Qt OpenCV）",
            en: "Optics optical test tool (Qt, OpenCV)",
          },
          bullets: [
            {
              zh: "检测两条横向斜率白线中心点：形态学膨胀 + 边缘检测取中点（主方案）；投影法因精度不足取消。",
              en: "Find midpoints of two sloped white lines: dilate + edges (primary); projection dropped for accuracy.",
            },
          ],
        },
        {
          id: "dicom",
          meta: { zh: "2024.08 – 2024.12", en: "2024.08 – 2024.12" },
          title: {
            zh: "dicom 医学成像文件制作（dicomtk + OpenCV）",
            en: "DICOM medical imaging files (DCMTK + OpenCV)",
          },
          bullets: [
            {
              zh: "DICOMDIR 保存/读取，结构 DICOM/UserID/TestTime/；两张图片 + 一个多帧视频共三个 DICOM 文件。",
              en: "DICOMDIR save/load under DICOM/UserID/TestTime/; two stills + one multi-frame video.",
            },
          ],
        },
        {
          id: "ad8555",
          meta: { zh: "2025.04 – 2025.06", en: "2025.04 – 2025.06" },
          title: {
            zh: "ad8555 烧录工装（MCU）",
            en: "AD8555 programming fixture (MCU)",
          },
          bullets: [
            {
              zh: "DIGIN 烧写 AD8555 寄存器配置模式/倍率；ADC 读回验证；脉冲时序 &gt;50µs 为高、&lt;10µs 为低、位间隔 20µs。",
              en: "DIGIN program mode/gain; ADC verify; pulse &gt;50µs high, &lt;10µs low, 20µs bit gap.",
            },
          ],
        },
        {
          id: "eye-detect",
          meta: { zh: "2024.09 – 2024.12", en: "2024.09 – 2024.12" },
          title: {
            zh: "眼压机 眼球检测（YOLOv8 + OpenCV + PID + ncnn）",
            en: "Tonometer eye detection (YOLOv8 + OpenCV + PID + ncnn)",
          },
          bullets: [
            {
              zh: "红外相机 + 结构光；YOLOv8 训练左眼/右眼/瞳孔/空/光斑五类，转 ncnn 嵌入式推理；光斑间距深度估计，Z 轴扫掠找回双光斑。",
              en: "IR + structured light; YOLOv8 five classes → ncnn; spot spacing for depth; Z sweep to recover dual spots.",
            },
          ],
        },
        {
          id: "iop-model",
          meta: {
            zh: "2024.03 – 2024.09 · 实习期间完成",
            en: "2024.03 – 2024.09 · Internship",
          },
          title: {
            zh: "眼压机 眼压计算模型（ResNet + ncnn）",
            en: "IOP estimation model (ResNet + ncnn)",
          },
          bullets: [
            {
              zh: "分类改回归输出 float；最大形变点数据集 + 660 维吹气值输入；ncnn 嵌入式部署。",
              en: "Classification → float regression; peak-deformation dataset + 660-dim blow vector; ncnn on-device.",
            },
          ],
        },
        {
          id: "sam2",
          meta: { zh: "2025.06", en: "2025.06" },
          title: {
            zh: "眼角膜检测标注（SAM2）",
            en: "Cornea annotation (SAM2)",
          },
          bullets: [
            {
              zh: "600 视频 × 52 帧多边形标注；SAM2 推理脚本 + 点击引导，效率提升 ≥2×。",
              en: "600 videos × 52 frames polygon labels; SAM2 scripts + click prompts; ≥2× faster.",
            },
          ],
        },
        {
          id: "membrane",
          meta: {
            zh: "2024.06 – 2024.12 · 实习期间完成",
            en: "2024.06 – 2024.12 · Internship",
          },
          title: {
            zh: "可变眼膜项目（MCU + LCD）",
            en: "Variable eye membrane (MCU + LCD)",
          },
          bullets: [
            {
              zh: "旋钮调节密封眼膜内气压；LCD 显示缸内气压传感器眼压值。",
              en: "Knob sets sealed membrane pressure; LCD shows IOP from cylinder sensor.",
            },
          ],
        },
      ],
    },
    {
      id: "projects",
      heading: { zh: "项目经历", en: "Projects" },
      counter: { zh: "独立 / 兼职", en: "Indie / Side" },
      cards: [
        {
          id: "tensorview",
          meta: {
            zh: "独立建立 · 2025 – 至今 · 产品已上线",
            en: "Indie · 2025 – Present · Live product",
          },
          title: {
            zh: "TensorView AI Agent — AI 写网页平台（ai.tensorview.cc）",
            en: "TensorView AI Agent — AI website builder (ai.tensorview.cc)",
          },
          lead: {
            zh: "从零搭建并上线 TensorView——面向非技术用户的 AI 网站生成 SaaS：自然语言描述需求，Agent 生成可部署 Web 应用，支持对话迭代与一键发布。",
            en: "Built TensorView from scratch: prompt-to-website SaaS for non-developers, conversational iteration, one-click deploy.",
          },
          bullets: [
            {
              zh: "<strong>生成引擎：</strong>Vercel AI SDK streamText；Groq/Anthropic/OpenAI/Google/DashScope 多模型路由；Firecrawl 参考 URL；生成完整 React + Tailwind 前端。",
              en: "<strong>Engine:</strong> Vercel AI SDK streamText; multi-model routing; Firecrawl URL context; full React + Tailwind output.",
            },
            {
              zh: "<strong>预览与部署：</strong>E2B / Vercel Sandbox + Sandpack 降级；Edge 一键发布、自定义域名与 HTTPS。",
              en: "<strong>Preview & deploy:</strong> E2B / Vercel Sandbox + Sandpack fallback; Edge publish with custom domain / HTTPS.",
            },
            {
              zh: "<strong>SaaS：</strong>Next.js App Router + TypeScript + Tailwind；Supabase Auth + RLS；Free/Pro/Team 配额与 Token 计费；Stripe。",
              en: "<strong>SaaS:</strong> Next.js App Router + TS + Tailwind; Supabase Auth + RLS; Free/Pro/Team quotas; Stripe.",
            },
            {
              zh: "<strong>技术栈：</strong>Next.js · React · TypeScript · Tailwind · Vercel AI SDK · Firecrawl · E2B/Sandbox · Sandpack · Supabase · Stripe",
              en: "<strong>Stack:</strong> Next.js · React · TypeScript · Tailwind · Vercel AI SDK · Firecrawl · E2B/Sandbox · Sandpack · Supabase · Stripe",
            },
          ],
        },
        {
          id: "wechat-ai",
          title: {
            zh: "五大平台 AI 助手 微信小程序",
            en: "Multi-platform AI assistant WeChat mini program",
          },
          bullets: [
            {
              zh: "首页 / Coze 对话页 / WebView；H5 加载扣子对话，PAT 鉴权与会话隔离（open_user_id）；组件化工具卡片 + Markdown/代码高亮 agent-ui。",
              en: "Home / Coze chat / WebView; H5 Coze with PAT + open_user_id isolation; tool cards + Markdown/code agent-ui.",
            },
          ],
        },
        {
          id: "wordpress",
          title: {
            zh: "WordPress 项目开发与优化",
            en: "WordPress development & optimization",
          },
          bullets: [
            {
              zh: "<strong>Jin Best Tutoring：</strong>Eikra + LearnPress 二次开发；WP Mail SMTP + Gmail API；WPForms 校验与 UI/UX 定制。",
              en: "<strong>Jin Best Tutoring:</strong> Eikra + LearnPress; WP Mail SMTP + Gmail API; WPForms validation and UI/UX.",
            },
            {
              zh: "<strong>RobotsFriends：</strong>Elementor Pro 响应式；多语言 + SEO；Partner Portal 开发与集成。",
              en: "<strong>RobotsFriends:</strong> Elementor Pro responsive; i18n + SEO; Partner Portal build & integration.",
            },
          ],
        },
        {
          id: "warelax",
          title: {
            zh: "Warelax 静态资源安全下载系统",
            en: "Warelax secure static download system",
          },
          bullets: [
            {
              zh: "Flask + 七牛云私有空间；签名时效链接；IP 识别、频率限制、Nginx 反向代理 + HTTPS + systemd。",
              en: "Flask + Qiniu private bucket; signed expiring URLs; IP/rate limits; Nginx + HTTPS + systemd.",
            },
          ],
        },
        {
          id: "video",
          title: {
            zh: "GPU 视频处理 API 服务（FastAPI + NVENC）",
            en: "GPU video API service (FastAPI + NVENC)",
          },
          bullets: [
            {
              zh: "FFmpeg 切片/合并/TTS/BGM 混音；CUDA 解码 + h264_nvenc；MySQL + SQLAlchemy 项目/分镜/场景模型；七牛云并行上传。",
              en: "FFmpeg slice/merge/TTS/BGM; CUDA decode + h264_nvenc; MySQL/SQLAlchemy project–shot–scene; parallel Qiniu upload.",
            },
          ],
        },
      ],
    },
    {
      id: "education",
      heading: { zh: "教育背景", en: "Education" },
      counter: { zh: "2020–2024", en: "2020–2024" },
      cards: [
        {
          title: {
            zh: "浙大宁波理工学院（本科） · 计算机科学与技术",
            en: "Zhejiang University Ningbo Institute of Technology · B.S. Computer Science",
          },
          meta: {
            zh: "2020.09 – 2024.06",
            en: "2020.09 – 2024.06",
          },
          bullets: [
            {
              zh: "<strong>编程：</strong>C、C++、Python、Shell；嵌入式 Linux 应用与调试、Qt、交叉编译、多线程/消息队列/信号量。",
              en: "<strong>Programming:</strong> C, C++, Python, Shell; embedded Linux apps/debug, Qt, cross-compile, threads/queues/semaphores.",
            },
            {
              zh: "<strong>系统与移植：</strong>嵌入式 Linux 常用指令、移植与驱动定制；串口数据交换与远程控制。",
              en: "<strong>Systems:</strong> embedded Linux ops, porting, custom drivers; UART exchange and remote control.",
            },
            {
              zh: "<strong>深度学习：</strong>PyTorch/TensorFlow；常用 YOLO；ncnn、onnxruntime、paddle 嵌入式部署。",
              en: "<strong>DL:</strong> PyTorch/TensorFlow; YOLO; on-device ncnn / ONNX Runtime / Paddle.",
            },
            {
              zh: "<strong>单片机与硬件：</strong>STM32、Arduino（UART、I²C、ADC）；会看原理图、示波器调试；FFmpeg 音视频切割与合成。",
              en: "<strong>MCU & HW:</strong> STM32, Arduino (UART, I²C, ADC); schematics & scope; FFmpeg cut/compose.",
            },
          ],
        },
      ],
    },
    {
      id: "campus",
      heading: { zh: "校园经历", en: "Campus Experience" },
      counter: { zh: "可略过", en: "Optional" },
      cards: [
        {
          id: "mqtt",
          meta: { zh: "2022.06 – 2023.06", en: "2022.06 – 2023.06" },
          title: {
            zh: "mosquitto 广域物联网网关（MQTT + Linux 驱动）",
            en: "Mosquitto wide-area IoT gateway (MQTT + Linux drivers)",
          },
          bullets: [
            {
              zh: "ARM 开发板 + IO + 手机广域物联网模型；MQTT Client-Server；Qt 界面与 IO 驱动；U-Boot 与 OS 烧录部署。",
              en: "ARM board + IO + phone WAN IoT model; MQTT client–server; Qt UI + IO drivers; U-Boot/OS flashing.",
            },
          ],
        },
        {
          id: "robot",
          meta: {
            zh: "2022.06 – 2023.06 · 二等奖",
            en: "2022.06 – 2023.06 · Second prize",
          },
          title: {
            zh: "浙江省机器人竞赛",
            en: "Zhejiang Robotics Contest",
          },
          bullets: [
            {
              zh: "树莓派 + STM32 自动寻路抓取；YOLOv8 训练优化，Paddle 嵌入式部署。",
              en: "Pi + STM32 pathing/grasp; YOLOv8 tune; Paddle on-device deploy.",
            },
          ],
        },
        {
          id: "eng",
          meta: {
            zh: "2021.06 – 2021.12 · 三等奖",
            en: "2021.06 – 2021.12 · Third prize",
          },
          title: {
            zh: "浙江省工程训练竞赛项目",
            en: "Zhejiang Engineering Training Contest",
          },
          bullets: [
            {
              zh: "YOLOv5 物块识别 + 机械臂抓取，树莓派部署优化。",
              en: "YOLOv5 block detect + arm grasp; Raspberry Pi deploy/tune.",
            },
          ],
        },
      ],
    },
    {
      id: "awards",
      heading: { zh: "荣誉", en: "Honors" },
      counter: { zh: "奖学金", en: "Awards" },
      cards: [
        {
          bullets: [
            {
              zh: "浙江省政府奖学金",
              en: "Zhejiang Provincial Government Scholarship",
            },
            {
              zh: "宁波理工学院学业二等奖学金",
              en: "NIT Academic Second-Class Scholarship",
            },
            {
              zh: "宁波理工学院创新专项奖学金",
              en: "NIT Innovation Special Scholarship",
            },
          ],
        },
      ],
    },
  ],
};
