"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePalette, CodeToggle, MiniBtn, Tag, Box } from "./demo-shared";

export function UiDemo() {
  const p = usePalette();
  const [show, setShow] = useState(true);
  return (<CodeToggle code={`// UI = User Interface 用户界面\n// 用户看到和交互的一切视觉元素\n// 按钮、输入框、颜色、字体、布局\n// 好的 UI = 美观 + 一致 + 可预测`}>
    <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 切换查看 UI 元素组合</p>
    <div className="rounded-[8px] border overflow-hidden" style={{ borderColor: p.border }}>
      <div className="h-6 flex items-center px-2 border-b gap-1" style={{ borderColor: p.border, backgroundColor: p.surface }}><div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#b85c4a" }} /><div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#d4a03c" }} /><div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#5f8a6b" }} /><span className="text-[8px] ml-1" style={{ color: p.textFaint }}>My App</span></div>
      {show && <div className="p-2 space-y-1.5"><div className="h-3 rounded-[3px] w-3/4" style={{ backgroundColor: p.accentBg }} /><div className="h-6 rounded-[5px] border flex items-center px-2 text-[8px]" style={{ borderColor: p.border, color: p.textFaint }}>输入框</div><div className="h-5 rounded-[5px] w-16 flex items-center justify-center text-[8px]" style={{ backgroundColor: p.accent, color: "#fff" }}>按钮</div></div>}
    </div>
    <MiniBtn onClick={() => setShow(!show)} p={p}>{show ? "隐藏内容" : "显示内容"}</MiniBtn>
  </CodeToggle>);
}

export function UxDemo() {
  const p = usePalette();
  const [step, setStep] = useState(0);
  const steps = ["发现需求", "浏览商品", "加入购物车", "结算付款", "收到确认"];
  return (<CodeToggle code={`// UX = User Experience 用户体验\n// 用户使用产品的整体感受\n// 包括: 易用性、效率、满意度\n// UX 设计 = 用户旅程 + 信息架构 + 交互设计`}>
    <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 用户旅程地图</p>
    <div className="flex items-center gap-0.5 flex-wrap">{steps.map((s, i) => <span key={i} className="flex items-center"><span onClick={() => setStep(i)} className="px-1.5 py-1 rounded-[4px] text-[8px] cursor-pointer transition-all" style={{ backgroundColor: i <= step ? p.accentBg : p.surface, color: i <= step ? p.accent : p.textFaint, borderColor: i === step ? p.accent : "transparent", border: "1px solid" }}>{s}</span>{i < steps.length - 1 && <span className="text-[8px] mx-0.5" style={{ color: p.textFaint }}>→</span>}</span>)}</div>
    <div className="mt-1.5 text-[9px]" style={{ color: p.textMuted }}>满意度: {"😊".repeat(step + 1)}{"😐".repeat(4 - step)}</div>
  </CodeToggle>);
}

export function HierarchyDemo() {
  const p = usePalette();
  return (<CodeToggle code={`/* 视觉层级: 引导用户注意力 */\n/* 手段: 大小、颜色、粗细、间距 */\nh1 { font-size: 32px; font-weight: 700; }\nh2 { font-size: 24px; font-weight: 600; }\np  { font-size: 14px; font-weight: 400; }\n/* 最重要的内容 = 最大/最亮/最粗 */`}>
    <div className="space-y-1.5 p-2 rounded-[8px] border" style={{ borderColor: p.border }}>
      <div className="text-[16px] font-bold" style={{ color: p.text }}>主标题 (最重要)</div>
      <div className="text-[12px] font-medium" style={{ color: p.textMuted }}>副标题 (次要)</div>
      <div className="text-[10px]" style={{ color: p.textFaint }}>正文内容 (辅助信息)</div>
      <div className="text-[8px]" style={{ color: p.textFaint, opacity: 0.6 }}>注释/脚注 (最低优先级)</div>
    </div>
  </CodeToggle>);
}

