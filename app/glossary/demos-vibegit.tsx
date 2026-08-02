"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePalette, CodeToggle, MiniBtn, Tag, Arrow, Box } from "./demo-shared";

export function VibeCodingDemo() {
  const p = usePalette();
  const [msgs, setMsgs] = useState([{ role: "user", text: "做一个登录页面" }, { role: "ai", text: "好的，我来创建..." }]);
  const add = () => setMsgs(m => [...m, { role: "user", text: "加个记住密码" }, { role: "ai", text: "已添加 checkbox ✓" }]);
  return (<CodeToggle code={`// Vibe Coding 氛围编程\n// 用自然语言描述需求\n// AI 生成代码，你验收\n// 不需要逐行写代码\n// 核心: 描述「要什么」而非「怎么写」`}>
    <div className="space-y-1.5 max-h-[100px] overflow-y-auto">{msgs.map((m, i) => <div key={i} className="flex" style={{ justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}><div className="px-2 py-1 rounded-[6px] text-[9px] max-w-[80%]" style={{ backgroundColor: m.role === "user" ? p.accentBg : p.surface, color: m.role === "user" ? p.accent : p.textMuted }}>{m.text}</div></div>)}</div>
    <button onClick={add} className="mt-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>继续对话</button>
  </CodeToggle>);
}

export function PromptEngineeringDemo() {
  const p = usePalette();
  const [level, setLevel] = useState(0);
  const prompts = ["写个按钮", "写一个 React 按钮组件，使用 Tailwind CSS，支持 primary/secondary 两种变体，带 hover 效果和 disabled 状态"];
  return (<CodeToggle code={`// 提示工程技巧\n// 1. 具体 > 模糊\n// 2. 给上下文和约束\n// 3. 给示例 (few-shot)\n// 4. 指定格式和风格\n// 5. 分步骤描述复杂任务`}>
    <div className="flex gap-1 mb-2"><MiniBtn active={level === 0} onClick={() => setLevel(0)} p={p}>❌ 模糊</MiniBtn><MiniBtn active={level === 1} onClick={() => setLevel(1)} p={p}>✓ 精确</MiniBtn></div>
    <div className="rounded-[6px] border p-2 text-[9px]" style={{ borderColor: level === 1 ? "#5f8a6b40" : "#b85c4a40", backgroundColor: p.codeBg, color: p.textMuted }}>"{prompts[level]}"</div>
    <div className="mt-1 text-[8px]" style={{ color: level === 1 ? "#5f8a6b" : "#b85c4a" }}>{level === 1 ? "✓ 明确的技术栈 + 功能 + 样式要求" : "✗ AI 需要猜测太多信息"}</div>
  </CodeToggle>);
}

export function IterationDemo() {
  const p = usePalette();
  const [v, setV] = useState(1);
  const versions = ["基础布局", "+ 响应式", "+ 动画", "+ 优化"];
  return (<CodeToggle code={`// 迭代开发\n// 不要一步到位\n// v1: 能跑 → v2: 好看 → v3: 性能好\n// 每次小步改进，持续反馈\n// AI 协作: 每次给一个改进指令`}>
    <div className="flex gap-1 mb-2">{versions.map((_, i) => <MiniBtn key={i} active={v === i + 1} onClick={() => setV(i + 1)} p={p}>v{i + 1}</MiniBtn>)}</div>
    <div className="rounded-[6px] border p-2 space-y-1" style={{ borderColor: p.border }}>
      {versions.slice(0, v).map((ver, i) => <div key={i} className="text-[9px] flex items-center gap-1" style={{ color: i === v - 1 ? p.accent : p.textFaint }}><Tag p={p}>v{i + 1}</Tag>{ver}</div>)}
    </div>
  </CodeToggle>);
}

export function DebugDemo() {
  const p = usePalette();
  const [step, setStep] = useState(0);
  const steps = ["❌ TypeError: x is not a function", "🔍 检查: x 是 undefined", "💡 原因: 忘记 import", "✅ 修复: 添加 import { x }"];
  return (<CodeToggle code={`// 调试 Debug\n// 1. 复现问题\n// 2. 缩小范围 (二分法)\n// 3. 检查变量/状态\n// 4. 找到根因\n// 5. 修复 + 验证\n// AI 调试: 贴错误信息 + 上下文`}>
    <button onClick={() => setStep(s => s < steps.length - 1 ? s + 1 : 0)} className="mb-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>下一步</button>
    <div className="space-y-1">{steps.map((s, i) => <div key={i} className="text-[9px] transition-all" style={{ color: i <= step ? p.text : p.textFaint, opacity: i <= step ? 1 : 0.3 }}>{s}</div>)}</div>
  </CodeToggle>);
}

export function RefactorDemo() {
  const p = usePalette();
  const [after, setAfter] = useState(false);
  return (<CodeToggle code={`// 重构 = 改善代码结构，不改变功能\n// 信号: 重复代码、过长函数、深层嵌套\n// 原则: 小步重构 + 测试保护\n// AI 擅长: 提取函数、重命名、简化逻辑`}>
    <div className="flex gap-1 mb-2"><MiniBtn active={!after} onClick={() => setAfter(false)} p={p}>重构前</MiniBtn><MiniBtn active={after} onClick={() => setAfter(true)} p={p}>重构后</MiniBtn></div>
    <div className="rounded-[6px] border p-2 font-mono text-[8px] space-y-0.5" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}>
      {!after ? <><div>function process(data) {"{"}</div><div className="pl-2">if (data.type == "a") {"{"} ... 20行 {"}"}</div><div className="pl-2">if (data.type == "b") {"{"} ... 20行 {"}"}</div><div className="pl-2">if (data.type == "c") {"{"} ... 20行 {"}"}</div><div>{"}"}</div></> : <><div>const handlers = {"{ a: handleA, b: handleB, c: handleC }"}</div><div>function process(data) {"{"}</div><div className="pl-2">return handlers[data.type](data)</div><div>{"}"}</div></>}
    </div>
  </CodeToggle>);
}

