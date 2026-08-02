"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePalette, CodeToggle, MiniBtn, Tag, Arrow, Box } from "./demo-shared";

// ═══ DevOps ═══
export function DeployDemo() {
  const p = usePalette();
  const [step, setStep] = useState(0);
  const steps = ["git push", "CI 构建", "测试", "部署", "上线 ✓"];
  return (<CodeToggle code={`# 部署流程\n# 代码 → 构建 → 测试 → 发布\n# 自动化: CI/CD pipeline\n# 平台: Vercel, Railway, Docker`}>
    <button onClick={() => setStep(s => s < steps.length - 1 ? s + 1 : 0)} className="mb-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>下一步</button>
    <div className="flex items-center gap-0.5 flex-wrap">{steps.map((s, i) => <span key={i} className="flex items-center"><span className="px-1.5 py-1 rounded-[4px] text-[8px]" style={{ backgroundColor: i <= step ? p.accent : p.surface, color: i <= step ? "#fff" : p.textFaint }}>{s}</span>{i < steps.length - 1 && <Arrow p={p}/>}</span>)}</div>
  </CodeToggle>);
}

export function DockerDemo2() { const p = usePalette(); return (<CodeToggle code={`# Docker 容器化\n# 把应用+依赖打包成容器\n#  anywhere 运行，环境一致\n# docker build → docker run\n# 类比: 集装箱运输`}>
    <div className="flex items-center gap-1 text-[9px] justify-center"><Box p={p}>📦 代码+依赖</Box><Arrow p={p}/><Box highlight p={p}>🐳 容器</Box><Arrow p={p}/><span style={{ color: p.textFaint }}>任何机器运行</span></div>
  </CodeToggle>);
}

export function CicdDemo() {
  const p = usePalette();
  const stages = ["Push", "Build", "Test", "Deploy"];
  const [active, setActive] = useState(-1);
  return (<CodeToggle code={`# CI/CD 持续集成/持续部署\n# CI: 每次 push 自动构建+测试\n# CD: 测试通过自动部署\n# 工具: GitHub Actions, GitLab CI\n# 好处: 减少人工失误，快速反馈`}>
    <button onClick={() => { setActive(0); stages.forEach((_, i) => setTimeout(() => setActive(i), i * 400)); }} className="mb-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>触发 Pipeline</button>
    <div className="flex items-center gap-0.5">{stages.map((s, i) => <span key={i} className="flex items-center"><span className="px-1.5 py-1 rounded-[4px] text-[8px]" style={{ backgroundColor: i <= active ? (i === active ? "#d4a03c" : "#5f8a6b") : p.surface, color: i <= active ? "#fff" : p.textFaint }}>{s}</span>{i < stages.length - 1 && <Arrow p={p}/>}</span>)}</div>
  </CodeToggle>);
}

export function DomainDemo2() { const p = usePalette(); return (<CodeToggle code={`# 域名 = 网站的地址\n# liguiyu.com → IP 地址\n# DNS 负责翻译\n# 购买: Namecheap, Cloudflare\n# 层级: .com > example.com > blog.example.com`}>
    <div className="flex items-center gap-1 text-[9px] justify-center"><Box p={p}>liguiyu.com</Box><Arrow p={p}/><span style={{ color: p.accent }}>DNS</span><Arrow p={p}/><Box highlight p={p}>123.45.67.89</Box></div>
  </CodeToggle>);
}

export function SslDemo() { const p = usePalette(); const [secure, setSecure] = useState(true); return (<CodeToggle code={`# HTTPS / SSL 证书\n# 加密浏览器和服务器之间的通信\n# 没有 SSL = 数据明文传输 (危险)\n# 免费证书: Let's Encrypt\n# 浏览器显示 🔒 表示安全`}>
    <div className="flex gap-1 mb-2"><MiniBtn active={secure} onClick={() => setSecure(true)} p={p}>🔒 HTTPS</MiniBtn><MiniBtn active={!secure} onClick={() => setSecure(false)} p={p}>⚠️ HTTP</MiniBtn></div>
    <div className="rounded-[6px] border px-2 py-1.5 text-[9px] font-mono flex items-center gap-1" style={{ borderColor: secure ? "#5f8a6b40" : "#b85c4a40", color: secure ? "#5f8a6b" : "#b85c4a" }}>{secure ? "🔒" : "⚠️"} {secure ? "https://" : "http://"}liguiyu.com</div>
  </CodeToggle>);
}

export function EnvDemo() { const p = usePalette(); return (<CodeToggle code={`# 环境变量\n# 不写在代码里的配置\n# .env 文件存放\n# 不同环境不同值\n# NEXT_PUBLIC_ 前缀 = 前端可用`}>
    <div className="rounded-[6px] border p-2 font-mono text-[8px] space-y-0.5" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}><div>DATABASE_URL=<span style={{ color: p.accent }}>***</span></div><div>API_SECRET=<span style={{ color: p.accent }}>***</span></div><div>NEXT_PUBLIC_SITE_URL=<span style={{ color: p.textMuted }}>liguiyu.com</span></div></div>
  </CodeToggle>);
}

export function LogDemo() { const p = usePalette(); const logs = ["[INFO] Server started", "[WARN] High memory", "[ERROR] DB timeout"]; return (<CodeToggle code={`# 日志 Logging\n# 记录系统运行状态\n# 级别: DEBUG < INFO < WARN < ERROR\n# 工具: Winston, Pino, PM2 logs\n# 生产环境必备！`}>
    <div className="space-y-0.5 font-mono text-[8px]">{logs.map((l, i) => <div key={i} style={{ color: l.includes("ERROR") ? "#b85c4a" : l.includes("WARN") ? "#d4a03c" : "#5f8a6b" }}>{l}</div>)}</div>
  </CodeToggle>);
}

export function MonitoringDemo() { const p = usePalette(); const [cpu, setCpu] = useState(45); return (<CodeToggle code={`# 监控 Monitoring\n# 实时观察系统健康\n# 指标: CPU、内存、请求量、错误率\n# 工具: Prometheus, Grafana, Sentry\n# 告警: 异常时通知你`}>
    <div className="space-y-1.5"><div className="flex justify-between text-[8px]"><span style={{ color: p.textMuted }}>CPU</span><span style={{ color: cpu > 80 ? "#b85c4a" : p.accent }}>{cpu}%</span></div><div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: p.surface }}><div className="h-full rounded-full transition-all" style={{ width: `${cpu}%`, backgroundColor: cpu > 80 ? "#b85c4a" : cpu > 60 ? "#d4a03c" : "#5f8a6b" }} /></div><div className="flex gap-1">{[30, 45, 60, 80, 95].map(v => <MiniBtn key={v} onClick={() => setCpu(v)} p={p}>{v}%</MiniBtn>)}</div></div>
  </CodeToggle>);
}