export function ColorTheoryDemo() {
  const p = usePalette();
  const [scheme, setScheme] = useState<"complementary" | "analogous" | "triadic">("complementary");
  const schemes = { complementary: ["#d97757", "#5797d9"], analogous: ["#d97757", "#d9a057", "#d9c957"], triadic: ["#d97757", "#57d977", "#7757d9"] };
  return (<CodeToggle code={`// 配色方案\n// 互补色: 色轮对面 (对比强烈)\n// 类似色: 色轮相邻 (和谐统一)\n// 三角色: 色轮等距 (丰富平衡)\n// 工具: coolors.co, colorhunt.co`}>
    <div className="flex gap-1 mb-2">{(["complementary", "analogous", "triadic"] as const).map(s => <MiniBtn key={s} active={scheme === s} onClick={() => setScheme(s)} p={p}>{s === "complementary" ? "互补" : s === "analogous" ? "类似" : "三角"}</MiniBtn>)}</div>
    <div className="flex gap-2 justify-center">{schemes[scheme].map((c, i) => <div key={i} className="w-10 h-10 rounded-[8px] flex items-end justify-center pb-1 text-[7px] font-mono" style={{ backgroundColor: c, color: "#fff" }}>{c}</div>)}</div>
  </CodeToggle>);
}

export function TypographyDemo() {
  const p = usePalette();
  const [size, setSize] = useState(14);
  return (<CodeToggle code={`/* 字体排版 */\n/* 行高: 1.5-1.8 (正文) */\n/* 字重: 400 正文, 600 标题, 700 强调 */\n/* 字间距: 标题可适当加大 */\n/* 中文: 14-16px, 英文: 16-18px */`}>
    <input type="range" min={10} max={24} value={size} onChange={e => setSize(+e.target.value)} className="w-full mb-2" />
    <div className="rounded-[8px] border p-2 space-y-1" style={{ borderColor: p.border }}>
      <div style={{ fontSize: size, lineHeight: 1.6, color: p.text }}>排版是无声的演讲</div>
      <div className="text-[8px] font-mono" style={{ color: p.textFaint }}>{size}px / line-height: 1.6</div>
    </div>
  </CodeToggle>);
}

export function AccessibilityDemo() {
  const p = usePalette();
  const [fg, setFg] = useState("#4a4840");
  const [bg, setBg] = useState("#faf9f7");
  const contrast = 7.2;
  return (<CodeToggle code={`<!-- 无障碍设计 a11y -->\n<!-- 对比度 >= 4.5:1 (WCAG AA) -->\n<!-- alt 属性描述图片 -->\n<!-- 键盘可导航 (tabindex) -->\n<!-- ARIA 标签辅助屏幕阅读器 -->`}>
    <div className="flex gap-2 mb-2 items-center"><span className="text-[9px]" style={{ color: p.textMuted }}>前景</span><input type="color" value={fg} onChange={e => setFg(e.target.value)} className="w-6 h-6 rounded border-0 cursor-pointer" /><span className="text-[9px]" style={{ color: p.textMuted }}>背景</span><input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-6 h-6 rounded border-0 cursor-pointer" /></div>
    <div className="rounded-[6px] p-2 text-[11px] font-medium" style={{ backgroundColor: bg, color: fg }}>示例文字 Aa</div>
    <div className="mt-1 text-[9px]" style={{ color: contrast >= 4.5 ? "#5f8a6b" : "#b85c4a" }}>{contrast >= 4.5 ? "✓" : "✗"} 对比度 {contrast}:1 {contrast >= 4.5 ? "(WCAG AA 通过)" : "(不达标)"}</div>
  </CodeToggle>);
}

export function LoadingDemo() {
  const p = usePalette();
  const [type, setType] = useState<"spinner" | "dots" | "bar">("spinner");
  return (<CodeToggle code={`/* 加载状态反馈 */\n/* Spinner: 不确定等待时间 */\n/* Progress Bar: 已知进度 */\n/* Skeleton: 内容结构已知 */\n/* 永远给用户反馈！不要白屏 */`}>
    <div className="flex gap-1 mb-3">{(["spinner", "dots", "bar"] as const).map(t => <MiniBtn key={t} active={type === t} onClick={() => setType(t)} p={p}>{t}</MiniBtn>)}</div>
    <div className="h-10 flex items-center justify-center">
      {type === "spinner" && <motion.div className="w-5 h-5 border-2 rounded-full" style={{ borderColor: p.border, borderTopColor: p.accent }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} />}
      {type === "dots" && <div className="flex gap-1">{[0, 1, 2].map(i => <motion.div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: p.accent }} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }} />)}</div>}
      {type === "bar" && <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: p.surface }}><motion.div className="h-full rounded-full" style={{ backgroundColor: p.accent }} animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 1.2 }} /></div>}
    </div>
  </CodeToggle>);
}