export function BoilerplateDemo() {
  const p = usePalette();
  const [gen, setGen] = useState(false);
  return (<CodeToggle code={`// 样板代码 Boilerplate\n// 每次新项目都要写的重复代码\n// 配置、类型定义、项目结构\n// 解决: 脚手架工具 (create-next-app)\n// AI: 一句话生成整个项目结构`}>
    <button onClick={() => setGen(!gen)} className="mb-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>{gen ? "清除" : "生成样板代码"}</button>
    {gen && <div className="font-mono text-[8px] space-y-0.5" style={{ color: p.textMuted }}><div>📁 src/</div><div className="pl-2">📄 index.ts</div><div className="pl-2">📄 types.ts</div><div className="pl-2">📄 utils.ts</div><div>📄 tsconfig.json</div><div>📄 package.json</div></div>}
  </CodeToggle>);
}

export function StackDemo() {
  const p = usePalette();
  const layers = ["前端: React", "后端: Node.js", "数据库: PostgreSQL", "部署: Docker"];
  return (<CodeToggle code={`// 技术栈 Tech Stack\n// 项目使用的所有技术组合\n// 前端 + 后端 + 数据库 + 部署\n// 选择依据: 团队熟悉度、生态、性能\n// 常见: MERN, JAMstack, T3 Stack`}>
    <div className="space-y-1">{layers.map((l, i) => <div key={i} className="rounded-[6px] border px-2 py-1.5 text-[9px] text-center transition-all" style={{ borderColor: p.border, backgroundColor: p.surface, color: p.textMuted, marginLeft: `${i * 8}px`, marginRight: `${i * 8}px` }}>{l}</div>)}</div>
  </CodeToggle>);
}

export function FrameworkDemo() {
  const p = usePalette();
  const [fw, setFw] = useState("next");
  const fws = { next: { desc: "全栈 React 框架", pros: "SSR+路由+API" }, vite: { desc: "极速构建工具", pros: "HMR+轻量" }, express: { desc: "Node.js Web 框架", pros: "简单+灵活" } };
  return (<CodeToggle code={`// 框架 vs 库\n// 框架: 控制反转，它调用你的代码\n// 库: 你调用它的函数\n// 框架提供: 路由、状态、构建、约定\n// 选择: 看项目规模和团队经验`}>
    <div className="flex gap-1 mb-2">{Object.keys(fws).map(k => <MiniBtn key={k} active={fw === k} onClick={() => setFw(k)} p={p}>{k}</MiniBtn>)}</div>
    <div className="rounded-[6px] border p-2 text-[9px]" style={{ borderColor: p.border, backgroundColor: p.surface }}><div style={{ color: p.text }}>{fws[fw as keyof typeof fws].desc}</div><div className="mt-0.5" style={{ color: p.textFaint }}>优势: {fws[fw as keyof typeof fws].pros}</div></div>
  </CodeToggle>);
}