export function BackupDemo() { const p = usePalette(); const [backups, setBackups] = useState(["2024-01-01", "2024-01-07"]); return (<CodeToggle code={`# 备份 Backup\n# 定期复制数据防止丢失\n# 策略: 3-2-1 (3份, 2种介质, 1份异地)\n# 自动: cron + 脚本\n# 验证: 定期恢复测试`}>
    <button onClick={() => setBackups(b => [...b, new Date().toISOString().slice(0, 10)])} className="mb-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>创建备份</button>
    <div className="space-y-0.5">{backups.map((b, i) => <div key={i} className="text-[9px] flex items-center gap-1" style={{ color: p.textMuted }}>💾 {b}</div>)}</div>
  </CodeToggle>);
}

export function TunnelDemo() { const p = usePalette(); return (<CodeToggle code={`# 内网穿透 Tunnel\n# 让外网访问你本地的服务\n# 工具: ngrok, cloudflared, frp\n# 用途: 开发调试 webhook、演示\n# 原理: 本地 → 中转服务器 → 公网`}>
    <div className="flex items-center gap-1 text-[8px] justify-center"><Box p={p}>💻 localhost:3000</Box><Arrow p={p}/><Box highlight p={p}>🌐 ngrok.io</Box><Arrow p={p}/><span style={{ color: p.textFaint }}>公网可访问</span></div>
  </CodeToggle>);
}

export function PortDemo() { const p = usePalette(); const ports = [{ n: 80, s: "HTTP" }, { n: 443, s: "HTTPS" }, { n: 3000, s: "Dev" }, { n: 5432, s: "PG" }]; return (<CodeToggle code={`# 端口 Port\n# 一台机器上的「门」\n# 不同服务用不同端口\n# 80=HTTP, 443=HTTPS, 3000=开发\n# 冲突: 端口被占用 → 换一个`}>
    <div className="grid grid-cols-2 gap-1">{ports.map(pt => <div key={pt.n} className="rounded-[4px] border px-1.5 py-1 text-[8px] flex justify-between" style={{ borderColor: p.border, color: p.textMuted }}><span>: {pt.n}</span><span style={{ color: p.textFaint }}>{pt.s}</span></div>)}</div>
  </CodeToggle>);
}

export function NasDemo() { const p = usePalette(); return (<CodeToggle code={`# NAS 网络附加存储\n# 家里的「私有云」\n# 存文件、备份、跑服务\n# 品牌: 群晖、威联通\n# 协议: SMB, NFS, WebDAV`}>
    <div className="flex items-center gap-2 justify-center text-[9px]"><Box p={p}>💻 电脑</Box><Arrow p={p}/><Box highlight p={p}>🗄️ NAS</Box><Arrow p={p}/><Box p={p}>📱 手机</Box></div>
  </CodeToggle>);
}

export function CloudServerDemo() { const p = usePalette(); return (<CodeToggle code={`# 云服务器 VPS\n# 租一台远程计算机\n# 24/7 运行你的服务\n# 厂商: AWS, 阿里云, 腾讯云\n# 配置: CPU + 内存 + 硬盘 + 带宽`}>
    <div className="rounded-[6px] border p-2 space-y-1 text-[9px]" style={{ borderColor: p.border, backgroundColor: p.surface }}><div className="flex justify-between"><span style={{ color: p.textMuted }}>CPU</span><span style={{ color: p.accent }}>2 核</span></div><div className="flex justify-between"><span style={{ color: p.textMuted }}>内存</span><span style={{ color: p.accent }}>4 GB</span></div><div className="flex justify-between"><span style={{ color: p.textMuted }}>硬盘</span><span style={{ color: p.accent }}>50 GB SSD</span></div></div>
  </CodeToggle>);
}

export function BandwidthDemo() { const p = usePalette(); const [bw, setBw] = useState(5); return (<CodeToggle code={`# 带宽 Bandwidth\n# 网络通道的「宽度」\n# 单位: Mbps (兆比特/秒)\n# 5M ≈ 下载 640KB/s\n# 带宽不够 = 网站加载慢`}>
    <input type="range" min={1} max={100} value={bw} onChange={e => setBw(+e.target.value)} className="w-full mb-1" />
    <div className="text-[9px] text-center" style={{ color: p.accent }}>{bw} Mbps ≈ {(bw * 128).toFixed(0)} KB/s</div>
  </CodeToggle>);
}

export function LatencyDemo() { const p = usePalette(); const [ms, setMs] = useState(20); return (<CodeToggle code={`# 延迟 Latency\n# 数据从 A 到 B 的时间\n# < 50ms: 极好\n# 50-100ms: 良好\n# > 200ms: 明显卡顿\n# 降低: CDN、就近部署`}>
    <div className="flex gap-1 mb-2">{[10, 50, 150, 300].map(v => <MiniBtn key={v} active={ms === v} onClick={() => setMs(v)} p={p}>{v}ms</MiniBtn>)}</div>
    <div className="text-[9px] text-center" style={{ color: ms < 50 ? "#5f8a6b" : ms < 100 ? "#d4a03c" : "#b85c4a" }}>{ms < 50 ? "✓ 极好" : ms < 100 ? "⚡ 良好" : ms < 200 ? "⚠️ 一般" : "✗ 卡顿"}</div>
  </CodeToggle>);
}