export function LayoutDemo() {
  const p = usePalette();
  const [type, setType] = useState<"holy-grail" | "sidebar" | "grid">("holy-grail");
  return (<CodeToggle code={`/* 常见页面布局 */\n/* Holy Grail: header + sidebar + main + footer */\n/* Dashboard: sidebar + content */\n/* Grid: 卡片网格 */\n/* 用 CSS Grid/Flexbox 实现 */`}>
    <div className="flex gap-1 mb-2">{(["holy-grail", "sidebar", "grid"] as const).map(t => <MiniBtn key={t} active={type === t} onClick={() => setType(t)} p={p}>{t}</MiniBtn>)}</div>
    <div className="h-[80px] rounded-[8px] border overflow-hidden p-1 gap-1" style={{ borderColor: p.border, display: "grid", gridTemplateAreas: type === "holy-grail" ? "'h h' 's m' 'f f'" : type === "sidebar" ? "'s m'" : "'a b' 'c d'", gridTemplateColumns: type === "grid" ? "1fr 1fr" : "30px 1fr", gridTemplateRows: type === "holy-grail" ? "14px 1fr 14px" : "1fr" }}>
      {type === "holy-grail" && <><div style={{ gridArea: "h", backgroundColor: p.accentBg }} className="rounded-[3px]" /><div style={{ gridArea: "s", backgroundColor: p.surface }} className="rounded-[3px]" /><div style={{ gridArea: "m", backgroundColor: p.surface }} className="rounded-[3px]" /><div style={{ gridArea: "f", backgroundColor: p.accentBg }} className="rounded-[3px]" /></>}
      {type === "sidebar" && <><div style={{ gridArea: "s", backgroundColor: p.accentBg }} className="rounded-[3px]" /><div style={{ gridArea: "m", backgroundColor: p.surface }} className="rounded-[3px]" /></>}
      {type === "grid" && <>{["a", "b", "c", "d"].map(a => <div key={a} style={{ gridArea: a, backgroundColor: p.surface }} className="rounded-[3px]" />)}</>}
    </div>
  </CodeToggle>);
}

export function ContrastDemo() {
  const p = usePalette();
  const [level, setLevel] = useState(2);
  const levels = [{ ratio: "2:1", pass: false }, { ratio: "4.5:1", pass: true }, { ratio: "7:1", pass: true }];
  const opacities = [0.3, 0.7, 1];
  return (<CodeToggle code={`/* 对比度标准 (WCAG) */\n/* AA: 正文 >= 4.5:1, 大字 >= 3:1 */\n/* AAA: 正文 >= 7:1, 大字 >= 4.5:1 */\n/* 低对比度 = 看不清 = 不可用 */`}>
    <div className="flex gap-1 mb-2">{levels.map((l, i) => <MiniBtn key={i} active={level === i} onClick={() => setLevel(i)} p={p}>{l.ratio}</MiniBtn>)}</div>
    <div className="rounded-[6px] border p-2 text-[12px]" style={{ borderColor: p.border, color: p.text, opacity: opacities[level] }}>这段文字的对比度</div>
    <div className="mt-1 text-[9px]" style={{ color: levels[level].pass ? "#5f8a6b" : "#b85c4a" }}>{levels[level].pass ? "✓ 通过" : "✗ 不通过"} WCAG AA</div>
  </CodeToggle>);
}