export function DependencyDemo() {
  const p = usePalette();
  const deps = [{ name: "react", ver: "^18.2" }, { name: "next", ver: "^14.0" }, { name: "tailwindcss", ver: "^3.4" }];
  return (<CodeToggle code={`// 依赖 Dependency\n// 你的代码依赖的外部包\n// package.json 记录版本\n// node_modules 存放代码\n// 问题: 依赖地狱、安全漏洞\n// 解决: lock 文件、定期更新`}>
    <div className="rounded-[6px] border p-2 font-mono text-[9px] space-y-1" style={{ borderColor: p.border, backgroundColor: p.codeBg }}><div style={{ color: p.textFaint }}>"dependencies": {"{"}</div>{deps.map((d, i) => <div key={i} className="pl-3" style={{ color: p.textMuted }}>"{d.name}": <span style={{ color: p.accent }}>"{d.ver}"</span></div>)}<div style={{ color: p.textFaint }}>{"}"}</div></div>
  </CodeToggle>);
}

export function HotReloadDemo() {
  const p = usePalette();
  const [saved, setSaved] = useState(false);
  return (<CodeToggle code={`// 热重载 HMR (Hot Module Replacement)\n// 修改代码 → 浏览器自动更新\n// 不需要手动刷新！\n// 保持应用状态 (表单数据不丢)\n// Vite/Next.js 内置支持`}>
    <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 1500); }} className="mb-2 px-3 py-1 rounded-[5px] text-[10px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>模拟保存文件</button>
    <div className="flex items-center gap-2 text-[9px]"><span style={{ color: p.textMuted }}>保存</span><Arrow p={p}/><motion.span animate={{ opacity: saved ? [0, 1, 1] : 0.3 }} style={{ color: saved ? "#5f8a6b" : p.textFaint }}>HMR 更新</motion.span><Arrow p={p}/><span style={{ color: saved ? p.accent : p.textFaint }}>页面刷新</span></div>
  </CodeToggle>);
}

export function RulesFileDemo() {
  const p = usePalette();
  return (<CodeToggle code={`# .cursorrules / AGENTS.md\n# 告诉 AI 编码助手的规则\n# 例:\n- 使用 TypeScript strict 模式\n- 组件用函数式 + hooks\n- 样式用 Tailwind\n- 不要使用 any 类型`}>
    <div className="rounded-[6px] border p-2 font-mono text-[8px] space-y-0.5" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}>
      <div style={{ color: p.accent }}># 项目规则</div>
      <div>- 使用 TypeScript</div>
      <div>- 组件: 函数式 + hooks</div>
      <div>- 样式: Tailwind CSS</div>
      <div>- 禁止: any, var, class组件</div>
    </div>
  </CodeToggle>);
}

export function CodeReviewDemo() {
  const p = usePalette();
  const [approved, setApproved] = useState(false);
  return (<CodeToggle code={`// 代码审查 Code Review\n// 合并前由他人检查代码\n// 目的: 发现 bug、统一风格、知识共享\n// 工具: GitHub PR, GitLab MR\n// AI 也可以做初步 review`}>
    <div className="rounded-[6px] border p-2 space-y-1.5" style={{ borderColor: p.border }}>
      <div className="font-mono text-[8px] space-y-0.5" style={{ color: p.textMuted }}><div style={{ color: "#b85c4a" }}>- const x = data.name</div><div style={{ color: "#5f8a6b" }}>+ const x = data?.name ?? 'Unknown'</div></div>
      <div className="text-[8px]" style={{ color: p.textFaint }}>💬 建议: 添加空值保护</div>
      <div className="flex gap-1">{!approved ? <><button onClick={() => setApproved(true)} className="px-2 py-0.5 rounded-[3px] text-[8px] cursor-pointer" style={{ backgroundColor: "#5f8a6b", color: "#fff" }}>Approve</button><button className="px-2 py-0.5 rounded-[3px] text-[8px] cursor-pointer" style={{ backgroundColor: "#d4a03c", color: "#fff" }}>Request Changes</button></> : <span className="text-[8px]" style={{ color: "#5f8a6b" }}>✓ 已批准合并</span>}</div>
    </div>
  </CodeToggle>);
}