export function RollbackDemo() { const p = usePalette(); const [ver, setVer] = useState(3); return (<CodeToggle code={`# 回滚 Rollback\n# 新版本有问题 → 退回旧版本\n# 部署系统应支持一键回滚\n# Git: git revert / git reset\n# 数据库: 迁移回退`}>
    <div className="flex gap-1">{[1, 2, 3].map(v => <button key={v} onClick={() => setVer(v)} className="px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: ver === v ? p.accent : p.border, backgroundColor: ver === v ? p.accentBg : v > ver ? p.surface : "transparent", color: ver === v ? p.accent : v > ver ? p.textFaint : p.textMuted, textDecoration: v > ver ? "line-through" : "none" }}>v{v}</button>)}</div>
    <div className="mt-1 text-[8px]" style={{ color: p.textFaint }}>当前运行: v{ver}</div>
  </CodeToggle>);
}

export function UptimeDemo() { const p = usePalette(); const days = Array.from({ length: 30 }, (_, i) => i !== 15 && i !== 22); return (<CodeToggle code={`# 可用性 Uptime\n# 服务正常运行的时间比例\n# 99.9% = 年停机 8.7 小时\n# 99.99% = 年停机 52 分钟\n# 监控: UptimeRobot, Pingdom`}>
    <div className="flex gap-0.5 flex-wrap">{days.map((up, i) => <div key={i} className="w-2 h-4 rounded-[1px]" style={{ backgroundColor: up ? "#5f8a6b" : "#b85c4a" }} title={`Day ${i + 1}: ${up ? "UP" : "DOWN"}`} />)}</div>
    <div className="mt-1 text-[8px]" style={{ color: p.textFaint }}>30天: 28 UP / 2 DOWN = 93.3%</div>
  </CodeToggle>);
}

export function NginxDemo() { const p = usePalette(); return (<CodeToggle code={`# Nginx 高性能 Web 服务器\n# 用途: 反向代理、负载均衡、静态文件\n# 配置: nginx.conf\n# 特点: 事件驱动、低内存、高并发\n# 对比 Apache: 更快更省资源`}>
    <div className="rounded-[6px] border p-2 font-mono text-[8px] space-y-0.5" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}><div style={{ color: p.accent }}>server {"{"}</div><div className="pl-2">listen 80;</div><div className="pl-2">server_name example.com;</div><div className="pl-2">location / {"{ proxy_pass http://app:3000; }"}</div><div style={{ color: p.accent }}>{"}"}</div></div>
  </CodeToggle>);
}

export function SshDemo() { const p = usePalette(); return (<CodeToggle code={`# SSH 安全远程连接\n# ssh user@server\n# 加密的终端连接\n# 密钥认证比密码更安全\n# 用途: 管理服务器、传文件(scp)`}>
    <div className="rounded-[6px] border p-2 font-mono text-[9px]" style={{ borderColor: p.border, backgroundColor: "#0d0d0b", color: "#5f8a6b" }}><div>$ ssh root@123.45.67.89</div><div style={{ color: p.textFaint }}>Welcome to Ubuntu 22.04</div><div>$ _</div></div>
  </CodeToggle>);
}

export function Pm2Demo() { const p = usePalette(); const procs = [{ name: "web", status: "online", cpu: "2%" }, { name: "worker", status: "online", cpu: "15%" }]; return (<CodeToggle code={`# PM2 Node.js 进程管理\n# 自动重启崩溃的进程\n# 负载均衡 (cluster mode)\n# 日志管理\n# pm2 start / stop / restart / logs`}>
    <div className="space-y-1">{procs.map((pr, i) => <div key={i} className="flex items-center justify-between px-2 py-1 rounded-[4px] border text-[9px]" style={{ borderColor: p.border }}><span style={{ color: p.text }}>{pr.name}</span><span style={{ color: "#5f8a6b" }}>● {pr.status}</span><span style={{ color: p.textFaint }}>CPU {pr.cpu}</span></div>)}</div>
  </CodeToggle>);
}

export function HealthCheckDemo() { const p = usePalette(); const [healthy, setHealthy] = useState(true); return (<CodeToggle code={`# 健康检查 Health Check\n# 定期检测服务是否正常\n# GET /health → 200 = 正常\n# 失败 → 自动重启/摘除\n# Docker/K8s 内置支持`}>
    <div className="flex gap-1 mb-2"><MiniBtn active={healthy} onClick={() => setHealthy(true)} p={p}>✓ 200 OK</MiniBtn><MiniBtn active={!healthy} onClick={() => setHealthy(false)} p={p}>✗ 503</MiniBtn></div>
    <div className="text-[9px] text-center" style={{ color: healthy ? "#5f8a6b" : "#b85c4a" }}>{healthy ? "💚 服务健康" : "💔 服务异常 → 触发重启"}</div>
  </CodeToggle>);
}

export function BlueGreenDemo() { const p = usePalette(); const [active, setActive] = useState<"blue" | "green">("blue"); return (<CodeToggle code={`# 蓝绿部署\n# 两套环境: 蓝(当前) + 绿(新版)\n# 新版测试OK → 切换流量到绿\n# 出问题 → 切回蓝 (秒级回滚)\n# 零停机部署`}>
    <div className="flex gap-2 justify-center">{(["blue", "green"] as const).map(c => <div key={c} onClick={() => setActive(c)} className="w-12 h-10 rounded-[6px] border flex items-center justify-center text-[9px] cursor-pointer transition-all" style={{ borderColor: active === c ? (c === "blue" ? "#4a7fb5" : "#5f8a6b") : p.border, backgroundColor: active === c ? (c === "blue" ? "#4a7fb520" : "#5f8a6b20") : p.surface, color: active === c ? (c === "blue" ? "#4a7fb5" : "#5f8a6b") : p.textFaint }}>{c === "blue" ? "🔵" : "🟢"} {active === c ? "100%" : "0%"}</div>)}</div>
  </CodeToggle>);
}

export function CanaryDemo() { const p = usePalette(); const [pct, setPct] = useState(10); return (<CodeToggle code={`# 金丝雀发布\n# 新版本先给小部分用户\n# 观察指标正常 → 逐步扩大\n# 10% → 50% → 100%\n# 比蓝绿更细粒度`}>
    <input type="range" min={0} max={100} step={10} value={pct} onChange={e => setPct(+e.target.value)} className="w-full mb-1" />
    <div className="flex h-4 rounded-[4px] overflow-hidden"><div style={{ width: `${pct}%`, backgroundColor: p.accent }} /><div style={{ width: `${100 - pct}%`, backgroundColor: p.surface }} /></div>
    <div className="flex justify-between text-[8px] mt-0.5"><span style={{ color: p.accent }}>新版 {pct}%</span><span style={{ color: p.textFaint }}>旧版 {100 - pct}%</span></div>
  </CodeToggle>);
}

export function SystemdDemo() { const p = usePalette(); return (<CodeToggle code={`# systemd Linux 服务管理\n# 开机自启、崩溃重启\n# systemctl start/stop/enable\n# 配置文件: /etc/systemd/system/\n# 现代 Linux 的标准 init 系统`}>
    <div className="rounded-[6px] border p-2 font-mono text-[8px] space-y-0.5" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}><div style={{ color: p.accent }}>[Service]</div><div>ExecStart=/usr/bin/node app.js</div><div>Restart=always</div><div style={{ color: p.accent }}>[Install]</div><div>WantedBy=multi-user.target</div></div>
  </CodeToggle>);
}

export function CiCdDemo() { const p = usePalette(); return (<CodeToggle code={`# CI/CD Pipeline\n# .github/workflows/deploy.yml\n# on: push to main\n# jobs: build → test → deploy\n# 自动化一切重复操作`}>
    <div className="flex items-center gap-0.5 text-[8px] justify-center">{["push", "build", "test", "deploy"].map((s, i) => <span key={i} className="flex items-center"><span className="px-1.5 py-1 rounded-[3px]" style={{ backgroundColor: p.accentBg, color: p.accent }}>{s}</span>{i < 3 && <Arrow p={p}/>}</span>)}</div>
  </CodeToggle>);
}

export function IacDemo() { const p = usePalette(); return (<CodeToggle code={`# 基础设施即代码 IaC\n# 用代码定义服务器/网络/数据库\n# 工具: Terraform, Pulumi, CDK\n# 优势: 版本控制、可重复、可审查\n# 不再手动点击控制台！`}>
    <div className="rounded-[6px] border p-2 font-mono text-[8px] space-y-0.5" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}><div style={{ color: p.accent }}>resource "aws_instance" "web" {"{"}</div><div className="pl-2">ami = "ubuntu-22.04"</div><div className="pl-2">instance_type = "t3.micro"</div><div style={{ color: p.accent }}>{"}"}</div></div>
  </CodeToggle>);
}