export function CardDesignDemo() {
  const p = usePalette();
  const [elev, setElev] = useState(1);
  const shadows = ["none", "0 1px 3px rgba(0,0,0,0.1)", "0 4px 12px rgba(0,0,0,0.1)", "0 8px 24px rgba(0,0,0,0.12)"];
  return (<CodeToggle code={`/* 卡片设计要素 */\n/* 圆角 + 阴影 + 内边距 */\n/* 阴影层级表示「高度」 */\n/* hover 时提升阴影 = 可交互暗示 */`}>
    <div className="flex gap-1 mb-2">{[0, 1, 2, 3].map(i => <MiniBtn key={i} active={elev === i} onClick={() => setElev(i)} p={p}>Level {i}</MiniBtn>)}</div>
    <div className="rounded-[10px] border p-3 transition-all" style={{ borderColor: p.border, backgroundColor: p.isDark ? "#1e1c17" : "#fff", boxShadow: shadows[elev] }}>
      <div className="text-[11px] font-medium mb-1" style={{ color: p.text }}>卡片标题</div>
      <div className="text-[9px]" style={{ color: p.textMuted }}>卡片内容描述文字</div>
    </div>
  </CodeToggle>);
}

export function NavbarDesignDemo() {
  const p = usePalette();
  const [style, setStyle] = useState<"top" | "transparent" | "blur">("top");
  return (<CodeToggle code={`/* 导航栏设计模式 */\n/* 固定顶部: position: sticky */\n/* 透明: 滚动后变实色 */\n/* 毛玻璃: backdrop-filter: blur */`}>
    <div className="flex gap-1 mb-2">{(["top", "transparent", "blur"] as const).map(s => <MiniBtn key={s} active={style === s} onClick={() => setStyle(s)} p={p}>{s}</MiniBtn>)}</div>
    <div className="h-[60px] rounded-[8px] border overflow-hidden relative" style={{ borderColor: p.border }}>
      <div className="absolute top-0 left-0 right-0 h-7 flex items-center px-2 gap-2 z-10" style={{ backgroundColor: style === "transparent" ? "transparent" : style === "blur" ? (p.isDark ? "rgba(13,13,11,0.7)" : "rgba(250,249,247,0.7)") : p.surface, backdropFilter: style === "blur" ? "blur(8px)" : "none", borderBottom: `1px solid ${p.border}` }}><span className="text-[9px] font-bold" style={{ color: p.accent }}>Logo</span><span className="text-[8px] ml-auto" style={{ color: p.textMuted }}>Menu</span></div>
      <div className="p-2 pt-9 space-y-1">{[1, 2, 3].map(i => <div key={i} className="h-3 rounded-[2px]" style={{ backgroundColor: p.surface }} />)}</div>
    </div>
  </CodeToggle>);
}

export function FooterDesignDemo() {
  const p = usePalette();
  return (<CodeToggle code={`/* 页脚设计 */\n/* 多列链接 + 社交图标 + 版权 */\n/* 背景色通常比主体深/浅一级 */\n/* 内容: 关于、帮助、法律、联系 */`}>
    <div className="rounded-[8px] border overflow-hidden" style={{ borderColor: p.border }}>
      <div className="h-8" style={{ backgroundColor: p.surface }} />
      <div className="p-2 border-t grid grid-cols-3 gap-2" style={{ borderColor: p.border, backgroundColor: p.codeBg }}>
        {["产品", "公司", "法律"].map((col, i) => <div key={i}><div className="text-[8px] font-bold mb-0.5" style={{ color: p.textMuted }}>{col}</div><div className="space-y-0.5">{["链接1", "链接2"].map((l, j) => <div key={j} className="text-[7px]" style={{ color: p.textFaint }}>{l}</div>)}</div></div>)}
      </div>
      <div className="px-2 py-1 text-[7px] text-center border-t" style={{ borderColor: p.border, color: p.textFaint }}>© 2024 Company</div>
    </div>
  </CodeToggle>);
}

