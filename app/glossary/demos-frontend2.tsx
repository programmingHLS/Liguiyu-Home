"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePalette, CodeToggle, MiniBtn, Tag, Arrow, Box } from "./demo-shared";

/* SPA - 单页应用路由切换 */
export function SpaDemo() {
  const p = usePalette();
  const [route, setRoute] = useState("/home");
  const pages: Record<string, string> = { "/home": "🏠 首页内容", "/about": "👤 关于页面", "/blog": "📝 博客列表" };
  return (
    <CodeToggle code={`// SPA 路由：不刷新页面，JS 切换内容\nconst Router = () => {\n  const [route, setRoute] = useState('/home');\n  return <div onClick={e => setRoute(e.target.dataset.to)}>\n    {pages[route]}\n  </div>;\n};`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 点击导航——注意地址栏不会刷新</p>
      <div className="flex gap-1 mb-2 border-b pb-2" style={{ borderColor: p.border }}>
        {Object.keys(pages).map(r => <MiniBtn key={r} active={route === r} onClick={() => setRoute(r)} p={p}>{r}</MiniBtn>)}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={route} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="h-12 rounded-[8px] border flex items-center justify-center text-[12px]" style={{ borderColor: p.border, backgroundColor: p.surface, color: p.text }}>
          {pages[route]}
        </motion.div>
      </AnimatePresence>
      <div className="mt-1.5 text-[9px] font-mono" style={{ color: p.textFaint }}>window.location = "{route}" (无刷新)</div>
    </CodeToggle>
  );
}

/* CDN - 全球节点分发 */
export function CdnDemo() {
  const p = usePalette();
  const [node, setNode] = useState(0);
  const nodes = ["🇨🇳 上海 12ms", "🇯🇵 东京 45ms", "🇺🇸 纽约 180ms", "🇩🇪 法兰克福 150ms"];
  return (
    <CodeToggle code={`// CDN 配置\n// 用户请求 → DNS 解析 → 最近节点响应\n// Cloudflare: 300+ 全球节点\n// 静态资源缓存: Cache-Control: max-age=31536000`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 模拟不同地区用户访问同一资源</p>
      <div className="grid grid-cols-2 gap-1.5">
        {nodes.map((n, i) => (
          <div key={i} onClick={() => setNode(i)} className="rounded-[6px] border px-2 py-1.5 text-[10px] cursor-pointer transition-all" style={{ borderColor: node === i ? p.accent : p.border, backgroundColor: node === i ? p.accentBg : p.surface, color: node === i ? p.accent : p.textMuted }}>
            {n}
          </div>
        ))}
      </div>
      <div className="mt-2 text-[9px] text-center" style={{ color: p.textFaint }}>CDN 自动选择最近节点 → 延迟 {nodes[node].match(/\d+/)?.[0]}ms</div>
    </CodeToggle>
  );
}

/* Render - 渲染管线 */
export function RenderDemo() {
  const p = usePalette();
  const [step, setStep] = useState(0);
  const steps = ["HTML 解析", "CSS 计算", "布局 Layout", "绘制 Paint", "合成 Composite"];
  useEffect(() => { const t = setInterval(() => setStep(s => (s + 1) % steps.length), 1200); return () => clearInterval(t); }, []);
  return (
    <CodeToggle code={`// 浏览器渲染管线\n// 1. Parse HTML → DOM Tree\n// 2. Parse CSS → CSSOM\n// 3. Layout (计算位置大小)\n// 4. Paint (填充像素)\n// 5. Composite (合成图层)`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>🔄 自动播放渲染管线各阶段</p>
      <div className="flex items-center gap-0.5 flex-wrap">
        {steps.map((s, i) => (
          <span key={i} className="flex items-center">
            <span className="px-1.5 py-1 rounded-[5px] text-[9px] transition-all" style={{ backgroundColor: i === step ? p.accent : p.surface, color: i === step ? "#fff" : p.textFaint, transform: i === step ? "scale(1.1)" : "scale(1)" }}>{s}</span>
            {i < steps.length - 1 && <Arrow p={p} />}
          </span>
        ))}
      </div>
      <div className="mt-2 h-8 rounded-[6px] border flex items-center justify-center text-[10px]" style={{ borderColor: p.border, backgroundColor: p.surface, color: p.textMuted }}>
        {step < 2 ? "📄 解析中..." : step < 4 ? "🎨 绘制中..." : "✅ 像素上屏！"}
      </div>
    </CodeToggle>
  );
}

/* Media Query - 媒体查询 */
export function MediaQueryDemo() {
  const p = usePalette();
  const [w, setW] = useState(800);
  return (
    <CodeToggle code={`@media (max-width: 768px) {\n  .grid { grid-template-columns: 1fr; }\n}\n@media (min-width: 769px) and (max-width: 1024px) {\n  .grid { grid-template-columns: 1fr 1fr; }\n}\n@media (min-width: 1025px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 拖动滑块模拟不同屏幕宽度</p>
      <input type="range" min={320} max={1400} value={w} onChange={e => setW(+e.target.value)} className="w-full mb-2" />
      <div className="text-[9px] font-mono mb-1.5 text-center" style={{ color: p.accent }}>{w}px {w <= 768 ? "→ 手机" : w <= 1024 ? "→ 平板" : "→ 桌面"}</div>
      <div className="grid gap-1" style={{ gridTemplateColumns: w <= 768 ? "1fr" : w <= 1024 ? "1fr 1fr" : "1fr 1fr 1fr" }}>
        {[1,2,3].map(i => <div key={i} className="h-6 rounded-[4px]" style={{ backgroundColor: p.accentBg }} />)}
      </div>
    </CodeToggle>
  );
}

/* Breakpoint - 断点 */
export function BreakpointDemo() {
  const p = usePalette();
  const bps = [{ name: "sm", px: 640 }, { name: "md", px: 768 }, { name: "lg", px: 1024 }, { name: "xl", px: 1280 }];
  const [active, setActive] = useState(2);
  return (
    <CodeToggle code={`// Tailwind 默认断点\nsm: 640px   // 手机横屏\nmd: 768px   // 平板\nlg: 1024px  // 笔记本\nxl: 1280px  // 桌面`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 点击断点查看布局切换</p>
      <div className="relative h-10 rounded-[6px] border mb-2" style={{ borderColor: p.border, backgroundColor: p.surface }}>
        <div className="absolute top-0 left-0 h-full rounded-[6px] transition-all" style={{ width: `${(bps[active].px / 1400) * 100}%`, backgroundColor: p.accentBg }} />
        {bps.map((b, i) => (
          <div key={i} onClick={() => setActive(i)} className="absolute top-0 h-full flex flex-col items-center justify-center cursor-pointer" style={{ left: `${(b.px / 1400) * 100}%`, transform: "translateX(-50%)" }}>
            <div className="w-0.5 h-full" style={{ backgroundColor: i === active ? p.accent : p.border }} />
            <span className="text-[8px] mt-0.5" style={{ color: i === active ? p.accent : p.textFaint }}>{b.name}</span>
          </div>
        ))}
      </div>
      <div className="text-[9px] text-center" style={{ color: p.textMuted }}>当前激活: <Tag p={p}>{bps[active].name} ≥ {bps[active].px}px</Tag></div>
    </CodeToggle>
  );
}

/* Placeholder - 占位符 */
export function PlaceholderDemo() {
  const p = usePalette();
  const [val, setVal] = useState("");
  return (
    <CodeToggle code={`<input placeholder="请输入邮箱地址" />\n/* placeholder 样式 */\ninput::placeholder {\n  color: #999;\n  font-style: italic;\n}\n/* 注意: placeholder 不是 label！\n   输入内容后 placeholder 消失 */`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 输入内容观察 placeholder 消失</p>
      <div className="space-y-2 max-w-[220px]">
        <input value={val} onChange={e => setVal(e.target.value)} placeholder="请输入邮箱地址..." className="w-full h-8 px-2.5 rounded-[7px] text-[11px] border outline-none" style={{ borderColor: p.border, backgroundColor: p.surface, color: p.text }} />
        <div className="text-[9px]" style={{ color: p.textFaint }}>{val ? `✅ placeholder 已消失，当前值: "${val}"` : "⬆️ placeholder 正在显示（灰色提示文字）"}</div>
      </div>
    </CodeToggle>
  );
}

/* Icon - 图标 */
export function IconDemo() {
  const p = usePalette();
  const [style, setStyle] = useState<"outline" | "filled" | "duotone">("outline");
  const icons = ["🔍", "⚙️", "🏠", "❤️", "📧", "🔔"];
  const styles = { outline: "○", filled: "●", duotone: "◐" };
  return (
    <CodeToggle code={`// SVG Icon 组件\n<Icon name="search" size={24} color="currentColor" />\n// 图标库: Lucide, Heroicons, Phosphor\n// 优势: 矢量无损、可用 CSS 调色、体积小`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 切换图标风格</p>
      <div className="flex gap-1 mb-2">{(["outline", "filled", "duotone"] as const).map(s => <MiniBtn key={s} active={style === s} onClick={() => setStyle(s)} p={p}>{s}</MiniBtn>)}</div>
      <div className="grid grid-cols-6 gap-2">
        {icons.map((ic, i) => (
          <div key={i} className="h-9 rounded-[6px] border flex items-center justify-center text-[16px] transition-all" style={{ borderColor: p.border, backgroundColor: p.surface, filter: style === "outline" ? "grayscale(1) opacity(0.7)" : style === "duotone" ? "saturate(0.5)" : "none" }}>{ic}</div>
        ))}
      </div>
      <div className="mt-1.5 text-[9px]" style={{ color: p.textFaint }}>风格: {styles[style]} {style} — 同一图标不同视觉重量</div>
    </CodeToggle>
  );
}

/* Favicon - 网站图标 */
export function FaviconDemo() {
  const p = usePalette();
  const [icon, setIcon] = useState("🚀");
  const icons = ["🚀", "💎", "", "", "🌟"];
  return (
    <CodeToggle code={`<!-- HTML head 中声明 favicon -->\n<link rel="icon" href="/favicon.ico" sizes="32x32">\n<link rel="apple-touch-icon" href="/icon-180.png">\n<!-- 现代浏览器支持 SVG favicon -->\n<link rel="icon" type="image/svg+xml" href="/icon.svg">`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 选择图标查看标签页效果</p>
      <div className="flex gap-1 mb-2">{icons.map(ic => <button key={ic} onClick={() => setIcon(ic)} className="w-7 h-7 rounded-[5px] border text-[14px] cursor-pointer transition-all" style={{ borderColor: icon === ic ? p.accent : p.border, backgroundColor: icon === ic ? p.accentBg : "transparent" }}>{ic}</button>)}</div>
      <div className="rounded-t-[8px] border border-b-0 px-3 py-1.5 flex items-center gap-2 max-w-[180px]" style={{ borderColor: p.border, backgroundColor: p.surface }}>
        <span className="text-[12px]">{icon}</span>
        <span className="text-[10px] truncate" style={{ color: p.textMuted }}>My Website</span>
        <span className="text-[10px] ml-auto" style={{ color: p.textFaint }}>×</span>
      </div>
      <div className="h-6 rounded-b-[8px] border border-t-0" style={{ borderColor: p.border, backgroundColor: p.codeBg }} />
    </CodeToggle>
  );
}

/* SEO - 搜索引擎优化 */
export function SeoDemo() {
  const p = usePalette();
  const [title, setTitle] = useState("我的网站");
  const score = Math.min(100, title.length * 8 + (title.includes("关键词") ? 30 : 0));
  return (
    <CodeToggle code={`<!-- SEO 关键 meta 标签 -->\n<title>关键词 - 品牌名 | 描述</title>\n<meta name="description" content="150字以内的页面描述">\n<meta name="keywords" content="关键词1,关键词2">\n<!-- Open Graph 社交分享 -->\n<meta property="og:title" content="分享标题">\n<meta property="og:image" content="分享图片">`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 编辑标题查看 SEO 评分变化</p>
      <input value={title} onChange={e => setTitle(e.target.value)} className="w-full h-7 px-2 rounded-[5px] text-[10px] border outline-none mb-2" style={{ borderColor: p.border, backgroundColor: p.surface, color: p.text }} />
      <div className="rounded-[8px] border p-2 space-y-1" style={{ borderColor: p.border }}>
        <div className="text-[11px] font-medium" style={{ color: "#1a73e8" }}>{title || "页面标题"}</div>
        <div className="text-[9px]" style={{ color: p.textFaint }}>liguiyu.com › page</div>
        <div className="text-[9px]" style={{ color: p.textMuted }}>这是搜索结果的描述摘要文字...</div>
      </div>
      <div className="mt-1.5 flex items-center gap-2">
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: p.surface }}><div className="h-full rounded-full transition-all" style={{ width: `${score}%`, backgroundColor: score > 70 ? "#5f8a6b" : score > 40 ? "#d4a03c" : "#b85c4a" }} /></div>
        <span className="text-[9px] font-mono" style={{ color: p.textMuted }}>{score}/100</span>
      </div>
    </CodeToggle>
  );
}

/* Breadcrumb - 面包屑导航 */
export function BreadcrumbDemo() {
  const p = usePalette();
  const [path, setPath] = useState(["首页", "产品", "手机", "iPhone 16"]);
  return (
    <CodeToggle code={`<!-- 面包屑导航 HTML -->\n<nav aria-label="breadcrumb">\n  <ol>\n    <li><a href="/">首页</a></li>\n    <li><a href="/products">产品</a></li>\n    <li aria-current="page">iPhone 16</li>\n  </ol>\n</nav>`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 点击面包屑层级跳转</p>
      <div className="flex items-center gap-1 flex-wrap mb-3 p-2 rounded-[8px] border" style={{ borderColor: p.border, backgroundColor: p.surface }}>
        {path.map((seg, i) => (
          <span key={i} className="flex items-center gap-1">
            <span onClick={() => setPath(path.slice(0, i + 1))} className="text-[10px] cursor-pointer transition-colors" style={{ color: i === path.length - 1 ? p.text : p.accent }}>{seg}</span>
            {i < path.length - 1 && <span className="text-[9px]" style={{ color: p.textFaint }}>/</span>}
          </span>
        ))}
      </div>
      <div className="flex gap-1 flex-wrap">
        {["配件", "保护壳", "充电器"].map(item => <MiniBtn key={item} onClick={() => setPath([...path, item])} p={p}>进入: {item}</MiniBtn>)}
      </div>
    </CodeToggle>
  );
}

/* Lazy Load - 懒加载 */
export function LazyLoadDemo() {
  const p = usePalette();
  const [loaded, setLoaded] = useState<boolean[]>([true, true, false, false, false, false]);
  return (
    <CodeToggle code={`<!-- 图片懒加载 -->\n<img src="photo.jpg" loading="lazy" />\n\n// Intersection Observer API\nconst observer = new IntersectionObserver(entries => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      entry.target.src = entry.target.dataset.src;\n    }\n  });\n});`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 滚动查看图片逐步加载</p>
      <div className="h-[120px] overflow-y-auto rounded-[8px] border p-2 space-y-2" style={{ borderColor: p.border }} onScroll={e => { const st = (e.target as HTMLDivElement).scrollTop; setLoaded(loaded.map((_, i) => i < 2 + Math.floor(st / 30))); }}>
        {loaded.map((l, i) => (
          <div key={i} className="h-8 rounded-[5px] flex items-center justify-center text-[9px] transition-all duration-500" style={{ backgroundColor: l ? p.accentBg : p.surface, color: l ? p.accent : p.textFaint }}>
            {l ? `🖼️ 图片 ${i + 1} 已加载` : `⏳ 图片 ${i + 1} 等待中...`}
          </div>
        ))}
      </div>
    </CodeToggle>
  );
}

/* TypeScript - 类型检查 */
export function TypescriptDemo() {
  const p = usePalette();
  const [typed, setTyped] = useState(true);
  return (
    <CodeToggle code={`// TypeScript 类型标注\ninterface User {\n  name: string;\n  age: number;\n  email: string;\n}\n\nfunction greet(user: User): string {\n  return \`Hello, \${user.name}!\`;\n}\n\n// ❌ greet({ name: 123 }) → 编译报错\n// ✅ greet({ name: "Li", age: 25, email: "a@b.c" })`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 切换有无类型检查</p>
      <div className="flex gap-1 mb-2"><MiniBtn active={typed} onClick={() => setTyped(true)} p={p}>TypeScript ✓</MiniBtn><MiniBtn active={!typed} onClick={() => setTyped(false)} p={p}>JavaScript</MiniBtn></div>
      <div className="rounded-[8px] border p-2 font-mono text-[10px] space-y-1" style={{ borderColor: p.border, backgroundColor: p.codeBg }}>
        <div style={{ color: p.textMuted }}>const age = <span style={{ color: typed ? "#5f8a6b" : p.textMuted }}>"twenty"</span>;</div>
        <div style={{ color: p.textMuted }}>const sum = age + <span style={{ color: "#d4a03c" }}>1</span>;</div>
        {typed && <div className="mt-1 px-1.5 py-1 rounded-[4px] text-[9px]" style={{ backgroundColor: "rgba(184,92,74,0.1)", color: "#b85c4a" }}>❌ TS2365: Operator '+' cannot be applied to types 'string' and 'number'</div>}
        {!typed && <div className="mt-1 px-1.5 py-1 rounded-[4px] text-[9px]" style={{ backgroundColor: "rgba(212,160,60,0.1)", color: "#d4a03c" }}>⚠️ 运行时: sum = "twenty1" (非预期！)</div>}
      </div>
    </CodeToggle>
  );
}

/* Next.js - 文件路由 */
export function NextjsDemo() {
  const p = usePalette();
  const [file, setFile] = useState("page.tsx");
  const routes: Record<string, string> = { "page.tsx": "/", "about/page.tsx": "/about", "blog/[slug]/page.tsx": "/blog/hello" };
  return (
    <CodeToggle code={`// Next.js App Router 文件路由\napp/\n├── page.tsx          → /\n├── about/\n│   └── page.tsx      → /about\n├── blog/\n│   └── [slug]/\n│       └── page.tsx  → /blog/:slug\n└── api/\n    └── users/\n        └── route.ts  → /api/users`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 点击文件查看对应路由</p>
      <div className="font-mono text-[9px] space-y-0.5 p-2 rounded-[8px] border" style={{ borderColor: p.border, backgroundColor: p.codeBg }}>
        {Object.keys(routes).map(f => (
          <div key={f} onClick={() => setFile(f)} className="px-1.5 py-1 rounded-[4px] cursor-pointer transition-all flex justify-between" style={{ backgroundColor: file === f ? p.accentBg : "transparent", color: file === f ? p.accent : p.textMuted }}>
            <span>📄 {f}</span><span className="opacity-60">{routes[f]}</span>
          </div>
        ))}
      </div>
    </CodeToggle>
  );
}

/* NPM - 包管理 */
export function NpmDemo() {
  const p = usePalette();
  const [step, setStep] = useState(0);
  const steps = ["npm install react", "📦 解析依赖树", "⬇️ 下载包", "📁 写入 node_modules", "✅ 完成！"];
  return (
    <CodeToggle code={`# 常用 npm 命令\nnpm install <pkg>     # 安装包\nnpm install -D <pkg>  # 开发依赖\nnpx <cmd>             # 临时执行\nnpm run <script>      # 运行脚本\nnpm outdated          # 检查更新`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 模拟 npm install 流程</p>
      <div className="space-y-1">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-[10px] transition-all" style={{ color: i <= step ? p.text : p.textFaint, opacity: i <= step ? 1 : 0.4 }}>
            <span>{i < step ? "✓" : i === step ? "▶" : "○"}</span>
            <span className="font-mono">{s}</span>
          </div>
        ))}
      </div>
      <button onClick={() => setStep(s => s < steps.length - 1 ? s + 1 : 0)} className="mt-2 px-3 py-1 rounded-[5px] text-[10px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>{step < steps.length - 1 ? "下一步" : "重新开始"}</button>
    </CodeToggle>
  );
}

/* Props - 属性传递 */
export function PropsDemo() {
  const p = usePalette();
  const [color, setColor] = useState("accent");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const sizes = { sm: "h-6 text-[9px]", md: "h-8 text-[11px]", lg: "h-10 text-[13px]" };
  return (
    <CodeToggle code={`// 父组件传递 Props\n<Button color="accent" size="lg">点击</Button>\n\n// 子组件接收 Props\nfunction Button({ color, size, children }) {\n  return <button className={\`btn-\${color} btn-\${size}\`}>\n    {children}\n  </button>;\n}`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 修改 Props 看子组件变化</p>
      <div className="flex gap-2 mb-2">
        <div className="space-y-1"><div className="text-[8px]" style={{ color: p.textFaint }}>color</div><div className="flex gap-0.5">{["accent", "green", "blue"].map(c => <MiniBtn key={c} active={color === c} onClick={() => setColor(c)} p={p}>{c}</MiniBtn>)}</div></div>
        <div className="space-y-1"><div className="text-[8px]" style={{ color: p.textFaint }}>size</div><div className="flex gap-0.5">{(["sm", "md", "lg"] as const).map(s => <MiniBtn key={s} active={size === s} onClick={() => setSize(s)} p={p}>{s}</MiniBtn>)}</div></div>
      </div>
      <div className="text-[8px] mb-1 font-mono" style={{ color: p.textFaint }}>{`<Button color="${color}" size="${size}">`}</div>
      <div className={`rounded-[7px] flex items-center justify-center px-4 font-medium transition-all ${sizes[size]}`} style={{ backgroundColor: color === "accent" ? p.accent : color === "green" ? "#5f8a6b" : "#4a7fb5", color: "#fff" }}>Button</div>
    </CodeToggle>
  );
}

/* Hooks - 钩子函数 */
export function HooksDemo() {
  const p = usePalette();
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  useEffect(() => { if (mounted) { setLog(l => [...l, `render: count=${count}`]); } }, [count, mounted]);
  useEffect(() => { if (mounted) { setLog(l => [...l, "useEffect: mounted!"]); return () => setLog(l => [...l, "cleanup: unmounted!"]); } }, [mounted]);
  return (
    <CodeToggle code={`function Counter() {\n  const [count, setCount] = useState(0);\n  \n  useEffect(() => {\n    console.log('mounted / count changed');\n    return () => console.log('cleanup');\n  }, [count]);\n  \n  return <button onClick={() => setCount(c+1)}>{count}</button>;\n}`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 挂载/卸载组件观察 Hook 生命周期</p>
      <div className="flex gap-2 mb-2">
        <MiniBtn active={mounted} onClick={() => setMounted(!mounted)} p={p}>{mounted ? "卸载组件" : "挂载组件"}</MiniBtn>
        {mounted && <MiniBtn onClick={() => setCount(c => c + 1)} p={p}>count++ ({count})</MiniBtn>}
      </div>
      <div className="h-[60px] overflow-y-auto rounded-[6px] border p-1.5 font-mono text-[8px] space-y-0.5" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}>
        {log.slice(-5).map((l, i) => <div key={i}>› {l}</div>)}
      </div>
    </CodeToggle>
  );
}

/* JSX - JavaScript XML */
export function JsxDemo() {
  const p = usePalette();
  const [name, setName] = useState("World");
  return (
    <CodeToggle code={`// JSX = JavaScript + XML 语法糖\nfunction Greeting({ name }) {\n  return (\n    <div className="card">\n      <h1>Hello, {name}!</h1>\n      {name.length > 5 && <p>Long name!</p>}\n    </div>\n  );\n}\n// 编译后: React.createElement("div", ...)`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 修改变量看 JSX 动态渲染</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-[6px] border p-2 font-mono text-[9px]" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}>
          <div>{"<h1>Hello, {"}<span style={{ color: p.accent }}>{name || "???"}</span>{"}!</h1>"}</div>
          {name.length > 5 && <div style={{ color: "#5f8a6b" }}>{"<p>Long name!</p>"}</div>}
        </div>
        <div className="rounded-[6px] border p-2" style={{ borderColor: p.border, backgroundColor: p.surface }}>
          <div className="text-[12px] font-bold" style={{ color: p.text }}>Hello, {name || "???"}!</div>
          {name.length > 5 && <div className="text-[9px]" style={{ color: p.textMuted }}>Long name!</div>}
        </div>
      </div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="输入名字" className="mt-2 w-full h-7 px-2 rounded-[5px] text-[10px] border outline-none" style={{ borderColor: p.border, backgroundColor: p.surface, color: p.text }} />
    </CodeToggle>
  );
}

/* Virtual DOM - 虚拟 DOM */
export function VirtualDomDemo() {
  const p = usePalette();
  const [items, setItems] = useState(["A", "B", "C"]);
  const [diff, setDiff] = useState<string[]>([]);
  const update = (newItems: string[]) => {
    const changes: string[] = [];
    const maxLen = Math.max(items.length, newItems.length);
    for (let i = 0; i < maxLen; i++) {
      if (i >= items.length) changes.push(`+ 新增 [${i}]`);
      else if (i >= newItems.length) changes.push(`- 删除 [${i}]`);
      else if (items[i] !== newItems[i]) changes.push(`~ 更新 [${i}]`);
    }
    setDiff(changes);
    setItems(newItems);
  };
  return (
    <CodeToggle code={`// Virtual DOM Diff 算法\n// 1. 新 state → 新 VDOM tree\n// 2. 对比新旧 VDOM (diff)\n// 3. 只把差异 patch 到真实 DOM\n// 比直接操作 DOM 快 10-100 倍`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 修改列表观察 Diff 结果</p>
      <div className="flex gap-1 mb-2 flex-wrap">
        <MiniBtn onClick={() => update(["A", "B", "C", "D"])} p={p}>+添加</MiniBtn>
        <MiniBtn onClick={() => update(items.slice(0, -1))} p={p}>-删除</MiniBtn>
        <MiniBtn onClick={() => update(["X", ...items.slice(1)])} p={p}>改首项</MiniBtn>
        <MiniBtn onClick={() => update(["A", "B", "C"])} p={p}>重置</MiniBtn>
      </div>
      <div className="flex gap-2">
        <div className="flex gap-1">{items.map((it, i) => <div key={i} className="w-6 h-6 rounded-[4px] border flex items-center justify-center text-[9px]" style={{ borderColor: p.border, color: p.textMuted }}>{it}</div>)}</div>
        <div className="text-[8px] font-mono space-y-0.5" style={{ color: p.accent }}>{diff.map((d, i) => <div key={i}>{d}</div>)}</div>
      </div>
    </CodeToggle>
  );
}

/* SSR - 服务端渲染 */
export function SsrDemo() {
  const p = usePalette();
  const [mode, setMode] = useState<"ssr" | "csr">("ssr");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(false);
  const simulate = (m: "ssr" | "csr") => { setMode(m); setLoading(true); setContent(false); setTimeout(() => { if (m === "ssr") { setContent(true); setTimeout(() => setLoading(false), 300); } else { setLoading(false); setTimeout(() => setContent(true), 800); } }, m === "ssr" ? 500 : 200); };
  return (
    <CodeToggle code={`// SSR: 服务器生成完整 HTML\n// 用户看到内容快，SEO 友好\n// Next.js getServerSideProps\n\n// CSR: 浏览器下载 JS 后渲染\n// 首屏白屏，但交互更灵活\n// Create React App 默认模式`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 对比两种渲染模式的首屏体验</p>
      <div className="flex gap-1 mb-2"><MiniBtn active={mode === "ssr"} onClick={() => simulate("ssr")} p={p}>SSR</MiniBtn><MiniBtn active={mode === "csr"} onClick={() => simulate("csr")} p={p}>CSR</MiniBtn></div>
      <div className="h-14 rounded-[8px] border flex items-center justify-center text-[10px] transition-all" style={{ borderColor: p.border, backgroundColor: p.surface }}>
        {loading ? <span style={{ color: p.textFaint }}>{mode === "csr" ? "⬜ 白屏（下载 JS 中...）" : "⏳ 服务器渲染中..."}</span> : content ? <span style={{ color: "#5f8a6b" }}>✅ 内容已显示{mode === "ssr" ? "（含 HTML）" : "（JS 渲染）"}</span> : <span style={{ color: p.textFaint }}>点击 SSR/CSR 开始</span>}
      </div>
    </CodeToggle>
  );
}

/* CSR - 客户端渲染 */
export function CsrDemo() {
  const p = usePalette();
  const [phase, setPhase] = useState(0);
  const phases = ["请求 HTML", "收到空壳 + JS", "下载 JS bundle", "执行 JS", "渲染内容"];
  useEffect(() => { if (phase > 0 && phase < phases.length) { const t = setTimeout(() => setPhase(p => p + 1), 600); return () => clearTimeout(t); } }, [phase]);
  return (
    <CodeToggle code={`// CSR 加载时序\n// 1. Browser → Server: GET /\n// 2. Server → Browser: <div id="root"></div> + <script>\n// 3. Browser: 下载 JS bundle\n// 4. Browser: 执行 React/Vue\n// 5. Browser: 渲染 UI 到 #root`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 观察 CSR 加载各阶段</p>
      <button onClick={() => setPhase(1)} className="mb-2 px-3 py-1 rounded-[5px] text-[10px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>{phase === 0 ? "开始加载" : "重新模拟"}</button>
      <div className="space-y-1">
        {phases.map((ph, i) => (
          <div key={i} className="flex items-center gap-2 text-[9px] transition-all" style={{ color: i < phase ? p.text : p.textFaint, opacity: i < phase ? 1 : 0.3 }}>
            <span>{i < phase - 1 ? "✓" : i === phase - 1 ? "▶" : "○"}</span>
            <span>{ph}</span>
            {i === phase - 1 && <span className="animate-pulse" style={{ color: p.accent }}>...</span>}
          </div>
        ))}
      </div>
    </CodeToggle>
  );
}

/* Vite - 构建工具 */
export function ViteDemo() {
  const p = usePalette();
  const [tool, setTool] = useState<"vite" | "webpack">("vite");
  const speeds = { vite: { dev: 0.3, hmr: 0.05 }, webpack: { dev: 8, hmr: 2 } };
  return (
    <CodeToggle code={`// Vite 核心优势\n// 开发: 原生 ESM，无需打包，按需编译\n// HMR: 修改文件 → 50ms 内热更新\n// 构建: Rollup 打包，Tree Shaking\n\n// vs Webpack\n// 开发: 先打包所有文件再启动 (慢)\n// HMR: 重新编译受影响模块 (秒级)`}>
      <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 对比启动和 HMR 速度</p>
      <div className="flex gap-1 mb-2"><MiniBtn active={tool === "vite"} onClick={() => setTool("vite")} p={p}>⚡ Vite</MiniBtn><MiniBtn active={tool === "webpack"} onClick={() => setTool("webpack")} p={p}>📦 Webpack</MiniBtn></div>
      <div className="space-y-2">
        <div><div className="flex justify-between text-[9px] mb-0.5"><span style={{ color: p.textMuted }}>dev 启动</span><span style={{ color: p.accent }}>{speeds[tool].dev}s</span></div><div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: p.surface }}><motion.div className="h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${(speeds[tool].dev / 10) * 100}%` }} style={{ backgroundColor: p.accent }} /></div></div>
        <div><div className="flex justify-between text-[9px] mb-0.5"><span style={{ color: p.textMuted }}>HMR 更新</span><span style={{ color: p.accent }}>{speeds[tool].hmr * 1000}ms</span></div><div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: p.surface }}><motion.div className="h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${(speeds[tool].hmr / 3) * 100}%` }} style={{ backgroundColor: "#5f8a6b" }} /></div></div>
      </div>
    </CodeToggle>
  );
}

export const frontendDemos: Record<string, React.ComponentType> = {
  "spa-demo": SpaDemo, "cdn-demo": CdnDemo, "render-demo": RenderDemo,
  "media-query-demo": MediaQueryDemo, "breakpoint-demo": BreakpointDemo,
  "placeholder-demo": PlaceholderDemo, "icon-demo": IconDemo, "favicon-demo": FaviconDemo,
  "seo-demo": SeoDemo, "breadcrumb-demo": BreadcrumbDemo, "lazy-load-demo": LazyLoadDemo,
  "typescript-demo": TypescriptDemo, "nextjs-demo": NextjsDemo, "npm-demo": NpmDemo,
  "props-demo": PropsDemo, "hooks-demo": HooksDemo, "jsx-demo": JsxDemo,
  "virtual-dom-demo": VirtualDomDemo, "ssr-demo": SsrDemo, "csr-demo": CsrDemo,
  "vite-demo": ViteDemo,
};