export function TestingDemo() {
  const p = usePalette();
  const [run, setRun] = useState(false);
  const tests = [{ name: "登录成功", pass: true }, { name: "密码错误", pass: true }, { name: "空输入", pass: false }];
  return (<CodeToggle code={`// 测试 Testing\n// 单元: 测试单个函数\n// 集成: 测试模块协作\n// E2E: 测试完整用户流程\n// 工具: Jest, Vitest, Playwright\n// AI: 自动生成测试用例`}>
    <button onClick={() => setRun(true)} className="mb-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>运行测试</button>
    {run && <div className="space-y-1 font-mono text-[9px]">{tests.map((t, i) => <div key={i} style={{ color: t.pass ? "#5f8a6b" : "#b85c4a" }}>{t.pass ? "✓" : "✗"} {t.name}</div>)}<div className="mt-1 text-[8px]" style={{ color: p.textFaint }}>2 passed, 1 failed</div></div>}
  </CodeToggle>);
}

export function DocumentationDemo() {
  const p = usePalette();
  return (<CodeToggle code={`// 文档 Documentation\n// 代码注释: 解释「为什么」\n// README: 项目入门指南\n// API 文档: 接口说明\n// 好代码 + 好文档 = 可维护\n// AI 可以自动生成文档`}>
    <div className="rounded-[6px] border p-2 space-y-1.5" style={{ borderColor: p.border }}>
      <div className="text-[10px] font-bold" style={{ color: p.text }}>📖 API 文档</div>
      <div className="font-mono text-[8px] p-1.5 rounded-[4px]" style={{ backgroundColor: p.codeBg, color: p.textMuted }}>GET /api/users<br />→ 200 [{"{"} id, name {"}"}]</div>
      <div className="text-[8px]" style={{ color: p.textFaint }}>参数: page (number, 默认1)</div>
    </div>
  </CodeToggle>);
}

export function AiCodingAssistantDemo() {
  const p = usePalette();
  const [mode, setMode] = useState<"complete" | "chat" | "edit">("complete");
  return (<CodeToggle code={`// AI 编程助手\n// 代码补全: 预测下一行 (Copilot)\n// 对话: 解释/生成/调试 (Chat)\n// 编辑: 多文件修改 (Agent)\n// 工具: Cursor, Copilot, Cline`}>
    <div className="flex gap-1 mb-2">{(["complete", "chat", "edit"] as const).map(m => <MiniBtn key={m} active={mode === m} onClick={() => setMode(m)} p={p}>{m === "complete" ? "补全" : m === "chat" ? "对话" : "编辑"}</MiniBtn>)}</div>
    <div className="rounded-[6px] border p-2 font-mono text-[9px]" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}>
      {mode === "complete" && <><div>function add(a, b) {"{"}</div><div className="pl-2" style={{ color: p.accent, opacity: 0.6 }}>return a + b; // AI 建议</div></>}
      {mode === "chat" && <div style={{ color: p.textMuted }}>AI: 这个 bug 是因为闭包引用了旧 state，用 useRef 解决</div>}
      {mode === "edit" && <div style={{ color: p.textMuted }}>AI: 已将 3 个文件中的 class 组件转为 hooks</div>}
    </div>
  </CodeToggle>);
}

export function DecomposeDemo() {
  const p = usePalette();
  const [expanded, setExpanded] = useState(false);
  return (<CodeToggle code={`// 拆解 Decompose\n// 大任务 → 小任务\n// 「做一个电商网站」→\n//   1. 商品列表\n//   2. 购物车\n//   3. 结算流程\n//   4. 用户系统\n// AI 协作: 每次只做一小步`}>
    <button onClick={() => setExpanded(!expanded)} className="mb-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>{expanded ? "收起" : "拆解任务"}</button>
    <div className="text-[9px]" style={{ color: p.text }}>📋 做一个博客系统</div>
    {expanded && <div className="mt-1 pl-3 space-y-0.5 text-[9px] border-l-2" style={{ borderColor: p.accent, color: p.textMuted }}><div>1. 文章列表页</div><div>2. 文章详情页</div><div>3. Markdown 渲染</div><div>4. 评论功能</div></div>}
  </CodeToggle>);
}

export function IterateDemo() {
  const p = usePalette();
  const [round, setRound] = useState(1);
  return (<CodeToggle code={`// 迭代 Iterate\n// 循环: 做 → 看 → 改 → 做\n// 每次改进一点点\n// 不要追求一次完美\n// AI 协作: 「这里改成...」「再加个...」`}>
    <div className="flex items-center gap-2 justify-center">
      <div className="w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-bold" style={{ borderColor: p.accent, color: p.accent }}>{round}</div>
      <div className="flex gap-1"><MiniBtn onClick={() => setRound(r => Math.max(1, r - 1))} p={p}>-</MiniBtn><MiniBtn onClick={() => setRound(r => r + 1)} p={p}>+</MiniBtn></div>
    </div>
    <div className="mt-2 text-[9px] text-center" style={{ color: p.textFaint }}>第 {round} 轮迭代 — {round < 3 ? "继续改进" : "趋于完善 ✓"}</div>
  </CodeToggle>);
}

