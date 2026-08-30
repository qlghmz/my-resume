window.RESUME = {
  org: {
    zh: "浙江佳目医疗科技有限公司",
    en: "Zhejiang Jiamu Medical Technology Co., Ltd.",
  },
  sections: [
    {
      id: "work",
      heading: { zh: "工作经历", en: "Work Experience" },
      counter: { zh: "佳目医疗", en: "Jiamu Medical" },
      showOrg: true,
      cards: [
        {
          id: "mcu",
          meta: { zh: "2025.08 – 至今", en: "2025.08 – Present" },
          title: {
            zh: "医用款眼压机 MCU 程序开发 (MCU RTOS)",
            en: "Medical tonometer MCU firmware (MCU RTOS)",
          },
          lead: {
            zh: "完成整个 MCU 系统、外设的开发，协助电机工程师完成电机控制。",
            en: "Owned the full MCU system and peripherals; assisted the motor engineer on motor control.",
          },
          bullets: [
            {
              zh: "<strong>系统：</strong>FreeRTOS，四个线程 UART、Handle、Pump、Motor，线程间通过队列通信。",
              en: "<strong>System:</strong> FreeRTOS with four threads (UART, Handle, Pump, Motor) communicating via queues.",
            },
            {
              zh: "<strong>外设：</strong>IO（风扇、电源使能、Trigger）；UART（上位机与电机驱动板）；ADC（手柄、气体压力）；IIC（气压传感器、按键板）；EXTI（光耦、按键）。",
              en: "<strong>Peripherals:</strong> GPIO (fan, power enable, Trigger); UART (host and motor driver); ADC (handle, gas pressure); I2C (pressure sensor, keypad); EXTI (optocoupler, buttons).",
            },
            {
              zh: "<strong>串口：</strong>协议 Head / Command_type / Seq / uTick / Length / Data / CRC / Tail。分段接收，DMA 发送。",
              en: "<strong>UART:</strong> protocol Head / Command_type / Seq / uTick / Length / Data / CRC / Tail; segmented RX, DMA TX.",
            },
            {
              zh: "<strong>手柄：</strong>DMA 实时检测手柄、按键，发队列给其他 Task。",
              en: "<strong>Handle:</strong> DMA real-time sampling of handle and keys; queue messages to other tasks.",
            },
            {
              zh: "<strong>气路：</strong>打气至指定气缸压力；开阀吹气取值。",
              en: "<strong>Pneumatics:</strong> inflate to target cylinder pressure; open valve and sample blow values.",
            },
            {
              zh: "<strong>电机：</strong>S 曲线加减速。",
              en: "<strong>Motor:</strong> S-curve acceleration / deceleration.",
            },
            {
              zh: "<strong>远程更新：</strong>进入 Bootloader，Ymodem 更新主系统。",
              en: "<strong>OTA:</strong> enter Bootloader and update the main system via Ymodem.",
            },
          ],
        },
        {
          id: "mmitest",
          meta: { zh: "2024.08 – 至今", en: "2024.08 – Present" },
          title: {
            zh: "眼压机 MMITest、LongTest 工厂 / 老化测试工具 (Qt, RK3588)",
            en: "Tonometer MMITest / LongTest factory and burn-in tools (Qt, RK3588)",
          },
          lead: {
            zh: "内容过多，以下为主要功能。",
            en: "Highlights of the main features:",
          },
          bullets: [
            {
              zh: "<strong>系统镜像：</strong>Debian 剪裁、配库，与 U-Boot、Boot 打包成镜像。",
              en: "<strong>System image:</strong> trimmed Debian with libraries, packaged with U-Boot and Boot into a flashable image.",
            },
            {
              zh: "<strong>串口：</strong>QSerial 解析、执行并分发指令；完成与下位机全部功能通信和状态获取，用于出厂校验。",
              en: "<strong>Serial:</strong> QSerial parse / execute / dispatch; full MCU feature I/O and status for factory validation.",
            },
            {
              zh: "<strong>三路相机：</strong>V4L2 调用平面找眼球、结构光深度（红外两点间距）、远距离找眼球。RGA + DMA 取 Buffer 预览保存，不占 CPU。",
              en: "<strong>Three cameras:</strong> V4L2 for planar eye find, structured-light depth (IR spot distance), and long-range eye find. RGA + DMA buffer preview/save with negligible CPU.",
            },
            {
              zh: "<strong>打气自校准：</strong>打气结束瞬间气流导致读数偏高，校准过充量让打气稳定。",
              en: "<strong>Inflate auto-cal:</strong> compensate overshoot from transient airflow at end of inflate so pressure settles correctly.",
            },
            {
              zh: "<strong>吹气自校准：</strong>校准打气、吹气、开阀时间，保证形变一致。",
              en: "<strong>Blow auto-cal:</strong> tune inflate / blow / valve timing for consistent deformation.",
            },
            {
              zh: "<strong>无线升级：</strong>MCU 进 Bootloader 走 Ymodem；MPU 做 A/B 分区远程更新。",
              en: "<strong>Wireless update:</strong> MCU Bootloader + Ymodem; MPU A/B partition remote update.",
            },
            {
              zh: "<strong>老化：</strong>一键测硬件标准并界面化；电机气路老化，按吹气区间报告 Error 次数。",
              en: "<strong>Burn-in:</strong> one-click hardware standards with UI; motor/pneumatic aging with Error counts by blow range.",
            },
          ],
        },
        {
          id: "optics",
          title: {
            zh: "Optics 光学测试工具 (Qt, OpenCV)",
            en: "Optics optical test tool (Qt, OpenCV)",
          },
          bullets: [
            {
              zh: "检测两条横向有斜率白色细直线的中间边缘中心点。",
              en: "Detect the mid-edge center of two thin, slightly sloped horizontal white lines.",
            },
            {
              zh: "<strong>方法一：</strong>形态学膨胀 + 边缘检测，构造横纵直线位置后取中点。",
              en: "<strong>Method 1:</strong> morphological dilate + edge detect; build H/V line positions and take the midpoint.",
            },
            {
              zh: "<strong>方法二：</strong>XY 投影找灰度变化最大处（中心点精度不够，取消）。",
              en: "<strong>Method 2:</strong> XY projection for max gray delta (dropped — center accuracy insufficient).",
            },
          ],
        },
        {
          id: "dicom",
          meta: { zh: "2024.08 – 2024.12", en: "2024.08 – 2024.12" },
          title: {
            zh: "DICOM 医学成像文件制作 (DCMTK, OpenCV)",
            en: "DICOM medical imaging file tooling (DCMTK, OpenCV)",
          },
          bullets: [
            {
              zh: "DCMTK 制作 DICOM DIR 的保存和读取，结构为 DICOM/UserID/TestTime/。",
              en: "DCMTK save/load for DICOM DIR layout DICOM/UserID/TestTime/.",
            },
            {
              zh: "两张图片 DICOM + 一个多帧视频 DICOM。",
              en: "Two still DICOM images plus one multi-frame video DICOM.",
            },
          ],
        },
        {
          id: "ad8555",
          meta: { zh: "2025.04 – 2025.06", en: "2025.04 – 2025.06" },
          title: {
            zh: "AD8555 烧录工装 (MCU)",
            en: "AD8555 programming fixture (MCU)",
          },
          bullets: [
            {
              zh: "IO 模拟脉冲烧写寄存器，配置模式和输出倍率；LED 判断效果。",
              en: "GPIO pulse programming of registers for mode and gain; LED status feedback.",
            },
            {
              zh: "ADC 读 AD8555 与气压传感器。",
              en: "ADC readout of AD8555 and the pressure sensor.",
            },
            {
              zh: "协议：高于 50µs 为高，低于 10µs 为低，位间隔 20µs。",
              en: "Protocol: high > 50µs, low < 10µs, bit gap 20µs.",
            },
          ],
        },
        {
          id: "eye-detect",
          meta: { zh: "2024.09 – 2024.12", en: "2024.09 – 2024.12" },
          title: {
            zh: "眼压机眼球检测 (YOLOv8, OpenCV, PID, NCNN)",
            en: "Tonometer eye detection (YOLOv8, OpenCV, PID, NCNN)",
          },
          bullets: [
            {
              zh: "<strong>红外相机：</strong>暗光拍摄，并打结构光。",
              en: "<strong>IR camera:</strong> low-light capture with structured light.",
            },
            {
              zh: "<strong>训练：</strong>视频拆帧，YOLOv8 训练左眼、右眼、瞳孔、空、光斑，转 NCNN。",
              en: "<strong>Training:</strong> frame videos; YOLOv8 for left/right eye, pupil, empty, spots; export to NCNN.",
            },
            {
              zh: "<strong>部署：</strong>OpenCV Mat → NCNN Mat，归一化、推理、NMS 得框。",
              en: "<strong>Deploy:</strong> OpenCV Mat → NCNN Mat; normalize, infer, NMS boxes.",
            },
            {
              zh: "<strong>空类：</strong>无眼球时画面全黑，与瞳孔易混，用来判断放入/拿开。",
              en: "<strong>Empty class:</strong> all-black frames without an eye (easy to confuse with pupil) for in/out detection.",
            },
            {
              zh: "<strong>结构光：</strong>两个红外光斑间距估计深度；找不到双光斑则沿 Z 轴搜索。",
              en: "<strong>Structured light:</strong> IR spot spacing estimates depth; search along Z if both spots are missing.",
            },
          ],
        },
      ],
    },
    {
      id: "projects",
      heading: { zh: "项目经验", en: "Projects" },
      counter: { zh: "实习", en: "Internship" },
      cards: [
        {
          id: "iop-model",
          meta: {
            zh: "2024.03 – 2024.09 · 实习期间 · 用于计算眼压值",
            en: "2024.03 – 2024.09 · Internship · IOP value estimation",
          },
          title: {
            zh: "眼压计算模型 (ResNet, NCNN)",
            en: "IOP estimation model (ResNet, NCNN)",
          },
          bullets: [
            {
              zh: "把分类模型改成直接输出 float 预测值。",
              en: "Converted a classification model to direct float regression output.",
            },
            {
              zh: "捕获最大形变点做数据集，YOLOv5 训练；输入图像 + 660 个吹气值，NCNN 板端推理。",
              en: "Built a dataset at peak deformation; YOLOv5 training; image + 660 blow values; NCNN on-device inference.",
            },
            {
              zh: "持续优化检测模型的图片权重。",
              en: "Iteratively tuned detection model image weights.",
            },
          ],
        },
        {
          id: "sam2",
          meta: { zh: "2025.06", en: "2025.06" },
          title: {
            zh: "眼角膜检测标注 (SAM2)",
            en: "Cornea annotation (SAM2)",
          },
          bullets: [
            {
              zh: "600 个视频、每个 52 张，多边形标出角膜外形。",
              en: "600 videos × 52 frames; polygon labels for cornea outline.",
            },
            {
              zh: "写 SAM2 推理脚本自动标注，比手动标注缩短一倍以上。",
              en: "SAM2 inference scripts for auto-labeling — more than 2× faster than manual.",
            },
          ],
        },
        {
          id: "membrane",
          meta: {
            zh: "2024.06 – 2024.12 · 实习期间完成",
            en: "2024.06 – 2024.12 · Completed during internship",
          },
          title: {
            zh: "可变眼膜项目 (MCU, LCD)",
            en: "Variable eye membrane (MCU, LCD)",
          },
          bullets: [
            {
              zh: "旋钮改变密封眼膜内气压，模拟不同眼压。",
              en: "Knob adjusts sealed membrane pressure to simulate IOP levels.",
            },
            {
              zh: "LCD 显示缸内气压传感器得到的眼压值。",
              en: "LCD shows IOP derived from the cylinder pressure sensor.",
            },
          ],
        },
        {
          id: "video",
          title: {
            zh: "视频剪辑小程序后端 (Nginx, Flask, FFmpeg)",
            en: "Video editing mini-program backend (Nginx, Flask, FFmpeg)",
          },
          bullets: [
            {
              zh: "视频分割、合成、虚化、高质量重编码；NVENC + FFmpeg 低延迟链路。",
              en: "Split, compose, blur, and high-quality re-encode; NVENC + FFmpeg low-latency path.",
            },
            {
              zh: "MySQL：Project → SceneGroup → Scene。",
              en: "MySQL: Project → SceneGroup → Scene.",
            },
            {
              zh: "FastAPI 背景任务 + 状态机，支持断点恢复。",
              en: "FastAPI background tasks + state machine with checkpoint resume.",
            },
            {
              zh: "重构 PTS/DTS、强制 I 帧切片，解决拼接音画不同步和画面冻结。",
              en: "Reworked PTS/DTS and forced I-frame slices to fix A/V sync and freezes on join.",
            },
            {
              zh: "DeepSeek 生成口播，TTS 转语音。",
              en: "DeepSeek script generation with TTS voiceover.",
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
            zh: "浙大宁波理工学院",
            en: "Zhejiang University Ningbo Institute of Technology",
          },
          meta: {
            zh: "计算机科学与技术 · 2020.09 – 2024.06",
            en: "Computer Science and Technology · 2020.09 – 2024.06",
          },
          bullets: [
            {
              zh: "<strong>编程：</strong>C、C++、Python、Shell。",
              en: "<strong>Programming:</strong> C, C++, Python, Shell.",
            },
            {
              zh: "<strong>系统：</strong>嵌入式 Linux 移植与驱动；交叉编译、多线程、消息队列、信号量、Qt。",
              en: "<strong>Systems:</strong> embedded Linux porting and drivers; cross-compile, threads, message queues, semaphores, Qt.",
            },
            {
              zh: "<strong>构建：</strong>Ubuntu、Debian、Buildroot 剪裁，menuconfig。",
              en: "<strong>Build:</strong> Ubuntu, Debian, Buildroot trim, menuconfig.",
            },
            {
              zh: "<strong>深度学习：</strong>PyTorch / TensorFlow，YOLO；NCNN、ONNXRuntime、RKNN、Paddle 部署。",
              en: "<strong>DL:</strong> PyTorch / TensorFlow, YOLO; deploy with NCNN, ONNX Runtime, RKNN, Paddle.",
            },
            {
              zh: "<strong>芯片：</strong>STM32、Arduino（UART / IIC / ADC）；RK 系列、树莓派、Jetson Nano，熟悉 RGA。",
              en: "<strong>Chips:</strong> STM32, Arduino (UART / I2C / ADC); Rockchip series, Raspberry Pi, Jetson Nano; familiar with RGA.",
            },
            {
              zh: "<strong>硬件：</strong>会看原理图，会用示波器。",
              en: "<strong>Hardware:</strong> schematic reading and oscilloscope use.",
            },
          ],
        },
      ],
    },
    {
      id: "campus",
      heading: { zh: "校园经历", en: "Campus Experience" },
      counter: { zh: "竞赛", en: "Contests" },
      cards: [
        {
          id: "mqtt",
          meta: { zh: "2022.06 – 2023.06", en: "2022.06 – 2023.06" },
          title: {
            zh: "Mosquitto 广域物联网网关 (MQTT, Linux 驱动)",
            en: "Mosquitto wide-area IoT gateway (MQTT, Linux drivers)",
          },
          bullets: [
            {
              zh: "基于 ARM 板、IO 设备和手机的广域物联网模型，C++ 应用。",
              en: "Wide-area IoT model on ARM board, IO devices, and phone; C++ app.",
            },
            {
              zh: "MQTT Client–Server，控制继电器、步进电机。",
              en: "MQTT client–server controlling relays and stepper motors.",
            },
            {
              zh: "Qt 界面与 IO 驱动；U-Boot 与系统烧录部署。",
              en: "Qt UI and IO drivers; U-Boot and system flashing for deploy.",
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
              zh: "自动寻路、检测并抓取物块放入箱子。",
              en: "Autonomous pathing; detect and pick blocks into a bin.",
            },
            {
              zh: "树莓派计算与指令；STM32 控制电机、舵机。",
              en: "Raspberry Pi for compute/commands; STM32 for motors and servos.",
            },
            {
              zh: "训练优化 YOLOv8，Paddle 部署到嵌入式设备。",
              en: "Trained/tuned YOLOv8; Paddle deploy on embedded device.",
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
            zh: "浙江省工程训练竞赛",
            en: "Zhejiang Engineering Training Contest",
          },
          bullets: [
            {
              zh: "YOLOv5 识别物块，机械臂抓取，C++ 应用。",
              en: "YOLOv5 block detection with robotic arm grasp; C++ app.",
            },
            {
              zh: "模型部署到树莓派并做性能优化。",
              en: "Deployed the model to Raspberry Pi with performance tuning.",
            },
          ],
        },
      ],
    },
    {
      id: "awards",
      heading: { zh: "奖学金", en: "Scholarships" },
      counter: { zh: "荣誉", en: "HONORS" },
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
