// ─── 技术服务页数据 ───────────────────────────────────────────────
// 2026-09-03 桂鱼定：天目湖校区线上/线下同价；将军路/明故宫仅线上；
// 重装系统等实体操作仅线下；价格从廉（学生价）；不做数据恢复。

export interface ServiceItem {
  name: string;
  desc: string;
  price: string;
  /** 需要实体接触电脑 → 仅限天目湖线下 */
  offlineOnly?: boolean;
}

export interface ServiceCategory {
  id: string;
  emoji: string;
  title: string;
  tagline: string;
  /** 症状对号入座（仅电脑救援类用） */
  chips?: string[];
  items: ServiceItem[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "ai",
    emoji: "🤖",
    title: "AI & Agent",
    tagline: "传统电脑店不会的，交给我——把 AI 装好、配好、用起来。",
    items: [
      { name: "Agent 安装", desc: "你的第一个 AI Agent，从零装好、跑通、能对话（OpenClaw 等）", price: "¥29 起" },
      { name: "Agent 配置调优", desc: "接模型 / API、Skills、权限…调到顺手为止", price: "¥29 起" },
      { name: "Agent 定制工作流", desc: "按需配自动化：邮件处理、GitHub、文件整理…", price: "¥59 起" },
      { name: "本地 AI 部署", desc: "Ollama / 本地大模型 / GPU 推理环境", price: "¥39 起" },
      { name: "AI 环境诊断", desc: "“我的 Agent 跑不起来”——查日志、找原因、修好", price: "¥20 起" },
    ],
  },
  {
    id: "rescue",
    emoji: "💻",
    title: "电脑救援",
    tagline: "电脑出问题了？先对号入座，或者直接把现象说给我。",
    chips: [
      "电脑很卡",
      "蓝屏",
      "软件打不开",
      "系统报错",
      "驱动问题",
      "连不上网",
      "外设没反应",
      "软件装不上",
      "C 盘满了",
      "系统异常",
    ],
    items: [
      { name: "不知道哪坏了？", desc: "把现象直接说给我，先免费判断属于哪类问题、怎么处理", price: "免费" },
      { name: "几句话能解决的", desc: "在线指导，不收费", price: "免费" },
      { name: "需要动手排查修复", desc: "明确问题后先报价，你同意才动手", price: "¥20 起" },
    ],
  },
  {
    id: "perf",
    emoji: "🚀",
    title: "性能优化",
    tagline: "老电脑也能焕然一新。",
    items: [
      { name: "基础优化", desc: "垃圾清理 / 启动项 / 后台进程 / 磁盘状态 / 系统设置", price: "¥20" },
      { name: "深度优化", desc: "CPU · GPU · 内存 · 磁盘全面分析，定位“为什么这么慢”并解决", price: "¥49" },
    ],
  },
  {
    id: "win",
    emoji: "🪟",
    title: "Windows 与系统",
    tagline: "从“装个系统”到“开机即用”。",
    items: [
      { name: "系统重装", desc: "Windows 全新安装、驱动配齐", price: "¥49", offlineOnly: true },
      { name: "新机 / 重装全家桶", desc: "系统 → 驱动 → 常用软件 → 开发环境 → AI 工具 → 备份，一次配好", price: "¥59 起" },
      { name: "系统迁移与备份", desc: "换机迁移、重要数据备份方案", price: "¥39 起" },
      { name: "驱动与授权排查", desc: "驱动装不上、激活 / 授权报错", price: "¥20 起" },
      { name: "软件安装与故障", desc: "软件装不上、报错、冲突", price: "¥10-20" },
    ],
  },
  {
    id: "env",
    emoji: "🧰",
    title: "开发环境与虚拟机",
    tagline: "上课实验、跑项目、玩 AI 的地基。",
    items: [
      { name: "虚拟机配置", desc: "VMware / VirtualBox / Hyper-V，装 Linux / Windows 虚拟机", price: "¥30 起" },
      { name: "WSL / Docker", desc: "环境容器化，能正常跑项目", price: "¥30 起" },
      { name: "编程环境", desc: "Git / VS Code / Python / 环境变量…", price: "¥30 起" },
      { name: "CUDA / GPU 环境", desc: "深度学习环境搭建", price: "¥59 起" },
    ],
  },
  {
    id: "nas",
    emoji: "🗄️",
    title: "NAS 与家庭服务器",
    tagline: "你自己的家庭服务器，从 0 到能用。",
    items: [
      { name: "NAS 部署与调优", desc: "让家里的服务器真正好用", price: "¥99 起" },
      { name: "Docker 服务部署", desc: "NPM / DDNS / 文件服务 / Minecraft 服务器…", price: "¥99 起" },
      { name: "内网穿透 · 公网访问", desc: "域名 + HTTPS 一步到位，在外面也能访问家里", price: "¥69 起" },
      { name: "远程访问 / 自动备份", desc: "随时随地存取文件、自动备份方案", price: "¥69 起" },
    ],
  },
  {
    id: "web",
    emoji: "🌐",
    title: "网站与部署",
    tagline: "让全世界都能访问你的作品。",
    items: [
      { name: "网站部署上线", desc: "个人站 / 项目页 / 落地页上线", price: "¥69 起" },
      { name: "域名 · HTTPS · 反向代理", desc: "一个能访问的正式网址", price: "¥49 起" },
      { name: "VPS / API 部署", desc: "后端接口、机器人、定时任务", price: "¥69 起" },
    ],
  },
];

// ─── 服务范围（校区规则） ─────────────────────────────────────────
export interface RegionRow {
  t: string;
  ok: "yes" | "no" | "mid";
}

export const regionCards: Array<{
  emoji: string;
  title: string;
  subtitle: string;
  rows: RegionRow[];
}> = [
  {
    emoji: "🏫",
    title: "天目湖校区",
    subtitle: "线下范围 · 线上 + 线下都行",
    rows: [
      { t: "线上远程", ok: "yes" },
      { t: "校内见面 / 宿舍上门", ok: "yes" },
      { t: "价格：线上、线下相同", ok: "yes" },
    ],
  },
  {
    emoji: "🏙️",
    title: "将军路 / 明故宫校区",
    subtitle: "仅支持线上远程",
    rows: [
      { t: "线上远程", ok: "yes" },
      { t: "线下服务", ok: "no" },
      { t: "价格：按线上价", ok: "mid" },
    ],
  },
];

// ─── 服务承诺 ─────────────────────────────────────────────────────
export const promises = [
  { emoji: "🧾", title: "先报价后动手", desc: "任何操作前先确认报价，你同意才开始，绝不中途加价" },
  { emoji: "🔧", title: "配置含 7 天售后", desc: "装好之后一周内有问题，免费回来找我" },
  { emoji: "💾", title: "动手前先备份", desc: "重装、迁移等系统级操作，会先提醒你备份重要数据" },
  { emoji: "🛡️", title: "远程需授权", desc: "远程服务必须你授权后才操作你的电脑，全程可看" },
];