export function AcceptRejectDemo() {
  const p = usePalette();
  const [status, setStatus] = useState<"pending" | "accepted" | "rejected">("pending");
  return (<CodeToggle code={`// 接受/拒绝 AI 建议\n// AI 生成的代码不是完美的\n// 你需要审查后决定:\n// ✓ Accept: 采纳修改\n// ✗ Reject: 拒绝，让 AI 重来\n// 永远不要盲目接受！`}>
    <div className="rounded-[6px] border p-2 space-y-1.5" style={{ borderColor: p.border }}>
      <div className="font-mono text-[8px]" style={{ color: p.accent }}>+ const result = await fetch(url)</div>
      {status === "pending" ? <div className="flex gap-1"><button onClick={() => setStatus("accepted")} className="px-2 py-0.5 rounded-[3px] text-[8px] cursor-pointer" style={{ backgroundColor: "#5f8a6b", color: "#fff" }}>✓ Accept</button><button onClick={() => setStatus("rejected")} className="px-2 py-0.5 rounded-[3px] text-[8px] cursor-pointer" style={{ backgroundColor: "#b85c4a", color: "#fff" }}>✗ Reject</button></div> : <div className="text-[9px]" style={{ color: status === "accepted" ? "#5f8a6b" : "#b85c4a" }}>{status === "accepted" ? "✓ 已采纳" : "✗ 已拒绝"}</div>}
    </div>
  </CodeToggle>);
}

// Git demos (14 new - commit and branch already exist)
export function GitDemo2() {
  const p = usePalette();
  const [inited, setInited] = useState(false);
  return (<CodeToggle code={`# Git 版本控制\n# 记录代码的每一次变化\n# 可以回退、对比、协作\n# 核心: commit → push → pull\n# 平台: GitHub, GitLab, Gitee`}>
    <button onClick={() => setInited(!inited)} className="mb-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>{inited ? "rm -rf .git" : "git init"}</button>
    <div className="text-[9px] font-mono" style={{ color: inited ? "#5f8a6b" : p.textFaint }}>{inited ? "✓ Initialized empty Git repository" : "（未初始化）"}</div>
  </CodeToggle>);
}

export function MergeDemo() {
  const p = usePalette();
  return (<CodeToggle code={`# Git Merge 合并\n# 把一个分支的修改合入另一个\n# git merge feature\n# 可能产生冲突需要手动解决\n# 替代方案: rebase (线性历史)`}>
    <div className="flex items-center gap-1 text-[9px] justify-center">
      <div className="flex flex-col items-center gap-1"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.accent }} /><div className="w-0.5 h-4" style={{ backgroundColor: p.border }} /><div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.accent }} /></div>
      <div className="flex flex-col items-center gap-1 ml-3"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#5f8a6b" }} /><div className="w-0.5 h-4" style={{ backgroundColor: p.border }} /><div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#5f8a6b" }} /></div>
      <Arrow p={p} />
      <div className="flex flex-col items-center"><div className="w-4 h-4 rounded-full border-2 flex items-center justify-center text-[6px]" style={{ borderColor: p.accent, color: p.accent }}>M</div></div>
    </div>
  </CodeToggle>);
}

export function PullRequestDemo() {
  const p = usePalette();
  const [status, setStatus] = useState<"open" | "merged">("open");
  return (<CodeToggle code={`# Pull Request (PR)\n# 请求把你的分支合入主分支\n# 流程: 写代码 → 开 PR → Review → Merge\n# 是代码审查的主要场所\n# GitHub/GitLab 核心功能`}>
    <div className="rounded-[6px] border p-2 space-y-1" style={{ borderColor: p.border }}>
      <div className="flex items-center gap-1 text-[9px]"><span style={{ color: status === "merged" ? "#7c3aed" : "#5f8a6b" }}>{status === "merged" ? "🟣" : "🟢"}</span><span style={{ color: p.text }}>添加用户登录功能</span></div>
      <div className="text-[8px]" style={{ color: p.textFaint }}>feature/login → main · 3 commits</div>
      {status === "open" ? <button onClick={() => setStatus("merged")} className="px-2 py-0.5 rounded-[3px] text-[8px] cursor-pointer" style={{ backgroundColor: "#7c3aed", color: "#fff" }}>Merge PR</button> : <span className="text-[8px]" style={{ color: "#7c3aed" }}>✓ Merged</span>}
    </div>
  </CodeToggle>);
}

