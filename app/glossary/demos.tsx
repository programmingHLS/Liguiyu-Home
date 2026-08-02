"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../components/ThemeProvider";
import { frontendDemos } from "./demos-frontend2";
import { backendDemos } from "./demos-backend";
import { designDemos } from "./demos-design";
import { aiDemos } from "./demos-ai";
import { vibeGitDemos } from "./demos-vibegit";
import { devopsDemos } from "./demos-devops";

/* 主题感知 hook：返回当前主题下的常用色值 */
function usePalette() {
  const { resolved } = useTheme();
  const isDark = resolved === "dark";
  return {
    isDark,
    accent: isDark ? "#e8957a" : "#d97757",
    accentBg: isDark ? "rgba(232,149,122,0.1)" : "rgba(217,119,87,0.08)",
    accentBorder: isDark ? "rgba(232,149,122,0.2)" : "rgba(217,119,87,0.18)",
    text: isDark ? "#d6d5cd" : "#4a4840",
    textMuted: isDark ? "#98978f" : "#7d7b72",
    textFaint: isDark ? "rgba(152,151,143,0.6)" : "rgba(125,123,114,0.65)",
    border: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
    surface: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
    codeBg: isDark ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.03)",
  };
}

/* ═══════════════════════════════════════════
   通用代码切换组件
   ═══════════════════════════════════════════ */