// ═══ Domain ══
export function DomainNameDemo() { const p = usePalette(); return (<CodeToggle code={`# 域名结构\n# subdomain.domain.tld\n# blog.liguiyu.com\n# www = 子域名 (非必须)\n# 选择: 短、好记、.com 优先`}>
    <div className="flex items-center gap-0.5 text-[9px] justify-center font-mono"><span style={{ color: p.textFaint }}>blog</span><span style={{ color: p.textFaint }}>.</span><span style={{ color: p.accent }}>liguiyu</span><span style={{ color: p.textFaint }}>.</span><span style={{ color: "#5f8a6b" }}>com</span></div>
    <div className="flex justify-center gap-3 mt-1 text-[7px]" style={{ color: p.textFaint }}><span>子域名</span><span>二级域名</span><span>顶级域名</span></div>
  </CodeToggle>);
}

export function DnsDemo() { const p = usePalette(); return (<CodeToggle code={`# DNS 域名系统\n# 域名 → IP 地址的翻译器\n# 层级: Root → TLD → Authoritative\n# 缓存: 各级 DNS 缓存结果\n# TTL: 缓存过期时间`}>
    <div className="flex items-center gap-1 text-[8px] justify-center"><Box p={p}>浏览器</Box><Arrow p={p}/><Box p={p}>本地DNS</Box><Arrow p={p}/><Box highlight p={p}>权威DNS</Box><Arrow p={p}/><span style={{ color: p.accent }}>IP</span></div>
  </CodeToggle>);
}

export function TldDemo() { const p = usePalette(); const tlds = [{ t: ".com", p: "¥55/年" }, { t: ".cn", p: "¥29/年" }, { t: ".dev", p: "¥80/年" }, { t: ".org", p: "¥60/年" }]; return (<CodeToggle code={`# 顶级域名 TLD\n# .com 最通用\n# .cn 中国\n# .dev 开发者\n# .org 组织\n# 新 TLD: .app, .ai, .io`}>
    <div className="grid grid-cols-2 gap-1">{tlds.map(t => <div key={t.t} className="rounded-[4px] border px-2 py-1 text-[9px] flex justify-between" style={{ borderColor: p.border, color: p.textMuted }}><span style={{ color: p.accent }}>{t.t}</span><span style={{ color: p.textFaint }}>{t.p}</span></div>)}</div>
  </CodeToggle>);
}

export function SubdomainDemo() { const p = usePalette(); const subs = ["blog", "api", "docs", "app"]; return (<CodeToggle code={`# 子域名 Subdomain\n# 主域名下的独立空间\n# blog.example.com\n# api.example.com\n# 可以指向不同的服务器\n# 免费创建，无需额外购买`}>
    <div className="space-y-0.5">{subs.map(s => <div key={s} className="text-[9px] font-mono" style={{ color: p.textMuted }}><span style={{ color: p.accent }}>{s}</span>.liguiyu.com</div>)}</div>
  </CodeToggle>);
}

export function NameserverDemo() { const p = usePalette(); return (<CodeToggle code={`# 域名服务器 Nameserver\n# 存放你的 DNS 记录的地方\n# 注册域名时设置\n# 例: ns1.cloudflare.com\n# 更换 NS = 更换 DNS 管理商`}>
    <div className="font-mono text-[9px] space-y-0.5 p-2 rounded-[6px] border" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}><div>ns1.cloudflare.com</div><div>ns2.cloudflare.com</div></div>
  </CodeToggle>);
}

export function ARecordDemo() { const p = usePalette(); return (<CodeToggle code={`# A 记录\n# 域名 → IPv4 地址\n# @ → 123.45.67.89\n# 最基础的 DNS 记录\n# 类似: 通讯录里名字→电话号码`}>
    <div className="flex items-center gap-1 text-[9px] justify-center font-mono"><span style={{ color: p.accent }}>@</span><Arrow p={p}/><Tag p={p}>A</Tag><Arrow p={p}/><span style={{ color: p.textMuted }}>123.45.67.89</span></div>
  </CodeToggle>);
}

export function CnameDemo() { const p = usePalette(); return (<CodeToggle code={`# CNAME 记录\n# 域名 → 另一个域名 (别名)\n# www → liguiyu.com\n# blog → cname.vercel-dns.com\n# 不能和 A 记录共存于同名`}>
    <div className="flex items-center gap-1 text-[9px] justify-center font-mono"><span style={{ color: p.accent }}>www</span><Arrow p={p}/><Tag p={p}>CNAME</Tag><Arrow p={p}/><span style={{ color: p.textMuted }}>liguiyu.com</span></div>
  </CodeToggle>);
}

export function HttpsDemo() { const p = usePalette(); return (<CodeToggle code={`# HTTPS = HTTP + TLS 加密\n# 保护数据不被窃听/篡改\n# 证书: 证明「你确实是你」\n# 免费: Let's Encrypt / Cloudflare\n# SEO 加分、浏览器信任`}>
    <div className="flex items-center gap-1 text-[9px] justify-center"><span style={{ color: p.textFaint }}>HTTP</span><span style={{ color: p.accent }}>+🔒TLS</span><span>=</span><span style={{ color: "#5f8a6b" }}>HTTPS</span></div>
  </CodeToggle>);
}

export function WhoisDemo() { const p = usePalette(); return (<CodeToggle code={`# WHOIS 域名信息查询\n# 查: 注册人、注册商、到期日\n# whois liguiyu.com\n# 隐私保护: 隐藏个人信息\n# GDPR 后很多信息已隐藏`}>
    <div className="rounded-[6px] border p-2 text-[9px] space-y-0.5 font-mono" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}><div>Domain: liguiyu.com</div><div>Registrar: Cloudflare</div><div>Expires: 2025-12-01</div><div>Status: clientTransferProhibited</div></div>
  </CodeToggle>);
}

export function RegistrarDemo() { const p = usePalette(); const regs = ["Cloudflare", "Namecheap", "阿里云"]; return (<CodeToggle code={`# 域名注册商 Registrar\n# 卖域名的公司\n# 选择: 价格、续费、管理界面\n# Cloudflare: 成本价续费\n# 注意: 转入/转出政策`}>
    <div className="space-y-1">{regs.map((r, i) => <div key={i} className="flex items-center justify-between px-2 py-1 rounded-[4px] border text-[9px]" style={{ borderColor: p.border }}><span style={{ color: p.text }}>{r}</span><span style={{ color: p.textFaint }}>.com ¥{[55, 60, 55][i]}/年</span></div>)}</div>
  </CodeToggle>);
}

export function PropagationDemo() { const p = usePalette(); const [progress, setProgress] = useState(0); return (<CodeToggle code={`# DNS 生效 Propagation\n# 修改 DNS 后全球生效需要时间\n# 通常: 几分钟 ~ 48小时\n# 原因: 各级 DNS 缓存 (TTL)\n# 查看: dnschecker.org`}>
    <button onClick={() => { setProgress(0); const t = setInterval(() => setProgress(p => p >= 100 ? (clearInterval(t), 100) : p + 10), 200); }} className="mb-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>修改 DNS</button>
    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: p.surface }}><div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: progress === 100 ? "#5f8a6b" : p.accent }} /></div>
    <div className="mt-1 text-[8px] text-center" style={{ color: p.textFaint }}>{progress === 100 ? "✓ 全球生效" : `生效中 ${progress}%`}</div>
  </CodeToggle>);
}