export function ConflictDemo() {
  const p = usePalette();
  const [resolved, setResolved] = useState(false);
  return (<CodeToggle code={`# 合并冲突 Merge Conflict\n# 两人改了同一行代码\n# Git 无法自动合并\n# 标记: <<<<<<< / ======= / >>>>>>>\n# 解决: 手动选择保留哪个版本`}>
    <div className="rounded-[6px] border p-2 font-mono text-[8px] space-y-0.5" style={{ borderColor: resolved ? "#5f8a6b40" : "#b85c4a40", backgroundColor: p.codeBg }}>
      {!resolved ? <><div style={{ color: "#b85c4a" }}>{"<<<<<<< HEAD"}</div><div style={{ color: p.textMuted }}>const color = "red"</div><div style={{ color: "#d4a03c" }}>=======</div><div style={{ color: p.textMuted }}>const color = "blue"</div><div style={{ color: "#b85c4a" }}>{">>>>>>> feature"}</div></> : <div style={{ color: "#5f8a6b" }}>const color = "blue" ✓</div>}
    </div>
    <button onClick={() => setResolved(!resolved)} className="mt-1 px-2 py-0.5 rounded-[3px] text-[8px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>{resolved ? "重置" : "解决冲突"}</button>
  </CodeToggle>);
}

export function CloneDemo() {
  const p = usePalette();
  const [cloned, setCloned] = useState(false);
  return (<CodeToggle code={`# git clone <url>\n# 把远程仓库完整复制到本地\n# 包含所有历史和分支\n# 浅克隆: --depth 1 (只要最新)`}>
    <button onClick={() => setCloned(!cloned)} className="mb-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>{cloned ? "rm -rf repo" : "git clone"}</button>
    <div className="text-[9px] font-mono" style={{ color: cloned ? "#5f8a6b" : p.textFaint }}>{cloned ? "✓ Cloning into 'repo'... done." : "$ git clone https://github.com/..."}</div>
  </CodeToggle>);
}

export function PushPullDemo() {
  const p = usePalette();
  const [sync, setSync] = useState(0);
  return (<CodeToggle code={`# git push: 本地 → 远程\n# git pull: 远程 → 本地\n# push 前通常先 pull (避免冲突)\n# 协作基本流程:\n# pull → 改代码 → commit → push`}>
    <div className="flex items-center gap-2 justify-center text-[9px]">
      <Box p={p}>💻 本地</Box>
      <div className="flex flex-col gap-0.5"><button onClick={() => setSync(1)} className="text-[8px] cursor-pointer border-0 bg-transparent" style={{ color: p.accent }}>push →</button><button onClick={() => setSync(2)} className="text-[8px] cursor-pointer border-0 bg-transparent" style={{ color: "#5f8a6b" }}>← pull</button></div>
      <Box highlight p={p}>☁️ 远程</Box>
    </div>
    <div className="mt-1 text-[8px] text-center" style={{ color: p.textFaint }}>{sync === 1 ? "已推送到远程" : sync === 2 ? "已拉取最新代码" : "点击 push/pull"}</div>
  </CodeToggle>);
}

export function RepositoryDemo() {
  const p = usePalette();
  return (<CodeToggle code={`# 仓库 Repository\n# 项目的完整 Git 数据库\n# 包含: 所有文件 + 所有历史\n# 本地仓库: .git 文件夹\n# 远程仓库: GitHub/GitLab 上的`}>
    <div className="rounded-[6px] border p-2 font-mono text-[8px] space-y-0.5" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}>
      <div>📁 my-project/</div>
      <div className="pl-2">📁 .git/ <span style={{ color: p.textFaint }}>(版本历史)</span></div>
      <div className="pl-2">📁 src/</div>
      <div className="pl-2">📄 README.md</div>
      <div className="pl-2">📄 package.json</div>
    </div>
  </CodeToggle>);
}

export function RemoteDemo() {
  const p = usePalette();
  return (<CodeToggle code={`# 远程仓库 Remote\n# git remote -v  查看远程地址\n# git remote add origin <url>\n# origin 是默认的远程名\n# 可以添加多个远程 (upstream 等)`}>
    <div className="font-mono text-[9px] space-y-1 p-2 rounded-[6px] border" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}>
      <div>origin <span style={{ color: p.accent }}>github.com/me/repo.git</span></div>
      <div>upstream <span style={{ color: p.textFaint }}>github.com/org/repo.git</span></div>
    </div>
  </CodeToggle>);
}