function CodeToggle({ code, children, label = "查看源代码" }: { code: string; children: React.ReactNode; label?: string }) {
  const p = usePalette();
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="space-y-3">
      <button
        onClick={() => setShowCode(!showCode)}
        className="px-3 py-1.5 rounded-[7px] text-[11px] font-medium border transition-all cursor-pointer"
        style={{ borderColor: p.accentBorder, color: p.accent, backgroundColor: showCode ? p.accentBg : "transparent" }}
      >
        {showCode ? "🎮 回到交互" : `📝 ${label}`}
      </button>
      <AnimatePresence mode="wait">
        {showCode ? (
          <motion.pre
            key="code"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="rounded-[10px] p-3.5 text-[11.5px] font-mono overflow-x-auto border leading-[1.7] whitespace-pre-wrap"
            style={{ backgroundColor: p.codeBg, borderColor: p.border, color: p.textMuted }}
          >
            {code}
          </motion.pre>
        ) : (
          <motion.div key="interactive" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Hover 演示
   ═══════════════════════════════════════════ */
export function HoverDemo() {
  const p = usePalette();
  const [hovered, setHovered] = useState<number | null>(null);

  const code = `/* CSS: hover 伪类 */
.button:hover {
  background-color: #d97757;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(217,119,87,0.3);
}

.card:hover {
  transform: scale(1.08);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

/* 配合 transition 实现平滑过渡 */
.button, .card {
  transition: all 0.3s ease;
}`;

  return (
    <CodeToggle code={code} label="查看 CSS 代码">
      <p className="text-[12px] mb-2" style={{ color: p.textFaint }}>👇 把鼠标移到下面的按钮/卡片上试试</p>
      <div className="flex flex-wrap gap-3">
        <button
          onMouseEnter={() => setHovered(0)}
          onMouseLeave={() => setHovered(null)}
          className="px-4 py-2 rounded-[9px] text-[13px] font-medium transition-all duration-300 border cursor-pointer"
          style={{
            backgroundColor: hovered === 0 ? p.accent : "transparent",
            color: hovered === 0 ? "#fff" : p.text,
            borderColor: hovered === 0 ? p.accent : p.border,
            transform: hovered === 0 ? "translateY(-2px)" : "none",
            boxShadow: hovered === 0 ? `0 4px 14px rgba(217,119,87,${p.isDark ? 0.25 : 0.3})` : "none",
          }}
        >
          变色 + 上浮
        </button>
        <div
          onMouseEnter={() => setHovered(1)}
          onMouseLeave={() => setHovered(null)}
          className="px-4 py-2 rounded-[9px] text-[13px] border transition-all duration-300 cursor-pointer select-none"
          style={{
            transform: hovered === 1 ? "scale(1.08)" : "scale(1)",
            boxShadow: hovered === 1 ? `0 8px 24px rgba(0,0,0,${p.isDark ? 0.4 : 0.12})` : `0 1px 3px rgba(0,0,0,${p.isDark ? 0.3 : 0.08})`,
            borderColor: hovered === 1 ? p.accent : p.border,
            color: p.text,
          }}
        >
          放大 + 阴影
        </div>
        <div
          onMouseEnter={() => setHovered(2)}
          onMouseLeave={() => setHovered(null)}
          className="px-4 py-2 rounded-[9px] text-[13px] border relative cursor-pointer select-none"
          style={{ borderColor: p.border, color: p.text }}
        >
          悬停显示提示
          <span
            className="absolute -top-9 left-1/2 px-2.5 py-1.5 rounded-[7px] text-[11px] whitespace-nowrap transition-all duration-200 font-medium"
            style={{
              backgroundColor: p.isDark ? "#2c2a25" : "#3d3a34",
              color: "#f0efe9",
              opacity: hovered === 2 ? 1 : 0,
              transform: `translateX(-50%) translateY(${hovered === 2 ? "0" : "4px"})`,
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            我是 Tooltip 💡
          </span>
        </div>
      </div>
      <p className="text-[11.5px] mt-2" style={{ color: hovered !== null ? p.accent : p.textFaint }}>
        {hovered !== null ? "✅ 你正在触发 hover 效果！" : "鼠标移上去就能触发 hover"}
      </p>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   响应式演示
   ═══════════════════════════════════════════ */
export function ResponsiveDemo() {
  const p = usePalette();
  const [width, setWidth] = useState(100);
  const cols = width > 75 ? 3 : width > 45 ? 2 : 1;
  const device = width > 75 ? "🖥️ 桌面端" : width > 45 ? "📱 平板" : "📲 手机";

  const code = `/* CSS 媒体查询：根据屏幕宽度切换布局 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 默认3列 */
  gap: 16px;
}

/* 平板：≤768px 变2列 */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 手机：≤480px 变1列 */
@media (max-width: 480px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}`;

  return (
    <CodeToggle code={code} label="查看响应式代码">
      <div className="flex items-center gap-3">
        <span className="text-[12px] whitespace-nowrap" style={{ color: p.textFaint }}>拖动改变宽度：</span>
        <input
          type="range"
          min={25}
          max={100}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="flex-1 h-[5px] rounded-full appearance-none cursor-pointer"
          style={{ background: `linear-gradient(to right, ${p.accent} ${((width - 25) / 75) * 100}%, ${p.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} ${((width - 25) / 75) * 100}%)` }}
        />
        <span className="text-[11px] font-mono w-9 text-right" style={{ color: p.textMuted }}>{width}%</span>
      </div>
      <div className="flex justify-center mt-3">
        <div
          className="border rounded-[12px] p-3 transition-all duration-300 overflow-hidden"
          style={{ width: `${width}%`, borderColor: p.border, minWidth: "120px", backgroundColor: p.surface }}
        >
          <div className="text-[10px] text-center mb-2 font-semibold" style={{ color: p.accent }}>{device}</div>
          <div className="grid gap-2 transition-all duration-300" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-[8px] p-2 text-center text-[10px]" style={{ backgroundColor: p.accentBg, border: `1px solid ${p.accentBorder}`, color: p.textMuted }}>
                卡片 {i}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-[11.5px] mt-2" style={{ color: p.textFaint }}>同一份代码，容器变窄时自动从 3 列变成 {cols} 列——这就是响应式</p>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   API 演示
   ═══════════════════════════════════════════ */
export function ApiDemo() {
  const p = usePalette();
  const [step, setStep] = useState<"idle" | "sending" | "waiting" | "done">("idle");
  const [result, setResult] = useState("");

  const sendRequest = () => {
    setStep("sending");
    setResult("");
    setTimeout(() => setStep("waiting"), 400);
    setTimeout(() => {
      setStep("done");
      setResult(JSON.stringify({ status: 200, data: { name: "李桂聿", role: "全栈开发" } }, null, 2));
    }, 1500);
  };

  const code = `// JavaScript: 发送 API 请求
async function getUserProfile() {
  const response = await fetch('/api/user/profile');
  const data = await response.json();
  console.log(data);
  // → { status: 200, data: { name: "李桂聿", role: "全栈开发" } }
}

// 后端路由 (Next.js API Route)
// app/api/user/profile/route.ts
export async function GET() {
  return Response.json({
    status: 200,
    data: { name: "李桂聿", role: "全栈开发" }
  });
}`;

  return (
    <CodeToggle code={code} label="查看请求代码">
      <button
        onClick={sendRequest}
        disabled={step === "sending" || step === "waiting"}
        className="px-4 py-2 rounded-[9px] text-[13px] font-medium text-white transition-all duration-200 disabled:opacity-50 cursor-pointer border-none"
        style={{ backgroundColor: p.accent }}
      >
        {step === "idle" || step === "done" ? "📡 发送 GET 请求" : "⏳ 请求中..."}
      </button>

      <div className="rounded-[10px] border p-3.5 font-mono text-[11.5px] space-y-1.5 mt-3" style={{ borderColor: p.border, backgroundColor: p.codeBg }}>
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded-[4px] text-[10px] font-bold" style={{ backgroundColor: "rgba(95,138,107,0.15)", color: p.isDark ? "#8fb89a" : "#5f8a6b" }}>GET</span>
          <span style={{ color: p.textMuted }}>/api/user/profile</span>
        </div>
        <AnimatePresence>
          {step === "sending" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: p.textFaint }}>→ 浏览器正在发送请求...</motion.p>
          )}
          {step === "waiting" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: p.textFaint }}>⏳ 服务器正在处理...</motion.p>
          )}
          {step === "done" && (
            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-[10px] mb-1" style={{ color: p.isDark ? "#8fb89a" : "#5f8a6b" }}>← 200 OK (服务器响应)</p>
              <pre className="whitespace-pre-wrap" style={{ color: p.textMuted }}>{result}</pre>
            </motion.div>
          )}
        </AnimatePresence>
        {step === "idle" && <p style={{ color: p.textFaint }}>点击按钮模拟一次 API 请求</p>}
      </div>
      <p className="text-[11.5px] mt-2" style={{ color: p.textFaint }}>前端（浏览器）→ 发请求 → 后端（服务器）→ 返回 JSON 数据。这就是 API 的工作方式。</p>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   组件演示
   ═══════════════════════════════════════════ */
export function ComponentDemo() {
  const p = usePalette();
  const [showParts, setShowParts] = useState(false);

  const code = `// React 组件：每个组件是独立的积木
function Navbar() {
  return <nav>🧭 导航栏</nav>;
}

function Hero() {
  return <section>🦸 首屏大横幅</section>;
}

function Card({ title, desc }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function Footer() {
  return <footer>🦶 页脚</footer>;
}

// 页面 = 组件的拼装
export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Card title="特性1" desc="..." />
      <Card title="特性2" desc="..." />
      <Card title="特性3" desc="..." />
      <Footer />
    </>
  );
}`;

  return (
    <CodeToggle code={code} label="查看组件代码">
      <button
        onClick={() => setShowParts(!showParts)}
        className="px-3.5 py-1.5 rounded-[8px] text-[12px] font-medium border transition-all duration-200 cursor-pointer"
        style={{ borderColor: p.accentBorder, color: p.accent, backgroundColor: "transparent" }}
      >
        {showParts ? "🔗 组装成页面" : "🧩 拆解成组件"}
      </button>

      <AnimatePresence mode="wait">
        {!showParts ? (
          <motion.div
            key="assembled"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-[12px] border overflow-hidden mt-3"
            style={{ borderColor: p.border }}
          >
            <div className="px-3 py-2 text-[11px] font-medium" style={{ backgroundColor: p.accentBg, borderBottom: `1px solid ${p.border}`, color: p.textMuted }}>🧭 Navbar 组件</div>
            <div className="p-3 text-center text-[13px] py-6" style={{ backgroundColor: p.surface, color: p.textMuted }}>🦸 Hero 组件</div>
            <div className="grid grid-cols-3 gap-2 p-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-[8px] p-2 text-center text-[10px]" style={{ backgroundColor: p.accentBg, border: `1px solid ${p.accentBorder}`, color: p.textMuted }}>🃏 Card</div>
              ))}
            </div>
            <div className="px-3 py-2 text-center text-[10px]" style={{ backgroundColor: p.surface, borderTop: `1px solid ${p.border}`, color: p.textFaint }}>🦶 Footer 组件</div>
          </motion.div>
        ) : (
          <motion.div key="parts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-wrap gap-2 mt-3">
            {["🧭 Navbar", "🦸 Hero", "🃏 Card ×3", "🦶 Footer", "🔘 Button", "📝 Input"].map((part, i) => (
              <motion.div
                key={part}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="px-3 py-2 rounded-[9px] text-[12px] border"
                style={{ borderColor: p.accentBorder, backgroundColor: p.accentBg, color: p.textMuted }}
              >
                {part}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <p className="text-[11.5px] mt-2" style={{ color: p.textFaint }}>页面 = 组件的拼装。每个组件是独立积木，可以复用、可以替换。</p>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   动画演示
   ═══════════════════════════════════════════ */
export function AnimationDemo() {
  const p = usePalette();
  const [show, setShow] = useState(false);
  const [animated, setAnimated] = useState(true);

  const code = `/* CSS 过渡动画 */
.element {
  opacity: 0;
  transform: translateY(16px) scale(0.9);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.element.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* CSS 关键帧动画 */
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to   { opacity: 1; transform: scale(1); }
}

.animated-element {
  animation: fadeIn 0.4s ease-out forwards;
}

/* Framer Motion (React 动画库) */
<motion.div
  initial={{ opacity: 0, y: 16, scale: 0.9 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: -16, scale: 0.9 }}
  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
/>`;

  return (
    <CodeToggle code={code} label="查看动画代码">
      <div className="flex gap-2">
        <button onClick={() => setShow(!show)} className="px-3.5 py-1.5 rounded-[8px] text-[12px] font-medium text-white border-none cursor-pointer" style={{ backgroundColor: p.accent }}>
          {show ? "隐藏元素" : "显示元素"}
        </button>
        <button
          onClick={() => setAnimated(!animated)}
          className="px-3.5 py-1.5 rounded-[8px] text-[12px] font-medium border cursor-pointer"
          style={{ borderColor: p.accentBorder, color: p.accent, backgroundColor: "transparent" }}
        >
          {animated ? "✅ 有动画" : "❌ 无动画"}
        </button>
      </div>

      <div className="h-16 flex items-center justify-center rounded-[10px] border mt-3" style={{ borderColor: p.border, backgroundColor: p.surface }}>
        <AnimatePresence>
          {show && (
            animated ? (
              <motion.div
                key="animated"
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="px-4 py-2 rounded-[9px] text-[13px] font-medium text-white"
                style={{ backgroundColor: p.accent }}
              >
                ✨ 平滑出现
              </motion.div>
            ) : (
              <div key="static" className="px-4 py-2 rounded-[9px] text-[13px] font-medium text-white" style={{ backgroundColor: p.isDark ? "#4a4840" : "#95938a" }}>
                突然出现（无动画）
              </div>
            )
          )}
        </AnimatePresence>
        {!show && <span className="text-[11.5px]" style={{ color: p.textFaint }}>点击「显示元素」对比效果</span>}
      </div>
      <p className="text-[11.5px] mt-2" style={{ color: p.textFaint }}>动画让状态变化有「过渡」，用户不会觉得突兀。这就是 transition / animation 的价值。</p>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   HTML 结构演示
   ═══════════════════════════════════════════ */
export function HtmlStructureDemo() {
  const p = usePalette();
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="space-y-3">
      <button
        onClick={() => setShowCode(!showCode)}
        className="px-3.5 py-1.5 rounded-[8px] text-[12px] font-medium border transition-all cursor-pointer"
        style={{ borderColor: p.accentBorder, color: p.accent, backgroundColor: "transparent" }}
      >
        {showCode ? "👁️ 看渲染结果" : "📝 看 HTML 代码"}
      </button>

      <AnimatePresence mode="wait">
        {showCode ? (
          <motion.pre
            key="code"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-[10px] p-3.5 text-[11.5px] font-mono overflow-x-auto border"
            style={{ backgroundColor: p.codeBg, borderColor: p.border, color: p.textMuted }}
          >
{`<h1>我的网站</h1>
<p>欢迎来到我的主页</p>
<button>点击我</button>
<img src="photo.jpg" />`}
          </motion.pre>
        ) : (
          <motion.div
            key="render"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-[10px] p-4 border space-y-2.5"
            style={{ borderColor: p.border, backgroundColor: p.surface }}
          >
            <h1 className="text-[17px] font-bold" style={{ color: p.text }}>我的网站</h1>
            <p className="text-[13px]" style={{ color: p.textMuted }}>欢迎来到我的主页</p>
            <button className="px-3 py-1 rounded-[6px] text-[11px] text-white border-none" style={{ backgroundColor: p.accent }}>点击我</button>
            <div className="w-16 h-10 rounded-[7px] flex items-center justify-center text-[9px]" style={{ backgroundColor: p.accentBg, color: p.textFaint }}>图片</div>
          </motion.div>
        )}
      </AnimatePresence>
      <p className="text-[11.5px]" style={{ color: p.textFaint }}>左边是 HTML 标签（给浏览器看的指令），右边是浏览器渲染出的画面。</p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CSS 样式演示
   ═══════════════════════════════════════════ */
export function CssStylingDemo() {
  const p = usePalette();
  const [style, setStyle] = useState(0);
  const styles = [
    { label: "无样式", css: { padding: "8px 14px", borderRadius: "0px", backgroundColor: "transparent", border: `1px solid ${p.border}`, color: p.text, boxShadow: "none" } },
    { label: "圆角 + 背景", css: { padding: "10px 20px", borderRadius: "10px", backgroundColor: p.accentBg, border: `1px solid ${p.accentBorder}`, color: p.accent, boxShadow: "none" } },
    { label: "阴影 + 渐变", css: { padding: "10px 20px", borderRadius: "10px", backgroundColor: `linear-gradient(135deg, ${p.isDark ? "#c06a4d" : "#d97757"}, ${p.isDark ? "#9a5a42" : "#b85c4a"})`, border: "none", color: "#fff", boxShadow: `0 4px 16px rgba(217,119,87,${p.isDark ? 0.25 : 0.35})` } },
  ];

  const codeSnippets = [
    `/* 无样式：浏览器默认外观 */
.button {
  padding: 8px 14px;
  border: 1px solid #ccc;
  background: transparent;
  border-radius: 0;
}`,
    `/* 圆角 + 背景色 */
.button {
  padding: 10px 20px;
  border-radius: 10px;
  background-color: rgba(217,119,87,0.08);
  border: 1px solid rgba(217,119,87,0.18);
  color: #d97757;
}`,
    `/* 渐变背景 + 阴影 */
.button {
  padding: 10px 20px;
  border-radius: 10px;
  background: linear-gradient(135deg, #d97757, #b85c4a);
  border: none;
  color: white;
  box-shadow: 0 4px 16px rgba(217,119,87,0.35);
}`,
  ];

  return (
    <CodeToggle code={codeSnippets[style]} label="查看当前 CSS">
      <div className="flex gap-2 flex-wrap">
        {styles.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setStyle(i)}
            className="px-2.5 py-1 rounded-[7px] text-[11px] font-medium transition-all cursor-pointer"
            style={{
              backgroundColor: style === i ? p.accent : "transparent",
              color: style === i ? "#fff" : p.textMuted,
              border: `1px solid ${style === i ? p.accent : p.border}`,
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="flex justify-center py-4">
        <div className="transition-all duration-500 text-[13px] font-medium" style={styles[style].css as React.CSSProperties}>
          我是一个按钮
        </div>
      </div>
      <p className="text-[11.5px]" style={{ color: p.textFaint }}>同一个元素，只改 CSS 就能从「毛坯」变「精装」。颜色、圆角、阴影都是 CSS 控制的。</p>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   数据库演示
   ═══════════════════════════════════════════ */
export function DatabaseDemo() {
  const p = usePalette();
  const [rows, setRows] = useState([
    { id: 1, name: "小明", score: 92 },
    { id: 2, name: "小红", score: 88 },
  ]);
  const [nextId, setNextId] = useState(3);
  const names = ["小刚", "小美", "小华", "小李", "小张"];

  const addRow = () => {
    const name = names[Math.floor(Math.random() * names.length)];
    const score = Math.floor(Math.random() * 40) + 60;
    setRows([...rows, { id: nextId, name, score }]);
    setNextId(nextId + 1);
  };

  const code = `-- SQL: 数据库操作语言

-- 创建表
CREATE TABLE students (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  score INTEGER
);

-- 插入数据 (INSERT)
INSERT INTO students (name, score)
VALUES ('小明', 92);

-- 查询数据 (SELECT)
SELECT * FROM students WHERE score > 80;

-- 更新数据 (UPDATE)
UPDATE students SET score = 95 WHERE name = '小明';

-- 删除数据 (DELETE)
DELETE FROM students WHERE id = 2;`;

  return (
    <CodeToggle code={code} label="查看 SQL 代码">
      <div className="flex gap-2">
        <button onClick={addRow} className="px-3.5 py-1.5 rounded-[8px] text-[12px] font-medium text-white border-none cursor-pointer" style={{ backgroundColor: p.accent }}>
          + INSERT 添加
        </button>
        <button onClick={() => setRows([])} className="px-3.5 py-1.5 rounded-[8px] text-[12px] font-medium border cursor-pointer" style={{ borderColor: "rgba(184,92,74,0.3)", color: p.isDark ? "#d4836f" : "#b85c4a", backgroundColor: "transparent" }}>
          🗑️ DELETE ALL
        </button>
      </div>
      <div className="rounded-[10px] border overflow-hidden text-[12px] mt-3" style={{ borderColor: p.border }}>
        <div className="grid grid-cols-4 px-3 py-2 font-semibold" style={{ backgroundColor: p.accentBg, borderBottom: `1px solid ${p.border}`, color: p.textMuted }}>
          <span>ID</span><span>姓名</span><span>分数</span><span>操作</span>
        </div>
        <AnimatePresence>
          {rows.map((row) => (
            <motion.div
              key={row.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-4 px-3 py-2 items-center overflow-hidden"
              style={{ borderBottom: `1px solid ${p.border}`, color: p.text }}
            >
              <span className="font-mono" style={{ color: p.textFaint }}>{row.id}</span>
              <span>{row.name}</span>
              <span>{row.score}</span>
              <button onClick={() => setRows(rows.filter((r) => r.id !== row.id))} className="text-[10px] w-fit px-1.5 py-0.5 rounded-[5px] cursor-pointer border-none" style={{ color: p.isDark ? "#d4836f" : "#b85c4a", backgroundColor: "rgba(184,92,74,0.08)" }}>删除</button>
            </motion.div>
          ))}
        </AnimatePresence>
        {rows.length === 0 && <div className="px-3 py-3.5 text-center" style={{ color: p.textFaint }}>表空了，点 INSERT 添加数据</div>}
      </div>
      <p className="text-[11.5px] mt-2" style={{ color: p.textFaint }}>数据库就是一张「超级表格」——可以增(INSERT)、删(DELETE)、查(SELECT)、改(UPDATE)。</p>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   Git 演示
   ═══════════════════════════════════════════ */
export function GitDemo() {
  const p = usePalette();
  const [commits, setCommits] = useState([
    { id: 1, msg: "初始提交", branch: "main" },
    { id: 2, msg: "添加首页", branch: "main" },
  ]);
  const [nextId, setNextId] = useState(3);
  const [onBranch, setOnBranch] = useState("main");

  const branchColor = (b: string) => (b === "main" ? p.accent : p.isDark ? "#8fb89a" : "#5f8a6b");

  const addCommit = () => {
    const msgs = ["修复样式", "添加动画", "优化性能", "更新文案", "重构代码"];
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    setCommits([...commits, { id: nextId, msg, branch: onBranch }]);
    setNextId(nextId + 1);
  };

  const mergeBranch = () => {
    const featureCommits = commits.filter((c) => c.branch === "feature");
    if (featureCommits.length === 0) return;
    setCommits([...commits, { id: nextId, msg: `合并 feature (${featureCommits.length}次提交)`, branch: "main" }]);
    setNextId(nextId + 1);
    setOnBranch("main");
  };

  const code = `# Git 常用命令

# 初始化仓库
git init

# 查看状态
git status

# 添加文件到暂存区
git add .

# 提交（存档）
git commit -m "添加首页"

# 创建新分支
git branch feature

# 切换分支
git checkout feature
# 或新写法：
git switch feature

# 合并分支到 main
git checkout main
git merge feature

# 推送到远程仓库
git push origin main

# 拉取最新代码
git pull origin main`;

  return (
    <CodeToggle code={code} label="查看 Git 命令">
      <div className="flex gap-2 flex-wrap">
        <button onClick={addCommit} className="px-3.5 py-1.5 rounded-[8px] text-[12px] font-medium text-white border-none cursor-pointer" style={{ backgroundColor: branchColor(onBranch) }}>
          📦 Commit
        </button>
        <button onClick={() => setOnBranch(onBranch === "main" ? "feature" : "main")} className="px-3.5 py-1.5 rounded-[8px] text-[12px] font-medium border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent, backgroundColor: "transparent" }}>
          🌿 切换到 {onBranch === "main" ? "feature" : "main"}
        </button>
        {commits.some((c) => c.branch === "feature") && onBranch === "main" && (
          <button onClick={mergeBranch} className="px-3.5 py-1.5 rounded-[8px] text-[12px] font-medium border cursor-pointer" style={{ borderColor: "rgba(95,138,107,0.3)", color: p.isDark ? "#8fb89a" : "#5f8a6b", backgroundColor: "transparent" }}>
            🔀 合并 feature
          </button>
        )}
      </div>
      <div className="text-[10px] font-semibold px-2 py-1 rounded-[6px] w-fit mt-2" style={{ backgroundColor: `${branchColor(onBranch)}18`, color: branchColor(onBranch) }}>
        当前分支：{onBranch}
      </div>
      <div className="space-y-1 max-h-32 overflow-y-auto quiz-nav-scroll mt-2">
        {[...commits].reverse().map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-[11.5px] px-2.5 py-1.5 rounded-[7px]"
            style={{ backgroundColor: p.surface }}
          >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: branchColor(c.branch) }} />
            <span className="font-mono" style={{ color: p.textFaint }}>#{c.id}</span>
            <span style={{ color: p.text }}>{c.msg}</span>
            <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-[4px] font-medium" style={{ backgroundColor: `${branchColor(c.branch)}15`, color: branchColor(c.branch) }}>{c.branch}</span>
          </motion.div>
        ))}
      </div>
      <p className="text-[11.5px] mt-2" style={{ color: p.textFaint }}>每次 Commit 是一个存档点。分支让你安全实验，合并把成果汇入主线。</p>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   深色模式演示
   ═══════════════════════════════════════════ */
export function DarkModeDemo() {
  const p = usePalette();
  const [dark, setDark] = useState(false);

  const code = `/* CSS 变量实现深色模式 */
:root {
  --bg: #ffffff;
  --text: #4a4840;
  --text-muted: #7d7b72;
  --accent: #d97757;
  --border: rgba(0,0,0,0.08);
}

/* 深色模式覆盖 */
.dark {
  --bg: #141311;
  --text: #c2c1b6;
  --text-muted: #98978f;
  --accent: #e8957a;
  --border: rgba(255,255,255,0.08);
}

/* 使用变量 */
body {
  background-color: var(--bg);
  color: var(--text);
}

/* JavaScript 切换 */
document.documentElement.classList.toggle('dark');`;

  return (
    <CodeToggle code={code} label="查看实现代码">
      <button
        onClick={() => setDark(!dark)}
        className="px-3.5 py-1.5 rounded-[8px] text-[12px] font-medium border transition-all cursor-pointer"
        style={{ borderColor: p.accentBorder, color: p.accent, backgroundColor: "transparent" }}
      >
        {dark ? "🌙 深色模式" : "☀️ 浅色模式"} — 点击切换
      </button>
      <div
        className="rounded-[12px] p-4 transition-all duration-500 space-y-2 border mt-3"
        style={{
          backgroundColor: dark ? "#141311" : "#ffffff",
          borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        }}
      >
        <div className="text-[14px] font-semibold transition-colors duration-500" style={{ color: dark ? "#c2c1b6" : "#4a4840" }}>文章标题</div>
        <div className="text-[12px] leading-[1.7] transition-colors duration-500" style={{ color: dark ? "#98978f" : "#7d7b72" }}>
          这是一段正文内容，看看深色/浅色模式下的阅读体验差异。
        </div>
        <div className="flex gap-2">
          <span className="px-2 py-1 rounded-[6px] text-[10px] transition-all duration-500" style={{ backgroundColor: dark ? "rgba(232,149,122,0.12)" : "rgba(217,119,87,0.08)", color: dark ? "#e8957a" : "#d97757" }}>标签A</span>
          <span className="px-2 py-1 rounded-[6px] text-[10px] transition-all duration-500" style={{ backgroundColor: dark ? "rgba(143,184,154,0.12)" : "rgba(95,138,107,0.08)", color: dark ? "#8fb89a" : "#5f8a6b" }}>标签B</span>
        </div>
      </div>
      <p className="text-[11.5px] mt-2" style={{ color: p.textFaint }}>深色模式不只是「反色」——需要重新调整对比度、阴影、饱和度，让暗色下也舒适。</p>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   留白演示
   ═══════════════════════════════════════════ */
export function WhitespaceDemo() {
  const p = usePalette();
  const [spacing, setSpacing] = useState(16);

  const code = `/* CSS 间距控制 */
.container {
  /* padding: 元素内部留白 */
  padding: 16px;

  /* margin: 元素外部留白 */
  margin-bottom: 16px;

  /* gap: Flex/Grid 子元素间距 */
  display: flex;
  flex-direction: column;
  gap: 16px;  /* ← 拖动滑块改的就是这个值 */
}

/* 常用间距规范 (8px 基准) */
.xs  { padding: 4px; }   /* 0.5x */
.sm  { padding: 8px; }   /* 1x */
.md  { padding: 16px; }  /* 2x */
.lg  { padding: 24px; }  /* 3x */
.xl  { padding: 32px; }  /* 4x */
.2xl { padding: 40px; }  /* 5x */`;

  return (
    <CodeToggle code={code} label="查看间距代码">
      <div className="flex items-center gap-3">
        <span className="text-[12px] whitespace-nowrap" style={{ color: p.textFaint }}>间距：</span>
        <input
          type="range"
          min={0}
          max={40}
          value={spacing}
          onChange={(e) => setSpacing(Number(e.target.value))}
          className="flex-1 h-[5px] rounded-full appearance-none cursor-pointer"
          style={{ background: `linear-gradient(to right, ${p.accent} ${(spacing / 40) * 100}%, ${p.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} ${(spacing / 40) * 100}%)` }}
        />
        <span className="text-[11px] font-mono w-10 text-right" style={{ color: p.textMuted }}>{spacing}px</span>
      </div>
      <div className="rounded-[10px] border p-4 mt-3" style={{ borderColor: p.border, backgroundColor: p.surface }}>
        <div style={{ gap: `${spacing}px`, display: "flex", flexDirection: "column" }}>
          {["标题文字", "这是一段正文内容", "另一段正文内容"].map((text, i) => (
            <div
              key={i}
              className="rounded-[7px] px-3 py-2 text-[12px] transition-all duration-200"
              style={{
                backgroundColor: i === 0 ? p.accentBg : p.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? p.text : p.textMuted,
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
      <p className="text-[11.5px] mt-2" style={{ color: p.textFaint }}>
        {spacing < 8 ? "😰 太挤了，读起来很累" : spacing < 24 ? "😊 间距适中，阅读舒适" : "🌊 留白充足，呼吸感很强"}
      </p>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   Toast 演示
   ═══════════════════════════════════════════ */
export function ToastDemo() {
  const p = usePalette();
  const [toasts, setToasts] = useState<{ id: number; msg: string; type: string }[]>([]);
  const [nextId, setNextId] = useState(0);

  const showToast = (msg: string, type: string) => {
    const id = nextId;
    setToasts((prev) => [...prev, { id, msg, type }]);
    setNextId(nextId + 1);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2500);
  };

  const toastStyle = (type: string) => {
    if (type === "success") return { bg: p.isDark ? "rgba(143,184,154,0.12)" : "#f0f7f2", border: p.isDark ? "rgba(143,184,154,0.25)" : "#c8e0cd", color: p.isDark ? "#8fb89a" : "#3d6b4a" };
    if (type === "warning") return { bg: p.isDark ? "rgba(232,196,122,0.12)" : "#fdf8ee", border: p.isDark ? "rgba(232,196,122,0.25)" : "#eddcb3", color: p.isDark ? "#e8c47a" : "#8a6d2f" };
    return { bg: p.isDark ? "rgba(212,131,111,0.12)" : "#fdf1ee", border: p.isDark ? "rgba(212,131,111,0.25)" : "#ecc9c0", color: p.isDark ? "#d4836f" : "#9a4432" };
  };

  const code = `// Toast 通知组件 (React)
function showToast(message, type = 'success') {
  const toast = { id: Date.now(), message, type };
  setToasts(prev => [...prev, toast]);

  // 2.5秒后自动消失
  setTimeout(() => {
    setToasts(prev => prev.filter(t => t.id !== toast.id));
  }, 2500);
}

// 使用方式
<button onClick={() => showToast('保存成功！', 'success')}>
  保存
</button>
<button onClick={() => showToast('网络超时', 'warning')}>
  重试
</button>
<button onClick={() => showToast('操作失败', 'error')}>
  删除
</button>

// CSS 动画
.toast {
  animation: slideIn 0.3s ease-out;
}
@keyframes slideIn {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}`;

  return (
    <CodeToggle code={code} label="查看 Toast 代码">
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => showToast("✅ 保存成功！", "success")} className="px-3 py-1.5 rounded-[8px] text-[11px] font-medium text-white border-none cursor-pointer" style={{ backgroundColor: p.isDark ? "#5f8a6b" : "#6b9a77" }}>成功提示</button>
        <button onClick={() => showToast("⚠️ 网络超时", "warning")} className="px-3 py-1.5 rounded-[8px] text-[11px] font-medium text-white border-none cursor-pointer" style={{ backgroundColor: p.isDark ? "#a3823c" : "#c99a3c" }}>警告提示</button>
        <button onClick={() => showToast("❌ 操作失败", "error")} className="px-3 py-1.5 rounded-[8px] text-[11px] font-medium text-white border-none cursor-pointer" style={{ backgroundColor: p.isDark ? "#9a5a42" : "#b85c4a" }}>错误提示</button>
      </div>
      <div className="relative h-20 rounded-[10px] border flex items-center justify-center mt-3" style={{ borderColor: p.border, backgroundColor: p.surface }}>
        <span className="text-[11px]" style={{ color: p.textFaint }}>点击按钮触发 Toast</span>
        <div className="absolute top-2 right-2 space-y-1.5">
          <AnimatePresence>
            {toasts.map((t) => {
              const s = toastStyle(t.type);
              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: 40, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 40, scale: 0.9 }}
                  className="px-3 py-1.5 rounded-[8px] text-[11px] font-medium"
                  style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}`, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                >
                  {t.msg}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
      <p className="text-[11.5px] mt-2" style={{ color: p.textFaint }}>Toast 出现几秒后自动消失，不打断用户操作。比弹窗（Modal）轻量得多。</p>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   JavaScript 交互演示
   ═══════════════════════════════════════════ */
export function JavaScriptDemo() {
  const p = usePalette();
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<string[]>(["苹果", "香蕉"]);
  const [input, setInput] = useState("");

  const code = `// 变量与状态
let count = 0;
const fruits = ["苹果", "香蕉"];

// 事件处理
function handleClick() {
  count++;  // 修改状态
  render(); // 触发重新渲染
}

// 数组操作
function addItem(text) {
  fruits.push(text);  // 添加元素
  render();
}

// 模板字符串
console.log(\`当前计数: \${count}\`);`;

  return (
    <CodeToggle code={code} label="查看 JS 代码">
      <p className="text-[12px] mb-3" style={{ color: p.textFaint }}>👇 点击按钮体验 JavaScript 的状态管理和数组操作</p>
      <div className="space-y-4">
        {/* Counter */}
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-mono" style={{ color: p.textMuted }}>let count =</span>
          <span className="text-[20px] font-bold font-mono min-w-[32px] text-center" style={{ color: p.accent }}>{count}</span>
          <button onClick={() => setCount(c => c + 1)} className="px-3 py-1 rounded-[6px] text-[11px] font-medium border cursor-pointer transition-colors" style={{ borderColor: p.accent, color: p.accent }}>count++</button>
          <button onClick={() => setCount(0)} className="px-3 py-1 rounded-[6px] text-[11px] border cursor-pointer transition-colors" style={{ borderColor: p.border, color: p.textFaint }}>reset</button>
        </div>
        {/* Array */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[12px] font-mono" style={{ color: p.textMuted }}>const items =</span>
            <span className="text-[12px] font-mono" style={{ color: p.text }}>[{items.map(i => `"${i}"`).join(", ")}]</span>
          </div>
          <div className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="新元素..." className="h-7 px-2 rounded-[6px] border text-[11px] outline-none w-[100px]" style={{ borderColor: p.border, backgroundColor: p.surface, color: p.text }} onKeyDown={e => { if (e.key === "Enter" && input.trim()) { setItems([...items, input.trim()]); setInput(""); } }} />
            <button onClick={() => { if (input.trim()) { setItems([...items, input.trim()]); setInput(""); } }} className="px-2.5 py-1 rounded-[6px] text-[11px] font-medium cursor-pointer" style={{ backgroundColor: p.accentBg, color: p.accent, border: `1px solid ${p.accentBorder}` }}>.push()</button>
            {items.length > 0 && <button onClick={() => setItems(items.slice(0, -1))} className="px-2.5 py-1 rounded-[6px] text-[11px] border cursor-pointer" style={{ borderColor: p.border, color: p.textFaint }}>.pop()</button>}
          </div>
        </div>
      </div>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   Flexbox 交互演示
   ═══════════════════════════════════════════ */
export function FlexboxDemo() {
  const p = usePalette();
  const [justify, setJustify] = useState("flex-start");
  const [align, setAlign] = useState("stretch");
  const [direction, setDirection] = useState("row");
  const [wrap, setWrap] = useState("nowrap");

  const code = `/* 当前 Flexbox 配置 */
.container {
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  flex-wrap: ${wrap};
  gap: 8px;
}`;

  const opts = (label: string, value: string, setter: (v: string) => void, options: string[]) => (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] font-mono shrink-0" style={{ color: p.textFaint }}>{label}:</span>
      <div className="flex gap-1 flex-wrap">
        {options.map(o => (
          <button key={o} onClick={() => setter(o)} className="px-1.5 py-0.5 rounded-[4px] text-[9px] font-mono border cursor-pointer transition-colors" style={{ borderColor: value === o ? p.accent : p.border, backgroundColor: value === o ? p.accentBg : "transparent", color: value === o ? p.accent : p.textFaint }}>{o}</button>
        ))}
      </div>
    </div>
  );

  return (
    <CodeToggle code={code} label="查看 CSS 代码">
      <p className="text-[12px] mb-3" style={{ color: p.textFaint }}>👇 切换属性值，观察布局变化</p>
      <div className="space-y-2 mb-3">
        {opts("direction", direction, setDirection, ["row", "column", "row-reverse"])}
        {opts("justify", justify, setJustify, ["flex-start", "center", "space-between", "space-around"])}
        {opts("align", align, setAlign, ["stretch", "center", "flex-start", "flex-end"])}
        {opts("wrap", wrap, setWrap, ["nowrap", "wrap"])}
      </div>
      <div className="h-[120px] rounded-[10px] border p-2 flex gap-2" style={{ borderColor: p.border, backgroundColor: p.surface, flexDirection: direction as any, justifyContent: justify, alignItems: align, flexWrap: wrap as any }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="rounded-[6px] flex items-center justify-center text-[11px] font-bold shrink-0" style={{ width: direction === "column" ? "100%" : "36px", height: direction === "row" || direction === "row-reverse" ? (align === "stretch" ? "100%" : "36px") : "28px", backgroundColor: p.accentBg, color: p.accent, border: `1px solid ${p.accentBorder}` }}>{i}</div>
        ))}
      </div>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   Grid 交互演示
   ═══════════════════════════════════════════ */
export function GridDemo() {
  const p = usePalette();
  const [cols, setCols] = useState(3);
  const [gap, setGap] = useState(8);
  const [items, setItems] = useState(6);

  const code = `.grid-container {
  display: grid;
  grid-template-columns: repeat(${cols}, 1fr);
  gap: ${gap}px;
}

/* 子元素自动填充网格单元 */
.grid-item {
  background: var(--accent-bg);
  border-radius: 8px;
  aspect-ratio: 1;
}`;

  return (
    <CodeToggle code={code} label="查看 CSS 代码">
      <p className="text-[12px] mb-3" style={{ color: p.textFaint }}>👇 调整列数、间距和元素数量</p>
      <div className="flex flex-wrap gap-4 mb-3">
        <label className="flex items-center gap-2 text-[11px]" style={{ color: p.textMuted }}>
          列数
          <input type="range" min={1} max={5} value={cols} onChange={e => setCols(+e.target.value)} className="w-[60px] accent-[#d97757]" />
          <span className="font-mono" style={{ color: p.accent }}>{cols}</span>
        </label>
        <label className="flex items-center gap-2 text-[11px]" style={{ color: p.textMuted }}>
          间距
          <input type="range" min={0} max={20} value={gap} onChange={e => setGap(+e.target.value)} className="w-[60px] accent-[#d97757]" />
          <span className="font-mono" style={{ color: p.accent }}>{gap}px</span>
        </label>
        <label className="flex items-center gap-2 text-[11px]" style={{ color: p.textMuted }}>
          元素
          <input type="range" min={1} max={12} value={items} onChange={e => setItems(+e.target.value)} className="w-[60px] accent-[#d97757]" />
          <span className="font-mono" style={{ color: p.accent }}>{items}</span>
        </label>
      </div>
      <div className="rounded-[10px] border p-3" style={{ borderColor: p.border, backgroundColor: p.surface, display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: `${gap}px` }}>
        {Array.from({ length: items }, (_, i) => (
          <div key={i} className="aspect-square rounded-[8px] flex items-center justify-center text-[12px] font-bold" style={{ backgroundColor: p.accentBg, color: p.accent, border: `1px solid ${p.accentBorder}` }}>{i + 1}</div>
        ))}
      </div>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   DOM 操作演示
   ═══════════════════════════════════════════ */
export function DomDemo() {
  const p = usePalette();
  const [elements, setElements] = useState<{ id: number; tag: string; text: string; color: string }[]>([
    { id: 1, tag: "h2", text: "标题", color: p.accent },
    { id: 2, tag: "p", text: "这是一段文字", color: p.text },
  ]);
  const [nextId, setNextId] = useState(3);
  const tags = ["div", "p", "span", "button"];
  const colors = [p.accent, p.text, p.isDark ? "#8fb89a" : "#5f8a6b", p.isDark ? "#e8c47a" : "#c99a3c"];

  const code = `// DOM 操作示例
const container = document.getElementById("box");

// 创建元素
const el = document.createElement("div");
el.textContent = "新元素";
el.style.color = "#d97757";
container.appendChild(el);

// 删除元素
el.remove();

// 修改样式
el.style.backgroundColor = "rgba(217,119,87,0.1)";`;

  return (
    <CodeToggle code={code} label="查看 JS 代码">
      <p className="text-[12px] mb-3" style={{ color: p.textFaint }}>👇 动态增删改 DOM 元素</p>
      <div className="flex gap-2 mb-3 flex-wrap">
        <button onClick={() => { const tag = tags[Math.floor(Math.random() * tags.length)]; const color = colors[Math.floor(Math.random() * colors.length)]; setElements([...elements, { id: nextId, tag, text: `<${tag}>`, color }]); setNextId(nextId + 1); }} className="px-2.5 py-1 rounded-[6px] text-[11px] font-medium cursor-pointer" style={{ backgroundColor: p.accentBg, color: p.accent, border: `1px solid ${p.accentBorder}` }}>createElement + append</button>
        <button onClick={() => setElements(elements.slice(0, -1))} className="px-2.5 py-1 rounded-[6px] text-[11px] border cursor-pointer" style={{ borderColor: p.border, color: p.textFaint }}>lastChild.remove()</button>
        <button onClick={() => setElements(elements.map(el => ({ ...el, color: colors[Math.floor(Math.random() * colors.length)] })))} className="px-2.5 py-1 rounded-[6px] text-[11px] border cursor-pointer" style={{ borderColor: p.border, color: p.textFaint }}>style.color = random</button>
      </div>
      <div className="rounded-[10px] border p-3 min-h-[80px] space-y-1.5" style={{ borderColor: p.border, backgroundColor: p.surface }}>
        <div className="text-[9px] font-mono mb-1" style={{ color: p.textFaint }}>{"// DOM 树实时状态"}</div>
        {elements.map(el => (
          <motion.div key={el.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex items-center gap-2 text-[11px] font-mono">
            <span style={{ color: p.textFaint }}>{"<"}</span>
            <span style={{ color: p.accent }}>{el.tag}</span>
            <span style={{ color: p.textFaint }}>{">"}</span>
            <span style={{ color: el.color }}>{el.text}</span>
            <span style={{ color: p.textFaint }}>{"</"}{el.tag}{">"}</span>
          </motion.div>
        ))}
        {elements.length === 0 && <div className="text-[11px] text-center py-4" style={{ color: p.textFaint }}>容器为空 — 点击 append 添加元素</div>}
      </div>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   React 状态演示
   ═══════════════════════════════════════════ */
export function ReactStateDemo() {
  const p = usePalette();
  const [todos, setTodos] = useState<{ id: number; text: string; done: boolean }[]>([
    { id: 1, text: "学习 React", done: true },
    { id: 2, text: "写组件", done: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [nextId, setNextId] = useState(3);

  const code = `import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "学习 React", done: true },
    { id: 2, text: "写组件", done: false },
  ]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  };

  const toggle = (id) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} onClick={() => toggle(todo.id)}>
          {todo.done ? "✅" : "⬜"} {todo.text}
        </li>
      ))}
    </ul>
  );
}`;

  return (
    <CodeToggle code={code} label="查看 React 代码">
      <p className="text-[12px] mb-3" style={{ color: p.textFaint }}>👇 体验 React 的 useState 状态管理：点击切换完成，输入添加新项</p>
      <div className="space-y-2">
        <div className="flex gap-2">
          <input value={newTodo} onChange={e => setNewTodo(e.target.value)} placeholder="新待办..." className="flex-1 h-8 px-3 rounded-[7px] border text-[12px] outline-none" style={{ borderColor: p.border, backgroundColor: p.surface, color: p.text }} onKeyDown={e => { if (e.key === "Enter" && newTodo.trim()) { setTodos([...todos, { id: nextId, text: newTodo.trim(), done: false }]); setNewTodo(""); setNextId(nextId + 1); } }} />
          <button onClick={() => { if (newTodo.trim()) { setTodos([...todos, { id: nextId, text: newTodo.trim(), done: false }]); setNewTodo(""); setNextId(nextId + 1); } }} className="px-3 py-1.5 rounded-[7px] text-[11px] font-medium cursor-pointer" style={{ backgroundColor: p.accent, color: "#fff" }}>添加</button>
        </div>
        <div className="rounded-[10px] border divide-y" style={{ borderColor: p.border }}>
          {todos.map(todo => (
            <div key={todo.id} onClick={() => setTodos(todos.map(t => t.id === todo.id ? { ...t, done: !t.done } : t))} className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer transition-colors hover:opacity-80" style={{ borderBottom: `1px solid ${p.border}` }}>
              <span className="text-[14px]">{todo.done ? "✅" : "⬜"}</span>
              <span className="text-[12px]" style={{ color: todo.done ? p.textFaint : p.text, textDecoration: todo.done ? "line-through" : "none" }}>{todo.text}</span>
              <button onClick={e => { e.stopPropagation(); setTodos(todos.filter(t => t.id !== todo.id)); }} className="ml-auto text-[10px] px-1.5 py-0.5 rounded-[4px] border cursor-pointer opacity-60 hover:opacity-100" style={{ borderColor: p.border, color: p.textFaint }}>×</button>
            </div>
          ))}
        </div>
        <div className="text-[10px] font-mono" style={{ color: p.textFaint }}>state: [{todos.map(t => `{done:${t.done}}`).join(", ")}]</div>
      </div>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   Tailwind 工具类演示
   ═══════════════════════════════════════════ */
export function TailwindDemo() {
  const p = usePalette();
  const [rounded, setRounded] = useState("lg");
  const [shadow, setShadow] = useState("md");
  const [padding, setPadding] = useState("4");
  const [bg, setBg] = useState("accent");

  const roundedMap: Record<string, string> = { none: "0px", sm: "4px", md: "8px", lg: "12px", xl: "16px", full: "9999px" };
  const shadowMap: Record<string, string> = { none: "none", sm: "0 1px 2px rgba(0,0,0,0.1)", md: "0 4px 6px rgba(0,0,0,0.1)", lg: "0 10px 15px rgba(0,0,0,0.1)", xl: "0 20px 25px rgba(0,0,0,0.15)" };
  const paddingMap: Record<string, string> = { "2": "8px", "4": "16px", "6": "24px", "8": "32px" };
  const bgMap: Record<string, string> = { accent: p.accentBg, surface: p.surface, transparent: "transparent" };

  const code = `<div class="
  rounded-${rounded}
  shadow-${shadow}
  p-${padding}
  ${bg === "accent" ? "bg-orange-50" : bg === "surface" ? "bg-gray-50" : ""}
  border
">
  Tailwind 组合样式
</div>

/* 等价 CSS:
  border-radius: ${roundedMap[rounded]};
  box-shadow: ${shadowMap[shadow]};
  padding: ${paddingMap[padding]};
*/`;

  const btn = (label: string, value: string, setter: (v: string) => void, options: string[]) => (
    <div className="flex items-center gap-1">
      <span className="text-[9px] font-mono w-[44px] shrink-0" style={{ color: p.textFaint }}>{label}</span>
      {options.map(o => (
        <button key={o} onClick={() => setter(o)} className="px-1.5 py-0.5 rounded-[3px] text-[9px] font-mono border cursor-pointer" style={{ borderColor: value === o ? p.accent : p.border, backgroundColor: value === o ? p.accentBg : "transparent", color: value === o ? p.accent : p.textFaint }}>{o}</button>
      ))}
    </div>
  );

  return (
    <CodeToggle code={code} label="查看等效代码">
      <p className="text-[12px] mb-3" style={{ color: p.textFaint }}>👇 切换 Tailwind 工具类，实时预览组合效果</p>
      <div className="space-y-1.5 mb-3">
        {btn("rounded", rounded, setRounded, ["none", "sm", "md", "lg", "xl", "full"])}
        {btn("shadow", shadow, setShadow, ["none", "sm", "md", "lg", "xl"])}
        {btn("padding", padding, setPadding, ["2", "4", "6", "8"])}
        {btn("bg", bg, setBg, ["accent", "surface", "transparent"])}
      </div>
      <div className="flex justify-center">
        <div className="text-[13px] font-medium text-center transition-all duration-300 border" style={{ borderRadius: roundedMap[rounded], boxShadow: shadowMap[shadow], padding: paddingMap[padding], backgroundColor: bgMap[bg], borderColor: p.border, color: p.text }}>
          Tailwind 组合样式
        </div>
      </div>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   Scroll 滚动演示
   ═══════════════════════════════════════════ */
function ScrollDemo() {
  const p = usePalette();
  const [scrollY, setScrollY] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const maxScroll = 200;
  const progress = Math.min(scrollY / maxScroll * 100, 100);

  const code = `// 滚动进度条 + 回到顶部按钮
window.addEventListener('scroll', () => {
  const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  progressBar.style.width = \`\${progress * 100}%\`;
  backToTopBtn.style.opacity = window.scrollY > 300 ? '1' : '0';
});
backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });`;

  return (
    <CodeToggle code={code}>
      <p className="text-[12px] mb-3" style={{ color: p.textFaint }}>👇 在下方区域滚动，观察进度条和回到顶部按钮</p>
      {/* Progress bar */}
      <div className="h-1.5 rounded-full mb-3 overflow-hidden" style={{ backgroundColor: p.surface }}>
        <div className="h-full rounded-full transition-all duration-150" style={{ width: `${progress}%`, backgroundColor: p.accent }} />
      </div>
      <div className="flex items-center justify-between mb-2 text-[10px] font-mono" style={{ color: p.textFaint }}>
        <span>scrollTop: {scrollY}px</span>
        <span>progress: {Math.round(progress)}%</span>
      </div>
      {/* Scrollable area */}
      <div
        className="relative h-[140px] rounded-[10px] border overflow-y-auto p-3 space-y-2"
        style={{ borderColor: p.border, backgroundColor: p.surface }}
        onScroll={(e) => {
          const y = (e.target as HTMLDivElement).scrollTop;
          setScrollY(Math.round(y));
          setShowTop(y > 60);
        }}
      >
        {Array.from({length: 12}, (_, i) => (
          <div key={i} className="h-6 rounded-[5px] flex items-center px-2 text-[10px]" style={{ backgroundColor: i % 3 === 0 ? p.accentBg : p.codeBg, color: p.textMuted }}>
            内容区块 {i + 1} — 继续滚动查看效果
          </div>
        ))}
        {/* Back to top */}
        <button
          onClick={(e) => { (e.target as HTMLElement).closest('[class*="overflow-y"]')?.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="sticky bottom-1 left-full -translate-x-full w-7 h-7 rounded-full flex items-center justify-center text-[12px] border transition-all cursor-pointer"
          style={{ opacity: showTop ? 1 : 0, pointerEvents: showTop ? 'auto' : 'none', backgroundColor: p.accent, borderColor: p.accent, color: '#fff', boxShadow: `0 2px 8px ${p.accent}40` }}
        >↑</button>
      </div>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   Modal 弹窗演示
   ═══════════════════════════════════════════ */
function ModalDemo() {
  const p = usePalette();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'confirm' | 'info'>('confirm');

  const code = `// 模态弹窗：遮罩 + 居中 + ESC关闭 + 焦点陷阱
<dialog ref={dialogRef}>
  <div className="backdrop" onClick={close} />
  <div className="modal">
    <h2>确认删除？</h2>
    <p>此操作不可恢复</p>
    <button onClick={close}>取消</button>
    <button onClick={confirm}>确认删除</button>
  </div>
</dialog>
// ESC 关闭
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') close();
});`;

  return (
    <CodeToggle code={code}>
      <p className="text-[12px] mb-3" style={{ color: p.textFaint }}>👇 点击按钮打开不同类型的弹窗</p>
      <div className="flex gap-2 mb-3">
        <button onClick={() => { setType('confirm'); setOpen(true); }} className="px-3 py-1.5 rounded-[7px] text-[11px] font-medium border cursor-pointer transition-all hover:-translate-y-0.5" style={{ borderColor: p.accentBorder, color: p.accent, backgroundColor: p.accentBg }}>删除确认</button>
        <button onClick={() => { setType('info'); setOpen(true); }} className="px-3 py-1.5 rounded-[7px] text-[11px] font-medium border cursor-pointer transition-all hover:-translate-y-0.5" style={{ borderColor: p.border, color: p.textMuted }}>信息提示</button>
      </div>
      {/* Modal overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-[120px] rounded-[10px] border overflow-hidden flex items-center justify-center"
            style={{ borderColor: p.border }}
          >
            <div className="absolute inset-0" style={{ backgroundColor: p.isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)' }} onClick={() => setOpen(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="relative z-10 rounded-[10px] border p-4 w-[200px] space-y-2"
              style={{ backgroundColor: p.isDark ? '#1e1c17' : '#fff', borderColor: p.border, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
            >
              <div className="text-[12px] font-bold" style={{ color: p.text }}>{type === 'confirm' ? '⚠️ 确认删除？' : 'ℹ️ 操作成功'}</div>
              <div className="text-[10px]" style={{ color: p.textMuted }}>{type === 'confirm' ? '此操作不可恢复，确定要继续吗？' : '你的修改已保存到服务器。'}</div>
              <div className="flex gap-2 justify-end pt-1">
                <button onClick={() => setOpen(false)} className="px-2 py-1 rounded-[5px] text-[10px] border cursor-pointer" style={{ borderColor: p.border, color: p.textMuted }}>取消</button>
                <button onClick={() => setOpen(false)} className="px-2 py-1 rounded-[5px] text-[10px] font-medium cursor-pointer text-white" style={{ backgroundColor: type === 'confirm' ? '#b85c4a' : p.accent }}>{type === 'confirm' ? '删除' : '好的'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {!open && <div className="h-[120px] rounded-[10px] border flex items-center justify-center" style={{ borderColor: p.border, backgroundColor: p.surface }}><span className="text-[11px]" style={{ color: p.textFaint }}>点击上方按钮打开弹窗</span></div>}
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   Form 表单验证演示
   ═══════════════════════════════════════════ */
function FormDemo() {
  const p = usePalette();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passValid = password.length >= 8;
  const allValid = emailValid && passValid;

  const code = `// 实时表单校验
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const emailValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
const passValid = password.length >= 8;

// 提交时检查
const handleSubmit = (e) => {
  e.preventDefault();
  if (!emailValid || !passValid) return;
  // 发送请求...
};`;

  return (
    <CodeToggle code={code}>
      <p className="text-[12px] mb-3" style={{ color: p.textFaint }}>👇 输入内容查看实时校验效果</p>
      <div className="space-y-2.5 max-w-[260px]">
        <div>
          <label className="text-[10px] font-medium block mb-1" style={{ color: p.textMuted }}>邮箱</label>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full h-8 px-2.5 rounded-[7px] text-[11px] border outline-none transition-colors"
            style={{ borderColor: email ? (emailValid ? '#5f8a6b' : '#b85c4a') : p.border, backgroundColor: p.surface, color: p.text }}
          />
          {email && <span className="text-[9px] mt-0.5 block" style={{ color: emailValid ? '#5f8a6b' : '#b85c4a' }}>{emailValid ? '✓ 格式正确' : '✗ 请输入有效邮箱'}</span>}
        </div>
        <div>
          <label className="text-[10px] font-medium block mb-1" style={{ color: p.textMuted }}>密码（至少8位）</label>
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full h-8 px-2.5 rounded-[7px] text-[11px] border outline-none transition-colors"
            style={{ borderColor: password ? (passValid ? '#5f8a6b' : '#b85c4a') : p.border, backgroundColor: p.surface, color: p.text }}
          />
          {password && <span className="text-[9px] mt-0.5 block" style={{ color: passValid ? '#5f8a6b' : '#b85c4a' }}>{passValid ? `✓ ${password.length} 位` : `✗ 还需 ${8 - password.length} 位`}</span>}
        </div>
        <button
          onClick={() => { if (allValid) setSubmitted(true); }}
          disabled={!allValid}
          className="w-full h-8 rounded-[7px] text-[11px] font-medium transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: allValid ? p.accent : p.surface, color: allValid ? '#fff' : p.textFaint }}
        >{submitted ? '✓ 提交成功' : '注册'}</button>
      </div>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   Pagination 分页演示
   ═══════════════════════════════════════════ */
function PaginationDemo() {
  const p = usePalette();
  const [page, setPage] = useState(1);
  const total = 48;
  const perPage = 6;
  const totalPages = Math.ceil(total / perPage);
  const items = Array.from({length: perPage}, (_, i) => (page - 1) * perPage + i + 1);

  const code = `// 分页逻辑
const [page, setPage] = useState(1);
const perPage = 12;
const totalPages = Math.ceil(totalItems / perPage);
const items = allItems.slice((page-1)*perPage, page*perPage);

// URL 同步（Next.js）
const searchParams = useSearchParams();
const page = Number(searchParams.get('page') || 1);`;

  return (
    <CodeToggle code={code}>
      <p className="text-[12px] mb-3" style={{ color: p.textFaint }}>👇 点击页码切换数据</p>
      <div className="text-[10px] mb-2 font-mono" style={{ color: p.textMuted }}>共 {total} 条 · 第 {page}/{totalPages} 页</div>
      <div className="grid grid-cols-3 gap-1.5 mb-3">
        {items.map(id => (
          <div key={id} className="h-7 rounded-[6px] border flex items-center justify-center text-[10px] font-mono" style={{ borderColor: p.border, backgroundColor: p.surface, color: p.textMuted }}>#{id}</div>
        ))}
      </div>
      <div className="flex items-center gap-1 justify-center">
        <button onClick={() => setPage(Math.max(1, page-1))} disabled={page===1} className="w-6 h-6 rounded-[5px] text-[10px] border flex items-center justify-center cursor-pointer disabled:opacity-30" style={{ borderColor: p.border, color: p.textMuted }}>‹</button>
        {Array.from({length: totalPages}, (_, i) => i+1).map(n => (
          <button key={n} onClick={() => setPage(n)} className="w-6 h-6 rounded-[5px] text-[10px] font-medium border flex items-center justify-center cursor-pointer transition-all" style={{ borderColor: n===page ? p.accent : p.border, backgroundColor: n===page ? p.accent : 'transparent', color: n===page ? '#fff' : p.textMuted }}>{n}</button>
        ))}
        <button onClick={() => setPage(Math.min(totalPages, page+1))} disabled={page===totalPages} className="w-6 h-6 rounded-[5px] text-[10px] border flex items-center justify-center cursor-pointer disabled:opacity-30" style={{ borderColor: p.border, color: p.textMuted }}>›</button>
      </div>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   Sticky 吸顶演示
   ═══════════════════════════════════════════ */
function StickyDemo() {
  const p = usePalette();
  const code = `/* CSS Sticky 定位 */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
}
/* 注意：父元素不能设 overflow: hidden，否则 sticky 失效 */`;

  return (
    <CodeToggle code={code}>
      <p className="text-[12px] mb-3" style={{ color: p.textFaint }}>👇 滚动下方区域，观察导航栏吸顶效果</p>
      <div className="h-[160px] rounded-[10px] border overflow-y-auto relative" style={{ borderColor: p.border }}>
        {/* Sticky header */}
        <div className="sticky top-0 z-10 px-3 py-2 flex items-center justify-between border-b backdrop-blur-sm" style={{ backgroundColor: p.isDark ? 'rgba(13,13,11,0.85)' : 'rgba(250,249,247,0.85)', borderColor: p.border }}>
          <span className="text-[10px] font-bold" style={{ color: p.accent }}>📌 Sticky Nav</span>
          <span className="text-[9px]" style={{ color: p.textFaint }}>position: sticky; top: 0</span>
        </div>
        {/* Content */}
        <div className="p-3 space-y-2">
          {Array.from({length: 10}, (_, i) => (
            <div key={i} className="h-5 rounded-[4px] flex items-center px-2 text-[9px]" style={{ backgroundColor: p.surface, color: p.textFaint }}>内容段落 {i+1}</div>
          ))}
        </div>
      </div>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   State 状态管理演示
   ═══════════════════════════════════════════ */
function StateDemo() {
  const p = usePalette();
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([{ id: 1, text: '学习 React', done: false }, { id: 2, text: '写一个组件', done: true }]);
  const [newTodo, setNewTodo] = useState('');

  const code = `// useState 管理状态
const [count, setCount] = useState(0);
const [todos, setTodos] = useState([]);

// 状态变化 → 自动重新渲染
const addTodo = (text) => {
  setTodos(prev => [...prev, { id: Date.now(), text, done: false }]);
};
const toggle = (id) => {
  setTodos(prev => prev.map(t => t.id === id ? {...t, done: !t.done} : t));
};`;

  return (
    <CodeToggle code={code}>
      <p className="text-[12px] mb-3" style={{ color: p.textFaint }}>👇 操作下方控件，观察状态如何驱动 UI 更新</p>
      <div className="grid grid-cols-2 gap-3">
        {/* Counter */}
        <div className="rounded-[8px] border p-2.5 space-y-2" style={{ borderColor: p.border }}>
          <div className="text-[9px] font-medium" style={{ color: p.textMuted }}>计数器</div>
          <div className="text-[20px] font-bold text-center font-mono" style={{ color: p.accent }}>{count}</div>
          <div className="flex gap-1 justify-center">
            <button onClick={() => setCount(c => c-1)} className="w-6 h-6 rounded-[5px] text-[12px] border cursor-pointer" style={{ borderColor: p.border, color: p.textMuted }}>−</button>
            <button onClick={() => setCount(0)} className="px-2 h-6 rounded-[5px] text-[9px] border cursor-pointer" style={{ borderColor: p.border, color: p.textFaint }}>重置</button>
            <button onClick={() => setCount(c => c+1)} className="w-6 h-6 rounded-[5px] text-[12px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>+</button>
          </div>
        </div>
        {/* Todo */}
        <div className="rounded-[8px] border p-2.5 space-y-1.5" style={{ borderColor: p.border }}>
          <div className="text-[9px] font-medium" style={{ color: p.textMuted }}>Todo List</div>
          <div className="flex gap-1">
            <input value={newTodo} onChange={e => setNewTodo(e.target.value)} placeholder="新任务..." className="flex-1 h-6 px-1.5 rounded-[4px] text-[9px] border outline-none" style={{ borderColor: p.border, backgroundColor: p.surface, color: p.text }} onKeyDown={e => { if (e.key === 'Enter' && newTodo.trim()) { setTodos(t => [...t, { id: Date.now(), text: newTodo, done: false }]); setNewTodo(''); } }} />
            <button onClick={() => { if (newTodo.trim()) { setTodos(t => [...t, { id: Date.now(), text: newTodo, done: false }]); setNewTodo(''); } }} className="px-1.5 h-6 rounded-[4px] text-[9px] cursor-pointer" style={{ backgroundColor: p.accent, color: '#fff' }}>+</button>
          </div>
          {todos.map(t => (
            <div key={t.id} onClick={() => setTodos(ts => ts.map(x => x.id === t.id ? {...x, done: !x.done} : x))} className="flex items-center gap-1.5 text-[9px] cursor-pointer" style={{ color: t.done ? p.textFaint : p.text, textDecoration: t.done ? 'line-through' : 'none' }}>
              <span style={{ color: t.done ? '#5f8a6b' : p.border }}>{t.done ? '☑' : '☐'}</span> {t.text}
            </div>
          ))}
        </div>
      </div>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   Viewport 视口演示
   ═══════════════════════════════════════════ */
function ViewportDemo() {
  const p = usePalette();
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const sizes = { mobile: { w: 120, h: 200, label: '375px' }, tablet: { w: 180, h: 140, label: '768px' }, desktop: { w: 240, h: 140, label: '1440px' } };
  const s = sizes[device];

  const code = `// 视口检测与响应
const vw = window.innerWidth;  // 视口宽度
const vh = window.innerHeight; // 视口高度

// CSS 中
/* 100vw = 视口宽度, 100vh = 视口高度 */
/* 100dvh = 动态视口高度（解决移动端地址栏问题） */

// Intersection Observer 检测元素是否进入视口
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) lazyLoad(entry.target);
  });
});`;

  return (
    <CodeToggle code={code}>
      <p className="text-[12px] mb-3" style={{ color: p.textFaint }}>👇 切换设备查看视口如何影响布局</p>
      <div className="flex gap-2 mb-3">
        {(['mobile', 'tablet', 'desktop'] as const).map(d => (
          <button key={d} onClick={() => setDevice(d)} className="px-2 py-1 rounded-[5px] text-[10px] border cursor-pointer transition-all" style={{ borderColor: device===d ? p.accent : p.border, backgroundColor: device===d ? p.accentBg : 'transparent', color: device===d ? p.accent : p.textMuted }}>{d === 'mobile' ? '📱' : d === 'tablet' ? '📟' : '🖥️'} {d}</button>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="border-2 rounded-[8px] overflow-hidden transition-all duration-300 flex flex-col" style={{ width: s.w, height: s.h, borderColor: p.accent + '40' }}>
          <div className="h-4 flex items-center px-1.5 border-b text-[7px] font-mono" style={{ borderColor: p.border, color: p.textFaint }}>{s.label} viewport</div>
          <div className={`flex-1 p-1.5 ${device === 'mobile' ? 'grid grid-cols-1' : device === 'tablet' ? 'grid grid-cols-2' : 'grid grid-cols-3'} gap-1`}>
            {Array.from({length: device === 'mobile' ? 3 : device === 'tablet' ? 4 : 6}, (_, i) => (
              <div key={i} className="rounded-[3px] min-h-[16px]" style={{ backgroundColor: i === 0 ? p.accentBg : p.surface }} />
            ))}
          </div>
        </div>
      </div>
    </CodeToggle>
  );
}

/* ═══════════════════════════════════════════
   演示组件映射
   ═══════════════════════════════════════════ */
export const demoComponents: Record<string, React.ComponentType> = {
  "hover-demo": HoverDemo,
  "responsive-demo": ResponsiveDemo,
  "api-demo": ApiDemo,
  "component-demo": ComponentDemo,
  "animation-demo": AnimationDemo,
  "html-structure": HtmlStructureDemo,
  "css-styling": CssStylingDemo,
  "database-demo": DatabaseDemo,
  "git-demo": GitDemo,
  "darkmode-demo": DarkModeDemo,
  "whitespace-demo": WhitespaceDemo,
  "toast-demo": ToastDemo,
  "toast": ToastDemo,
  "javascript-demo": JavaScriptDemo,
  "flexbox-demo": FlexboxDemo,
  "grid-demo": GridDemo,
  "dom-demo": DomDemo,
  "react-state-demo": ReactStateDemo,
  "tailwind-demo": TailwindDemo,
  "scroll-demo": ScrollDemo,
  "modal-demo": ModalDemo,
  "form-demo": FormDemo,
  "pagination-demo": PaginationDemo,
  "sticky-demo": StickyDemo,
  "state-demo": StateDemo,
  "viewport-demo": ViewportDemo,
  ...frontendDemos,
  ...backendDemos,
  ...designDemos,
  ...aiDemos,
  ...vibeGitDemos,
  ...devopsDemos,
};