export function SkeletonDemo() {
  const p = usePalette();
  const [loaded, setLoaded] = useState(false);
  return (<CodeToggle code={`/* 骨架屏: 加载时显示内容轮廓 */\n/* 比 spinner 体验更好 */\n/* 用户能预知内容结构 */\n.skeleton {\n  background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);\n  animation: shimmer 1.5s infinite;\n}`}>
    <MiniBtn onClick={() => setLoaded(!loaded)} p={p}>{loaded ? "模拟加载" : "加载完成"}</MiniBtn>
    <div className="mt-2 flex gap-2">{!loaded ? <><motion.div className="w-8 h-8 rounded-full" style={{ backgroundColor: p.surface }} animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 1.2 }} /><div className="flex-1 space-y-1.5"><motion.div className="h-3 rounded-[3px] w-3/4" style={{ backgroundColor: p.surface }} animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 1.2 }} /><motion.div className="h-3 rounded-[3px] w-1/2" style={{ backgroundColor: p.surface }} animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} /></div></> : <><div className="w-8 h-8 rounded-full" style={{ backgroundColor: p.accentBg }} /><div className="flex-1 space-y-1.5"><div className="h-3 rounded-[3px] w-3/4" style={{ backgroundColor: p.accentBg }} /><div className="h-3 rounded-[3px] w-1/2" style={{ backgroundColor: p.accentBg }} /></div></>}</div>
  </CodeToggle>);
}

export function EmptyStateDemo() {
  const p = usePalette();
  const [empty, setEmpty] = useState(true);
  return (<CodeToggle code={`/* 空状态设计 */\n/* 不要只显示「无数据」 */\n/* 要: 插图 + 说明 + 行动按钮 */\n/* 引导用户下一步操作 */`}>
    <MiniBtn onClick={() => setEmpty(!empty)} p={p}>{empty ? "添加数据" : "清空"}</MiniBtn>
    <div className="mt-2 h-[70px] rounded-[8px] border flex flex-col items-center justify-center" style={{ borderColor: p.border, backgroundColor: p.surface }}>
      {empty ? <><div className="text-[18px] mb-1">📭</div><div className="text-[9px]" style={{ color: p.textFaint }}>还没有内容</div><div className="mt-1 px-2 py-0.5 rounded-[4px] text-[8px]" style={{ backgroundColor: p.accent, color: "#fff" }}>创建第一条</div></> : <div className="text-[9px]" style={{ color: p.textMuted }}>✓ 有数据了</div>}
    </div>
  </CodeToggle>);
}

export function NavbarDemo() {
  const p = usePalette();
  const [active, setActive] = useState(0);
  const items = ["首页", "产品", "关于", "联系"];
  return (<CodeToggle code={`<!-- 导航栏组件 -->\n<nav>\n  <a href="/" class="active">首页</a>\n  <a href="/products">产品</a>\n  <!-- 当前页面高亮 -->\n  <!-- 移动端: 汉堡菜单 -->\n</nav>`}>
    <div className="flex items-center gap-3 p-2 rounded-[8px] border" style={{ borderColor: p.border, backgroundColor: p.surface }}>
      <span className="text-[10px] font-bold" style={{ color: p.accent }}>Brand</span>
      <div className="flex gap-2 ml-auto">{items.map((it, i) => <span key={i} onClick={() => setActive(i)} className="text-[9px] cursor-pointer transition-colors" style={{ color: i === active ? p.accent : p.textMuted, fontWeight: i === active ? 600 : 400 }}>{it}</span>)}</div>
    </div>
  </CodeToggle>);
}

export function SidebarDemo() {
  const p = usePalette();
  const [collapsed, setCollapsed] = useState(false);
  const items = ["🏠 首页", "📊 数据", "⚙️ 设置", "👤 用户"];
  return (<CodeToggle code={`/* 侧边栏 */\n/* 可折叠: 宽 → 窄 (只显示图标) */\n/* 固定定位或 flex 布局 */\n/* 当前项高亮 */`}>
    <MiniBtn onClick={() => setCollapsed(!collapsed)} p={p}>{collapsed ? "展开" : "折叠"}</MiniBtn>
    <div className="mt-2 flex gap-2">
      <motion.div className="rounded-[8px] border p-1.5 space-y-1 overflow-hidden" style={{ borderColor: p.border, backgroundColor: p.surface }} animate={{ width: collapsed ? 32 : 100 }}>
        {items.map((it, i) => <div key={i} className="h-6 rounded-[4px] flex items-center px-1.5 text-[9px] whitespace-nowrap" style={{ backgroundColor: i === 0 ? p.accentBg : "transparent", color: i === 0 ? p.accent : p.textMuted }}>{collapsed ? it.split(" ")[0] : it}</div>)}
      </motion.div>
      <div className="flex-1 rounded-[8px] border" style={{ borderColor: p.border, backgroundColor: p.surface }} />
    </div>
  </CodeToggle>);
}