export function IpAddressDemo() { const p = usePalette(); return (<CodeToggle code={`# IP 地址\n# 设备在网络中的唯一标识\n# IPv4: 192.168.1.1 (4组数字)\n# IPv6: 2001:db8::1 (更长)\n# 公网 IP vs 内网 IP`}>
    <div className="flex gap-2 justify-center text-[9px] font-mono"><div className="px-2 py-1 rounded-[4px] border" style={{ borderColor: p.border, color: p.accent }}>123.45.67.89<br /><span className="text-[7px]" style={{ color: p.textFaint }}>公网</span></div><div className="px-2 py-1 rounded-[4px] border" style={{ borderColor: p.border, color: p.textMuted }}>192.168.1.5<br /><span className="text-[7px]" style={{ color: p.textFaint }}>内网</span></div></div>
  </CodeToggle>);
}

// ═══ Docker ═══
export function DockerIntroDemo() { const p = usePalette(); return (<CodeToggle code={`# Docker 入门\n# 容器 = 轻量级虚拟机\n# 镜像 = 容器的模板\n# 解决: 「在我电脑上能跑啊」\n# 一次构建，到处运行`}>
    <div className="flex items-center gap-1 text-[9px] justify-center"><span style={{ color: p.textFaint }}>🐳</span><Box highlight p={p}>Container</Box><span style={{ color: p.textFaint }}>inside</span><Box p={p}>Image</Box></div>
  </CodeToggle>);
}

export function ImageDemo() { const p = usePalette(); return (<CodeToggle code={`# Docker 镜像 Image\n# 只读模板，包含运行环境\n# 分层存储 (共享基础层)\n# 来源: Dockerfile 构建 / Hub 拉取\n# docker pull nginx:latest`}>
    <div className="space-y-0.5">{["node:20-alpine", "你的代码", "依赖包", "配置"].map((l, i) => <div key={i} className="px-2 py-1 text-[8px] border rounded-[3px]" style={{ borderColor: p.border, backgroundColor: i === 0 ? p.accentBg : p.surface, color: i === 0 ? p.accent : p.textMuted, marginLeft: `${i * 4}px` }}>Layer {i}: {l}</div>)}</div>
  </CodeToggle>);
}

export function ContainerDemo() { const p = usePalette(); const [running, setRunning] = useState(true); return (<CodeToggle code={`# Docker 容器 Container\n# 镜像的运行实例\n# docker run / stop / rm\n# 隔离: 独立文件系统、网络\n# 轻量: 秒级启动`}>
    <div className="flex gap-1 mb-2"><MiniBtn active={running} onClick={() => setRunning(true)} p={p}>▶ Running</MiniBtn><MiniBtn active={!running} onClick={() => setRunning(false)} p={p}>⏹ Stopped</MiniBtn></div>
    <div className="text-[9px] font-mono" style={{ color: running ? "#5f8a6b" : p.textFaint }}>{running ? "🟢 web-app  Up 2 hours  0.0.0.0:3000→3000" : "⚫ web-app  Exited (0)"}</div>
  </CodeToggle>);
}

export function DockerfileDemo() { const p = usePalette(); return (<CodeToggle code={`# Dockerfile 构建指令\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nRUN npm run build\nEXPOSE 3000\nCMD ["node", "server.js"]`}>
    <div className="rounded-[6px] border p-2 font-mono text-[8px] space-y-0.5" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}><div><span style={{ color: p.accent }}>FROM</span> node:20-alpine</div><div><span style={{ color: p.accent }}>COPY</span> . .</div><div><span style={{ color: p.accent }}>RUN</span> npm install</div><div><span style={{ color: p.accent }}>CMD</span> ["node", "app.js"]</div></div>
  </CodeToggle>);
}

export function DockerComposeDemo() { const p = usePalette(); return (<CodeToggle code={`# docker-compose.yml\n# 多容器编排\nservices:\n  web:\n    build: .\n    ports: ["3000:3000"]\n  db:\n    image: postgres:15\n# docker compose up 一键启动所有`}>
    <div className="flex gap-2 justify-center text-[9px]"><Box highlight p={p}>🌐 web :3000</Box><Box p={p}>🗄️ db :5432</Box><Box p={p}>📦 redis :6379</Box></div>
    <div className="mt-1 text-[8px] text-center" style={{ color: p.textFaint }}>docker compose up → 全部启动</div>
  </CodeToggle>);
}

export function VolumeDemo() { const p = usePalette(); return (<CodeToggle code={`# Docker Volume 数据卷\n# 持久化容器数据\n# 容器删除数据不丢\n# docker volume create mydata\n# -v mydata:/app/data`}>
    <div className="flex items-center gap-1 text-[9px] justify-center"><Box p={p}>🐳 容器</Box><span style={{ color: p.accent }}>↔</span><Box highlight p={p}>💾 Volume (持久)</Box></div>
  </CodeToggle>);
}

export function DockerNetworkDemo() { const p = usePalette(); return (<CodeToggle code={`# Docker 网络\n# 容器间通信\n# 同一 network 内的容器可用名字互访\n# docker network create mynet\n# 类型: bridge, host, overlay`}>
    <div className="rounded-[6px] border border-dashed p-2 flex gap-2 justify-center" style={{ borderColor: p.accent + "40" }}><Box p={p}>web</Box><Box p={p}>api</Box><Box p={p}>db</Box></div>
    <div className="mt-1 text-[8px] text-center" style={{ color: p.textFaint }}>同一 network: 可用容器名互访</div>
  </CodeToggle>);
}

export function RegistryDemo() { const p = usePalette(); return (<CodeToggle code={`# 镜像仓库 Registry\n# 存储和分发 Docker 镜像\n# Docker Hub: 公共仓库\n# 私有: GitHub Container Registry\n# docker push / pull`}>
    <div className="flex items-center gap-1 text-[9px] justify-center"><Box p={p}>docker push</Box><Arrow p={p}/><Box highlight p={p}> Docker Hub</Box><Arrow p={p}/><Box p={p}>docker pull</Box></div>
  </CodeToggle>);
}

export function DockerBuildDemo() { const p = usePalette(); const [step, setStep] = useState(0); const steps = ["Step 1/4: FROM", "Step 2/4: COPY", "Step 3/4: RUN", "Step 4/4: CMD"]; return (<CodeToggle code={`# docker build\n# 按 Dockerfile 逐层构建镜像\n# 缓存: 未修改的层不重建\n# docker build -t myapp:v1 .`}>
    <button onClick={() => setStep(s => s < 4 ? s + 1 : 0)} className="mb-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>build</button>
    <div className="font-mono text-[8px] space-y-0.5">{steps.map((s, i) => <div key={i} style={{ color: i < step ? "#5f8a6b" : i === step ? p.accent : p.textFaint }}>{i < step ? "✓" : i === step ? "▶" : " "} {s}</div>)}</div>
  </CodeToggle>);
}