export function TagDemo() {
  const p = usePalette();
  const tags = ["v1.0.0", "v1.1.0", "v2.0.0"];
  return (<CodeToggle code={`# Git Tag 标签\n# 给某个 commit 打标记\n# 通常用于版本发布\n# git tag v1.0.0\n# git push --tags`}>
    <div className="flex gap-2 items-end">{tags.map((t, i) => <div key={i} className="flex flex-col items-center"><div className="px-1.5 py-0.5 rounded-[4px] text-[8px] font-mono" style={{ backgroundColor: p.accentBg, color: p.accent }}>{t}</div><div className="w-0.5 h-3" style={{ backgroundColor: p.border }} /><div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.border }} /></div>)}</div>
  </CodeToggle>);
}

export function StashDemo() {
  const p = usePalette();
  const [stashed, setStashed] = useState(false);
  return (<CodeToggle code={`# git stash 暂存\n# 临时保存未提交的修改\n# 场景: 正在改代码，突然要切分支修 bug\n# git stash → 切分支 → 修完 → git stash pop`}>
    <button onClick={() => setStashed(!stashed)} className="mb-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>{stashed ? "git stash pop" : "git stash"}</button>
    <div className="text-[9px]" style={{ color: stashed ? "#d4a03c" : p.textFaint }}>{stashed ? "📦 修改已暂存，工作区干净" : "工作区有未提交的修改"}</div>
  </CodeToggle>);
}

export function GitignoreDemo() {
  const p = usePalette();
  return (<CodeToggle code={`# .gitignore 文件\n# 告诉 Git 忽略哪些文件\n# 不提交: node_modules, .env, dist\n# 全局忽略: ~/.gitignore_global`}>
    <div className="rounded-[6px] border p-2 font-mono text-[8px] space-y-0.5" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}>
      <div style={{ color: p.textFaint }}># 依赖</div>
      <div>node_modules/</div>
      <div style={{ color: p.textFaint }}># 环境</div>
      <div>.env</div>
      <div style={{ color: p.textFaint }}># 构建</div>
      <div>dist/ .next/</div>
    </div>
  </CodeToggle>);
}

export function PrDemo() {
  const p = usePalette();
  return (<CodeToggle code={`# Pull Request\n# 代码合并请求\n# 包含: 标题、描述、diff、评论\n# Reviewer 审查后 approve/reject\n# CI 自动运行测试`}>
    <div className="rounded-[6px] border p-2 space-y-1" style={{ borderColor: p.border }}>
      <div className="text-[10px] font-medium" style={{ color: p.text }}>feat: 添加暗色模式</div>
      <div className="flex gap-2 text-[8px]" style={{ color: p.textFaint }}><span>+42 -12</span><span>3 files</span><span style={{ color: "#5f8a6b" }}>✓ CI passed</span></div>
      <div className="flex gap-1"><div className="w-4 h-4 rounded-full" style={{ backgroundColor: p.accentBg }} /><span className="text-[8px]" style={{ color: p.textMuted }}>approved by 2 reviewers</span></div>
    </div>
  </CodeToggle>);
}

export function MergeConflictDemo() {
  const p = usePalette();
  const [choice, setChoice] = useState<"ours" | "theirs" | null>(null);
  return (<CodeToggle code={`# 合并冲突解决\n# <<<<<<< HEAD (你的版本)\n# =======\n# >>>>>>> branch (对方版本)\n# 选择: 保留你的 / 保留他的 / 都保留`}>
    {!choice ? <div className="space-y-1"><div onClick={() => setChoice("ours")} className="px-2 py-1 rounded-[4px] text-[9px] cursor-pointer border" style={{ borderColor: p.accent + "40", color: p.accent }}>你的: background: red</div><div onClick={() => setChoice("theirs")} className="px-2 py-1 rounded-[4px] text-[9px] cursor-pointer border" style={{ borderColor: "#5f8a6b40", color: "#5f8a6b" }}>他的: background: blue</div></div> : <div className="text-[9px]" style={{ color: "#5f8a6b" }}>✓ 已选择: {choice === "ours" ? "red" : "blue"}</div>}
  </CodeToggle>);
}