export function HeaderDemo() {
  const p = usePalette();
  return (<CodeToggle code={`<!-- 页头 Header -->\n<!-- 通常包含: Logo + 导航 + 操作按钮 -->\n<!-- 固定在顶部或随页面滚动 -->\n<header>\n  <Logo />\n  <Navigation />\n  <UserMenu />\n</header>`}>
    <div className="rounded-[8px] border overflow-hidden" style={{ borderColor: p.border }}>
      <div className="h-8 flex items-center px-3 justify-between" style={{ backgroundColor: p.surface, borderBottom: `1px solid ${p.border}` }}>
        <span className="text-[10px] font-bold" style={{ color: p.accent }}>Logo</span>
        <div className="flex gap-2"><span className="text-[8px]" style={{ color: p.textMuted }}>导航</span><div className="w-5 h-5 rounded-full" style={{ backgroundColor: p.accentBg }} /></div>
      </div>
      <div className="h-10 flex items-center justify-center text-[9px]" style={{ color: p.textFaint }}>页面内容区域</div>
    </div>
  </CodeToggle>);
}

export function FooterDemo() {
  const p = usePalette();
  return (<CodeToggle code={`<!-- 页脚 Footer -->\n<footer>\n  <div class="links">...</div>\n  <div class="social">...</div>\n  <p>© 2024 All rights reserved</p>\n</footer>`}>
    <div className="h-10 rounded-[8px] border flex items-center justify-between px-3" style={{ borderColor: p.border, backgroundColor: p.codeBg }}>
      <span className="text-[8px]" style={{ color: p.textFaint }}>© 2024</span>
      <div className="flex gap-1.5">{["🐦", "📧", "🔗"].map((s, i) => <span key={i} className="text-[10px]">{s}</span>)}</div>
    </div>
  </CodeToggle>);
}

export function HeroSectionDemo() {
  const p = usePalette();
  return (<CodeToggle code={`/* Hero Section 首屏大图 */\n/* 目标: 3秒内传达核心价值 */\n/* 结构: 标题 + 副标题 + CTA按钮 */\n/* 可选: 背景图/视频/动画 */`}>
    <div className="h-[80px] rounded-[8px] border flex flex-col items-center justify-center gap-1 relative overflow-hidden" style={{ borderColor: p.border, background: `linear-gradient(135deg, ${p.accentBg}, ${p.surface})` }}>
      <div className="text-[14px] font-bold" style={{ color: p.text }}>你的产品标题</div>
      <div className="text-[9px]" style={{ color: p.textMuted }}>一句话说清价值主张</div>
      <div className="px-3 py-1 rounded-[5px] text-[9px] font-medium" style={{ backgroundColor: p.accent, color: "#fff" }}>立即开始</div>
    </div>
  </CodeToggle>);
}

export function CtaDemo() {
  const p = usePalette();
  const [variant, setVariant] = useState<"primary" | "secondary" | "ghost">("primary");
  const styles = { primary: { bg: p.accent, color: "#fff", border: "none" }, secondary: { bg: "transparent", color: p.accent, border: `1px solid ${p.accent}` }, ghost: { bg: "transparent", color: p.textMuted, border: "none" } };
  return (<CodeToggle code={`/* CTA = Call To Action 行动号召 */\n/* 页面上最重要的按钮 */\n/* 设计: 高对比色 + 大尺寸 + 动词文案 */\n/* "立即注册" > "提交" > "点击这里" */`}>
    <div className="flex gap-1 mb-2">{(["primary", "secondary", "ghost"] as const).map(v => <MiniBtn key={v} active={variant === v} onClick={() => setVariant(v)} p={p}>{v}</MiniBtn>)}</div>
    <div className="flex justify-center"><button className="px-5 py-2 rounded-[7px] text-[11px] font-medium cursor-pointer transition-all" style={styles[variant]}>立即开始 →</button></div>
  </CodeToggle>);
}