export function DockerRunDemo() { const p = usePalette(); return (<CodeToggle code={`# docker run 常用参数\n# -d: 后台运行\n# -p 3000:3000: 端口映射\n# -v: 挂载卷\n# --name: 容器名\n# --rm: 停止后自动删除`}>
    <div className="rounded-[6px] border p-2 font-mono text-[8px]" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}><span style={{ color: p.accent }}>docker run</span> -d -p 3000:3000 --name web myapp:v1</div>
  </CodeToggle>);
}

export function MultiStageDemo() { const p = usePalette(); return (<CodeToggle code={`# 多阶段构建\n# Stage 1: 编译 (大镜像)\n# Stage 2: 只复制产物 (小镜像)\n# 结果: 镜像从 1GB → 50MB\n# 安全: 不含源码和构建工具`}>
    <div className="flex items-center gap-1 text-[8px] justify-center"><Box p={p}>Build (1GB)</Box><Arrow p={p}/><span style={{ color: p.accent }}>COPY --from</span><Arrow p={p}/><Box highlight p={p}>Final (50MB)</Box></div>
  </CodeToggle>);
}

export function ContainerLogsDemo() { const p = usePalette(); return (<CodeToggle code={`# 容器日志\n# docker logs <container>\n# docker logs -f (实时跟踪)\n# 最佳实践: 输出到 stdout/stderr\n# 不要写文件到容器内！`}>
    <div className="rounded-[6px] border p-2 font-mono text-[8px] space-y-0.5 h-[50px] overflow-hidden" style={{ borderColor: p.border, backgroundColor: "#0d0d0b", color: "#5f8a6b" }}><div>Server listening on :3000</div><div>GET / 200 12ms</div><div>GET /api 200 45ms</div><div style={{ color: "#d4a03c" }}>WARN: slow query 230ms</div></div>
  </CodeToggle>);
}

export function DockerVolumeDemo() { const p = usePalette(); return (<CodeToggle code={`# Docker Volume 管理\n# docker volume create data\n# docker volume ls\n# docker volume rm data\n# 绑定挂载: -v /host/path:/container/path`}>
    <div className="flex items-center gap-1 text-[9px] justify-center"><span style={{ color: p.textFaint }}>宿主机</span><Box p={p}>/data</Box><span style={{ color: p.accent }}>⟷</span><Box highlight p={p}>容器 /app/data</Box></div>
  </CodeToggle>);
}

// ═══ Tools ══
export function GithubDemo() { const p = usePalette(); return (<CodeToggle code={`# GitHub\n# 全球最大的代码托管平台\n# Git 仓库 + PR + Issues + Actions\n# 社交: Star, Fork, Follow\n# 免费: 公开仓库无限`}>
    <div className="rounded-[6px] border p-2 space-y-1" style={{ borderColor: p.border }}><div className="flex items-center gap-1 text-[9px]"><span style={{ color: p.text }}>⭐ 1.2k</span><span style={{ color: p.textFaint }}>🍴 234</span><span style={{ color: p.textFaint }}>👁️ 56</span></div><div className="text-[8px]" style={{ color: p.textMuted }}>main branch · 142 commits · TypeScript</div></div>
  </CodeToggle>);
}

export function CloudflareDemo() { const p = usePalette(); return (<CodeToggle code={`# Cloudflare\n# CDN + DNS + 安全 + Serverless\n# 免费计划非常慷慨\n# 功能: DDoS 防护、Workers、R2、D1\n# 全球 300+ 节点`}>
    <div className="flex items-center gap-1 text-[9px] justify-center"><Box p={p}>用户</Box><Arrow p={p}/><Box highlight p={p}>☁️ CF Edge</Box><Arrow p={p}/><Box p={p}>源站</Box></div>
  </CodeToggle>);
}

export function VercelDemo() { const p = usePalette(); return (<CodeToggle code={`# Vercel\n# Next.js 最佳部署平台\n# Git push → 自动部署\n# 预览: 每个 PR 一个预览 URL\n# 免费: 个人项目足够`}>
    <div className="text-[9px] space-y-0.5 font-mono" style={{ color: p.textMuted }}><div>✓ Production: liguiyu.com</div><div>✓ Preview: pr-42-xxx.vercel.app</div></div>
  </CodeToggle>);
}

export function ResendDemo() { const p = usePalette(); return (<CodeToggle code={`# Resend 邮件发送服务\n# 开发者友好的邮件 API\n# 替代 SendGrid / Mailgun\n# 免费: 100封/天\n# SDK: Node, Python, Go`}>
    <div className="flex items-center gap-1 text-[9px] justify-center"><Box highlight p={p}>📧 API</Box><Arrow p={p}/><span style={{ color: p.textFaint }}>user@example.com</span><span style={{ color: "#5f8a6b" }}> ✓</span></div>
  </CodeToggle>);
}

export function AliyunDemo() { const p = usePalette(); return (<CodeToggle code={`# 阿里云\n# 中国最大云服务商\n# ECS(服务器) + OSS(存储) + RDS(数据库)\n# 优势: 国内速度快、备案方便\n# 域名需 ICP 备案`}>
    <div className="grid grid-cols-2 gap-1 text-[8px]">{["ECS 服务器", "OSS 存储", "RDS 数据库", "CDN 加速"].map(s => <Box key={s} p={p}>{s}</Box>)}</div>
  </CodeToggle>);
}

export function TencentCloudDemo() { const p = usePalette(); return (<CodeToggle code={`# 腾讯云\n# 国内第二大云\n# CVM + COS + 云函数\n# 优势: 微信生态集成\n# 学生优惠、轻量服务器便宜`}>
    <div className="grid grid-cols-2 gap-1 text-[8px]">{["CVM 服务器", "COS 存储", "云函数", "CDN"].map(s => <Box key={s} p={p}>{s}</Box>)}</div>
  </CodeToggle>);
}

export function VscodeDemo() { const p = usePalette(); return (<CodeToggle code={`# VS Code 编辑器\n# 最流行的代码编辑器\n# 插件生态: 10000+\n# 内置: Git、终端、调试\n# AI: Copilot、Cline 插件`}>
    <div className="flex gap-1 text-[8px]">{["🔌 GitLens", "🎨 Theme", "🤖 Copilot", " Prettier"].map(e => <span key={e} className="px-1.5 py-0.5 rounded-[3px]" style={{ backgroundColor: p.surface, color: p.textMuted }}>{e}</span>)}</div>
  </CodeToggle>);
}

export function PostmanDemo() { const p = usePalette(); return (<CodeToggle code={`# Postman API 测试工具\n# 可视化发送 HTTP 请求\n# 保存请求集合\n# 环境变量切换\n# 替代: curl, Insomnia, HTTPie`}>
    <div className="flex items-center gap-1 text-[9px]"><Tag color="#d4a03c" p={p}>GET</Tag><span className="font-mono text-[8px] px-1.5 py-0.5 rounded-[3px] border" style={{ borderColor: p.border, color: p.textMuted }}>https://api.example.com/users</span><span style={{ color: "#5f8a6b" }}>200</span></div>
  </CodeToggle>);
}