export function RebaseDemo() {
  const p = usePalette();
  const [rebased, setRebased] = useState(false);
  return (<CodeToggle code={`# git rebase 变基\n# 把分支的 commit 「嫁接」到另一个基点\n# 结果: 线性历史 (比 merge 更干净)\n# 注意: 不要 rebase 已 push 的公共分支`}>
    <button onClick={() => setRebased(!rebased)} className="mb-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>{rebased ? "重置" : "git rebase main"}</button>
    <div className="flex items-center gap-0.5">{rebased ? <><div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.border }} /><div className="w-4 h-0.5" style={{ backgroundColor: p.border }} /><div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.border }} /><div className="w-4 h-0.5" style={{ backgroundColor: p.border }} /><div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.accent }} /><div className="w-4 h-0.5" style={{ backgroundColor: p.accent }} /><div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.accent }} /></> : <><div className="flex flex-col items-center"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.border }} /><div className="w-0.5 h-2" style={{ backgroundColor: p.accent }} /><div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.accent }} /></div><div className="w-3 h-0.5" style={{ backgroundColor: p.border }} /><div className="flex flex-col items-center"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.border }} /><div className="w-0.5 h-2" style={{ backgroundColor: "#5f8a6b" }} /><div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#5f8a6b" }} /></div></>}</div>
  </CodeToggle>);
}

export function CommitMsgDemo() {
  const p = usePalette();
  const [msg, setMsg] = useState("");
  const good = /^(feat|fix|docs|style|refactor|test|chore):/.test(msg);
  return (<CodeToggle code={`# 提交信息规范 (Conventional Commits)\n# feat: 新功能\n# fix: 修 bug\n# docs: 文档\n# refactor: 重构\n# 格式: type(scope): description`}>
    <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="feat: 添加登录功能" className="w-full h-7 px-2 rounded-[5px] text-[10px] border outline-none mb-1" style={{ borderColor: msg ? (good ? "#5f8a6b" : "#b85c4a") : p.border, backgroundColor: p.surface, color: p.text }} />
    <div className="text-[8px]" style={{ color: !msg ? p.textFaint : good ? "#5f8a6b" : "#b85c4a" }}>{!msg ? "输入提交信息..." : good ? "✓ 符合规范" : "✗ 需要 type: 前缀 (feat/fix/docs...)"}</div>
  </CodeToggle>);
}

export function ForkDemo() {
  const p = usePalette();
  return (<CodeToggle code={`# Fork 复刻\n# 把别人的仓库复制一份到你的账号\n# 用于: 开源贡献、实验修改\n# 流程: Fork → Clone → 改 → PR\n# 与原仓库保持同步: git fetch upstream`}>
    <div className="flex items-center gap-2 justify-center text-[9px]">
      <Box p={p}>👤 原作者/repo</Box>
      <Arrow p={p} />
      <Box highlight p={p}>👤 你/repo</Box>
    </div>
    <div className="mt-1 text-[8px] text-center" style={{ color: p.textFaint }}>独立副本，可自由修改</div>
  </CodeToggle>);
}

export const vibeGitDemos: Record<string, React.ComponentType> = {
  "vibe-coding-demo": VibeCodingDemo, "prompt-engineering-demo": PromptEngineeringDemo,
  "iteration-demo": IterationDemo, "debug-demo": DebugDemo, "refactor-demo": RefactorDemo,
  "boilerplate-demo": BoilerplateDemo, "stack-demo": StackDemo, "framework-demo": FrameworkDemo,
  "dependency-demo": DependencyDemo, "hot-reload-demo": HotReloadDemo,
  "rules-file-demo": RulesFileDemo, "code-review-demo": CodeReviewDemo,
  "testing-demo": TestingDemo, "documentation-demo": DocumentationDemo,
  "ai-coding-assistant-demo": AiCodingAssistantDemo, "decompose-demo": DecomposeDemo,
  "iterate-demo": IterateDemo, "accept-reject-demo": AcceptRejectDemo,
  "git-demo2": GitDemo2, "merge-demo": MergeDemo, "pull-request-demo": PullRequestDemo,
  "conflict-demo": ConflictDemo, "clone-demo": CloneDemo, "push-pull-demo": PushPullDemo,
  "repository-demo": RepositoryDemo, "remote-demo": RemoteDemo, "tag-demo": TagDemo,
  "stash-demo": StashDemo, "gitignore-demo": GitignoreDemo, "pr-demo": PrDemo,
  "merge-conflict-demo": MergeConflictDemo, "rebase-demo": RebaseDemo,
  "commit-msg-demo": CommitMsgDemo, "fork-demo": ForkDemo,
};