export function CardDemo() {
  const p = usePalette();
  const [hovered, setHovered] = useState(false);
  return (<CodeToggle code={`/* 卡片组件 */\n/* 信息容器: 图 + 标题 + 描述 + 操作 */\n/* hover 效果暗示可交互 */\n/* 统一圆角、阴影、内边距 */`}>
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="rounded-[10px] border p-3 transition-all cursor-pointer" style={{ borderColor: hovered ? p.accent : p.border, transform: hovered ? "translateY(-2px)" : "none", boxShadow: hovered ? `0 4px 12px ${p.accent}20` : "none" }}>
      <div className="h-10 rounded-[6px] mb-2" style={{ backgroundColor: p.accentBg }} />
      <div className="text-[11px] font-medium" style={{ color: p.text }}>卡片标题</div>
      <div className="text-[9px] mt-0.5" style={{ color: p.textMuted }}>简短描述文字</div>
    </div>
  </CodeToggle>);
}

export function AccordionDemo() {
  const p = usePalette();
  const [open, setOpen] = useState(0);
  const items = [{ q: "什么是 React?", a: "一个 UI 库" }, { q: "难学吗?", a: "基础概念不难" }, { q: "能做什么?", a: "Web/App/桌面" }];
  return (<CodeToggle code={`/* 折叠面板 Accordion */\n/* 点击展开/收起内容 */\n/* 适合 FAQ、设置分组 */\n/* 同时只开一个 or 多个 */`}>
    <div className="space-y-1">{items.map((it, i) => <div key={i} className="rounded-[6px] border overflow-hidden" style={{ borderColor: open === i ? p.accent + "40" : p.border }}><div onClick={() => setOpen(open === i ? -1 : i)} className="px-2 py-1.5 flex items-center justify-between cursor-pointer text-[10px]" style={{ color: p.text, backgroundColor: open === i ? p.accentBg : "transparent" }}><span>{it.q}</span><span style={{ color: p.textFaint }}>{open === i ? "−" : "+"}</span></div><AnimatePresence>{open === i && <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden"><div className="px-2 py-1.5 text-[9px] border-t" style={{ borderColor: p.border, color: p.textMuted }}>{it.a}</div></motion.div>}</AnimatePresence></div>)}</div>
  </CodeToggle>);
}

export function TabDemo() {
  const p = usePalette();
  const [tab, setTab] = useState(0);
  const tabs = ["概览", "详情", "设置"];
  return (<CodeToggle code={`/* 标签页 Tab */\n/* 同一区域切换不同内容 */\n/* 当前标签高亮 + 下划线 */\n/* 适合: 详情页多视图 */`}>
    <div className="flex border-b mb-2" style={{ borderColor: p.border }}>{tabs.map((t, i) => <button key={i} onClick={() => setTab(i)} className="px-3 py-1.5 text-[10px] cursor-pointer relative transition-colors" style={{ color: tab === i ? p.accent : p.textFaint }}>{t}{tab === i && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: p.accent }} />}</button>)}</div>
    <div className="h-8 rounded-[6px] flex items-center justify-center text-[9px]" style={{ backgroundColor: p.surface, color: p.textMuted }}>{tabs[tab]} 的内容</div>
  </CodeToggle>);
}

export function TooltipDemo() {
  const p = usePalette();
  const [show, setShow] = useState(false);
  return (<CodeToggle code={`/* Tooltip 工具提示 */\n/* 悬停/聚焦时显示简短说明 */\n/* 不要放重要信息（可能看不到） */\n/* 位置: top/bottom/left/right */`}>
    <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 悬停按钮查看提示</p>
    <div className="flex justify-center relative">
      <button onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className="px-3 py-1.5 rounded-[6px] text-[10px] border cursor-pointer" style={{ borderColor: p.border, color: p.textMuted }}>悬停我</button>
      <AnimatePresence>{show && <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} className="absolute -top-7 px-2 py-1 rounded-[5px] text-[9px] whitespace-nowrap" style={{ backgroundColor: p.isDark ? "#333" : "#1a1a1a", color: "#fff" }}>💡 这是提示信息</motion.div>}</AnimatePresence>
    </div>
  </CodeToggle>);
}