export function FigmaDemo() { const p = usePalette(); return (<CodeToggle code={`# Figma 设计工具\n# 在线协作 UI 设计\n# 组件系统 + 自动布局\n# 开发交付: 标注、切图\n# 免费: 个人项目`}>
    <div className="flex gap-1 justify-center">{["🎨", "📐", "🧩", "👥"].map((e, i) => <div key={i} className="w-7 h-7 rounded-[6px] border flex items-center justify-center text-[12px]" style={{ borderColor: p.border, backgroundColor: p.surface }}>{e}</div>)}</div>
  </CodeToggle>);
}

export function NotionDemo() { const p = usePalette(); return (<CodeToggle code={`# Notion 笔记/协作工具\n# All-in-one: 笔记+数据库+看板\n# 块编辑器: 自由组合内容\n# 模板丰富\n# 适合: 文档、项目管理、知识库`}>
    <div className="space-y-1 text-[9px]">{["📝 文档", "📊 数据库", "📋 看板"].map((b, i) => <div key={i} className="px-2 py-1 rounded-[4px] border" style={{ borderColor: p.border, color: p.textMuted }}>{b}</div>)}</div>
  </CodeToggle>);
}

export function SentryDemo() { const p = usePalette(); return (<CodeToggle code={`# Sentry 错误监控\n# 自动捕获线上错误\n# 堆栈追踪 + 用户信息\n# 告警: Slack/邮件通知\n# Source Map 定位源码行`}>
    <div className="rounded-[6px] border p-2 space-y-1" style={{ borderColor: "#b85c4a40" }}><div className="text-[9px] font-medium" style={{ color: "#b85c4a" }}>TypeError: Cannot read 'map'</div><div className="text-[8px] font-mono" style={{ color: p.textFaint }}>at UserList.tsx:42</div><div className="text-[8px]" style={{ color: p.textFaint }}>影响 23 用户 · 发生 156 次</div></div>
  </CodeToggle>);
}

export function AnalyticsDemo() { const p = usePalette(); return (<CodeToggle code={`# 网站分析 Analytics\n# 追踪: PV、UV、来源、行为\n# 工具: Google Analytics, Umami, Plausible\n# 隐私友好: Plausible, Umami\n# 用途: 了解用户、优化转化`}>
    <div className="flex items-end gap-0.5 h-8">{[3, 5, 4, 7, 6, 8, 5].map((h, i) => <div key={i} className="flex-1 rounded-t-[2px]" style={{ height: `${h * 12}%`, backgroundColor: i === 5 ? p.accent : p.surface }} />)}</div>
    <div className="text-[8px] text-center mt-1" style={{ color: p.textFaint }}>本周访问量趋势</div>
  </CodeToggle>);
}

export function StripeDemo() { const p = usePalette(); return (<CodeToggle code={`# Stripe 支付平台\n# 开发者友好的支付 API\n# 支持: 信用卡、支付宝、微信\n# 功能: 订阅、发票、退款\n# 替代: PayPal, 支付宝直连`}>
    <div className="rounded-[6px] border p-2 flex items-center gap-2" style={{ borderColor: p.border }}><div className="text-[14px]">💳</div><div><div className="text-[9px]" style={{ color: p.text }}>¥99.00</div><div className="text-[8px]" style={{ color: "#5f8a6b" }}>✓ Payment succeeded</div></div></div>
  </CodeToggle>);
}

export function SupabaseDemo() { const p = usePalette(); return (<CodeToggle code={`# Supabase 开源 Firebase 替代\n# PostgreSQL + Auth + Storage + Realtime\n# 自动生成 API\n# 免费额度慷慨\n# 适合: 快速原型、中小项目`}>
    <div className="grid grid-cols-2 gap-1 text-[8px]">{["🗄️ Database", "🔐 Auth", "📦 Storage", "⚡ Realtime"].map(s => <Box key={s} p={p}>{s}</Box>)}</div>
  </CodeToggle>);
}

export function NeonDemo() { const p = usePalette(); return (<CodeToggle code={`# Neon Serverless PostgreSQL\n# 按需扩缩、自动暂停\n# 分支: 像 Git 一样分支数据库\n# 免费: 0.5GB 存储\n# 适合: Serverless 应用`}>
    <div className="flex items-center gap-1 text-[9px] justify-center"><Box p={p}>main</Box><span style={{ color: p.accent }}>⑂</span><Box highlight p={p}>preview-branch</Box></div>
  </CodeToggle>);
}

export function RailwayDemo() { const p = usePalette(); return (<CodeToggle code={`# Railway 部署平台\n# 连接 Git → 自动部署\n# 支持: Node, Python, Docker\n# 内置: PostgreSQL, Redis\n# 按用量计费，简单直观`}>
    <div className="flex items-center gap-1 text-[9px] justify-center"><Box p={p}>📂 Git</Box><Arrow p={p}/><Box highlight p={p}>🚂 Railway</Box><Arrow p={p}/><span style={{ color: "#5f8a6b" }}>✓ Live</span></div>
  </CodeToggle>);
}

// ═══ Style ═══
export function MinimalismDemo() { const p = usePalette(); return (<CodeToggle code={`/* 极简主义 Minimalism */\n/* 少即是多 */\n/* 大量留白 + 有限色彩 */\n/* 去除一切非必要元素 */\n/* 代表: Apple, Muji */`}>
    <div className="h-[60px] rounded-[8px] border flex items-center justify-center" style={{ borderColor: p.border }}><div className="text-[14px] font-light tracking-widest" style={{ color: p.text }}>Less is More</div></div>
  </CodeToggle>);
}

export function GlassmorphismDemo() { const p = usePalette(); return (<CodeToggle code={`/* 玻璃态 Glassmorphism */\n/* 半透明 + 模糊 + 边框 */\nbackground: rgba(255,255,255,0.1);\nbackdrop-filter: blur(10px);\nborder: 1px solid rgba(255,255,255,0.2);`}>
    <div className="h-[60px] rounded-[8px] relative overflow-hidden flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${p.accent}40, #4a7fb540)` }}><div className="px-4 py-2 rounded-[8px] text-[10px]" style={{ backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}>Glass Card</div></div>
  </CodeToggle>);
}

export function NeumorphismDemo() { const p = usePalette(); return (<CodeToggle code={`/* 新拟态 Neumorphism */\n/* 柔和的凸起/凹陷效果 */\n/* 同色阴影: 亮+暗 两侧 */\n/* 适合: 开关、滑块、卡片 */\n/* 注意: 对比度低，无障碍差 */`}>
    <div className="flex gap-3 justify-center"><div className="w-12 h-12 rounded-[10px] flex items-center justify-center text-[10px]" style={{ backgroundColor: p.isDark ? "#1e1c17" : "#e8e6e1", boxShadow: p.isDark ? "4px 4px 8px #0a0a08, -4px -4px 8px #322e26" : "4px 4px 8px #c5c3be, -4px -4px 8px #ffffff", color: p.textMuted }}>凸</div><div className="w-12 h-12 rounded-[10px] flex items-center justify-center text-[10px]" style={{ backgroundColor: p.isDark ? "#1e1c17" : "#e8e6e1", boxShadow: p.isDark ? "inset 4px 4px 8px #0a0a08, inset -4px -4px 8px #322e26" : "inset 4px 4px 8px #c5c3be, inset -4px -4px 8px #ffffff", color: p.textMuted }}>凹</div></div>
  </CodeToggle>);
}

export function BrutalismDemo() { const p = usePalette(); return (<CodeToggle code={`/* 粗野主义 Brutalism */\n/* 原始、大胆、反精致 */\n/* 粗边框 + 默认字体 + 高对比 */\n/* 无圆角、无阴影、无渐变 */\n/* 代表: Bloomberg, Craigslist */`}>
    <div className="border-2 p-3 text-[12px] font-bold" style={{ borderColor: p.text, color: p.text }}>RAW DESIGN<br /><span className="text-[9px] font-normal" style={{ color: p.textMuted }}>No rounded corners. No shadows.</span></div>
  </CodeToggle>);
}

export function GradientDemo() {
  const p = usePalette();
  const [angle, setAngle] = useState(135);
  return (<CodeToggle code={`/* 渐变色 Gradient */\nbackground: linear-gradient(135deg, #d97757, #4a7fb5);\n/* 类型: linear, radial, conic */\n/* 用途: 背景、按钮、文字 */\n/* 注意: 不要过度使用 */`}>
    <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(+e.target.value)} className="w-full mb-2" />
    <div className="h-10 rounded-[8px]" style={{ background: `linear-gradient(${angle}deg, ${p.accent}, #4a7fb5)` }} />
    <div className="text-[8px] text-center mt-1 font-mono" style={{ color: p.textFaint }}>{angle}deg</div>
  </CodeToggle>);
}

export function ResponsiveDesignDemo() { const p = usePalette(); const [w, setW] = useState(3); const widths = [120, 180, 260]; const labels = ["📱 Mobile", "📟 Tablet", "🖥️ Desktop"]; return (<CodeToggle code={`/* 响应式设计 */\n/* 一套代码适配所有屏幕 */\n/* 方法: 媒体查询 + 弹性布局 */\n/* 移动优先: 先写手机样式 */\n/* 测试: Chrome DevTools 设备模式 */`}>
    <div className="flex gap-1 mb-2">{labels.map((l, i) => <MiniBtn key={i} active={w === i} onClick={() => setW(i)} p={p}>{l}</MiniBtn>)}</div>
    <div className="mx-auto border rounded-[6px] h-12 transition-all flex items-center justify-center text-[9px]" style={{ width: widths[w], borderColor: p.accent + "40", color: p.textFaint }}>{labels[w]}</div>
  </CodeToggle>);
}

export function BentoGridDemo() { const p = usePalette(); return (<CodeToggle code={`/* Bento Grid 布局 */\n/* 不等大小的卡片网格 */\n/* 灵感: 日本便当盒 */\n/* 特点: 视觉丰富、信息密度高 */\n/* 代表: Apple 产品页、Linear */`}>
    <div className="grid grid-cols-3 grid-rows-2 gap-1 h-[70px]"><div className="col-span-2 rounded-[6px]" style={{ backgroundColor: p.accentBg }} /><div className="rounded-[6px]" style={{ backgroundColor: p.surface }} /><div className="rounded-[6px]" style={{ backgroundColor: p.surface }} /><div className="col-span-2 rounded-[6px]" style={{ backgroundColor: p.surface }} /></div>
  </CodeToggle>);
}

export const devopsDemos: Record<string, React.ComponentType> = {
  "deploy-demo": DeployDemo, "docker-demo2": DockerDemo2, "cicd-demo": CicdDemo,
  "domain-demo2": DomainDemo2, "ssl-demo": SslDemo, "env-demo": EnvDemo,
  "log-demo": LogDemo, "monitoring-demo": MonitoringDemo, "backup-demo": BackupDemo,
  "tunnel-demo": TunnelDemo, "port-demo": PortDemo, "nas-demo": NasDemo,
  "cloud-server-demo": CloudServerDemo, "bandwidth-demo": BandwidthDemo,
  "latency-demo": LatencyDemo, "rollback-demo": RollbackDemo, "uptime-demo": UptimeDemo,
  "nginx-demo": NginxDemo, "ssh-demo": SshDemo, "pm2-demo": Pm2Demo,
  "health-check-demo": HealthCheckDemo, "blue-green-demo": BlueGreenDemo,
  "canary-demo": CanaryDemo, "systemd-demo": SystemdDemo, "ci-cd-demo": CiCdDemo,
  "iac-demo": IacDemo,
  "domain-name-demo": DomainNameDemo, "dns-demo": DnsDemo, "tld-demo": TldDemo,
  "subdomain-demo": SubdomainDemo, "nameserver-demo": NameserverDemo,
  "a-record-demo": ARecordDemo, "cname-demo": CnameDemo, "https-demo": HttpsDemo,
  "whois-demo": WhoisDemo, "registrar-demo": RegistrarDemo,
  "propagation-demo": PropagationDemo, "ip-address-demo": IpAddressDemo,
  "docker-intro-demo": DockerIntroDemo, "image-demo": ImageDemo,
  "container-demo": ContainerDemo, "dockerfile-demo": DockerfileDemo,
  "docker-compose-demo": DockerComposeDemo, "volume-demo": VolumeDemo,
  "docker-network-demo": DockerNetworkDemo, "registry-demo": RegistryDemo,
  "docker-build-demo": DockerBuildDemo, "docker-run-demo": DockerRunDemo,
  "multi-stage-demo": MultiStageDemo, "container-logs-demo": ContainerLogsDemo,
  "docker-volume-demo": DockerVolumeDemo,
  "github-demo": GithubDemo, "cloudflare-demo": CloudflareDemo,
  "vercel-demo": VercelDemo, "resend-demo": ResendDemo,
  "aliyun-demo": AliyunDemo, "tencent-cloud-demo": TencentCloudDemo,
  "vscode-demo": VscodeDemo, "postman-demo": PostmanDemo,
  "figma-demo": FigmaDemo, "notion-demo": NotionDemo,
  "sentry-demo": SentryDemo, "analytics-demo": AnalyticsDemo,
  "stripe-demo": StripeDemo, "supabase-demo": SupabaseDemo,
  "neon-demo": NeonDemo, "railway-demo": RailwayDemo,
  "minimalism-demo": MinimalismDemo, "glassmorphism-demo": GlassmorphismDemo,
  "neumorphism-demo": NeumorphismDemo, "brutalism-demo": BrutalismDemo,
  "gradient-demo": GradientDemo, "responsive-design-demo": ResponsiveDesignDemo,
  "bento-grid-demo": BentoGridDemo,
};