export function CopyrightDemo() {
  const p = usePalette();
  const [year, setYear] = useState(new Date().getFullYear());
  return (<CodeToggle code={`<!-- 版权声明 -->\n<footer>\n  <p>&copy; {new Date().getFullYear()} Company Name</p>\n  <!-- 自动更新年份 -->\n  <!-- 可加: 备案号、隐私政策链接 -->\n</footer>`}>
    <div className="rounded-[6px] border p-2 text-center text-[9px]" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textFaint }}>© {year} Liguiyu. All rights reserved. | 粤ICP备XXXXXXXX号</div>
  </CodeToggle>);
}

export function MicroInteractionDemo() {
  const p = usePalette();
  const [liked, setLiked] = useState(false);
  return (<CodeToggle code={`/* 微交互: 细微的动画反馈 */\n/* 点赞心跳、按钮涟漪、开关滑动 */\n/* 让界面「活」起来 */\n/* 原则: 快速、自然、不干扰 */`}>
    <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 点击体验微交互</p>
    <div className="flex gap-4 justify-center items-center">
      <motion.button onClick={() => setLiked(!liked)} className="text-[20px] cursor-pointer border-0 bg-transparent" animate={{ scale: liked ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }}>{liked ? "❤️" : "🤍"}</motion.button>
      <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} className="px-3 py-1.5 rounded-[6px] text-[10px] cursor-pointer" style={{ backgroundColor: p.accent, color: "#fff" }}>点击我</motion.div>
    </div>
  </CodeToggle>);
}

export function DesignSystemDemo() {
  const p = usePalette();
  return (<CodeToggle code={`/* 设计系统 = 组件库 + 设计规范 */\n/* Token: 颜色、间距、圆角、字体 */\n/* 组件: Button, Input, Card... */\n/* 文档: Storybook, Zeroheight */\n/* 目的: 一致性 + 效率 */`}>
    <div className="space-y-2">
      <div><div className="text-[8px] mb-0.5" style={{ color: p.textFaint }}>Colors</div><div className="flex gap-1">{[p.accent, "#5f8a6b", "#4a7fb5", "#d4a03c"].map((c, i) => <div key={i} className="w-6 h-6 rounded-[4px]" style={{ backgroundColor: c }} />)}</div></div>
      <div><div className="text-[8px] mb-0.5" style={{ color: p.textFaint }}>Spacing</div><div className="flex gap-1 items-end">{[4, 8, 12, 16].map((s, i) => <div key={i} className="rounded-[2px]" style={{ width: s, height: s, backgroundColor: p.accentBg }} />)}</div></div>
      <div><div className="text-[8px] mb-0.5" style={{ color: p.textFaint }}>Radius</div><div className="flex gap-1">{[4, 8, 12, 999].map((r, i) => <div key={i} className="w-6 h-6 border" style={{ borderRadius: r, borderColor: p.accent }} />)}</div></div>
    </div>
  </CodeToggle>);
}

export const designDemos: Record<string, React.ComponentType> = {
  "ui-demo": UiDemo, "ux-demo": UxDemo, "hierarchy-demo": HierarchyDemo,
  "color-theory-demo": ColorTheoryDemo, "typography-demo": TypographyDemo,
  "accessibility-demo": AccessibilityDemo, "loading-demo": LoadingDemo,
  "layout-demo": LayoutDemo, "contrast-demo": ContrastDemo,
  "card-design-demo": CardDesignDemo, "navbar-design-demo": NavbarDesignDemo,
  "footer-design-demo": FooterDesignDemo, "skeleton-demo": SkeletonDemo,
  "empty-state-demo": EmptyStateDemo, "navbar-demo": NavbarDemo,
  "sidebar-demo": SidebarDemo, "header-demo": HeaderDemo, "footer-demo": FooterDemo,
  "hero-section-demo": HeroSectionDemo, "cta-demo": CtaDemo, "card-demo": CardDemo,
  "accordion-demo": AccordionDemo, "tab-demo": TabDemo, "tooltip-demo": TooltipDemo,
  "copyright-demo": CopyrightDemo, "micro-interaction-demo": MicroInteractionDemo,
  "design-system-demo": DesignSystemDemo,
};
