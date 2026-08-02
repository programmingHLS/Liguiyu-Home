"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../components/ThemeProvider";

export function usePalette() {
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

export function CodeToggle({ code, children, label = "查看源代码" }: { code: string; children: React.ReactNode; label?: string }) {
  const p = usePalette();
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="space-y-3">
      <button onClick={() => setShowCode(!showCode)} className="px-3 py-1.5 rounded-[7px] text-[11px] font-medium border transition-all cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent, backgroundColor: showCode ? p.accentBg : "transparent" }}>
        {showCode ? "🎮 回到交互" : `📝 ${label}`}
      </button>
      <AnimatePresence mode="wait">
        {showCode ? (
          <motion.pre key="code" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="rounded-[10px] p-3.5 text-[11.5px] font-mono overflow-x-auto border leading-[1.7] whitespace-pre-wrap" style={{ backgroundColor: p.codeBg, borderColor: p.border, color: p.textMuted }}>{code}</motion.pre>
        ) : (
          <motion.div key="interactive" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>{children}</motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* 通用小按钮 */
export function MiniBtn({ active, onClick, children, p }: { active?: boolean; onClick?: () => void; children: React.ReactNode; p: ReturnType<typeof usePalette> }) {
  return (
    <button onClick={onClick} className="px-2 py-1 rounded-[5px] text-[10px] border cursor-pointer transition-all" style={{ borderColor: active ? p.accent : p.border, backgroundColor: active ? p.accentBg : "transparent", color: active ? p.accent : p.textMuted }}>{children}</button>
  );
}

/* 通用标签 */
export function Tag({ children, color, p }: { children: React.ReactNode; color?: string; p: ReturnType<typeof usePalette> }) {
  return <span className="px-1.5 py-0.5 rounded-[4px] text-[9px] font-mono" style={{ backgroundColor: color || p.accentBg, color: color ? "#fff" : p.accent }}>{children}</span>;
}

/* 通用流程箭头 */
export function Arrow({ p }: { p: ReturnType<typeof usePalette> }) {
  return <span className="text-[10px] mx-1" style={{ color: p.textFaint }}>→</span>;
}

/* 通用盒子 */
export function Box({ children, highlight, p, className = "" }: { children: React.ReactNode; highlight?: boolean; p: ReturnType<typeof usePalette>; className?: string }) {
  return <div className={`rounded-[6px] border px-2 py-1.5 text-[10px] ${className}`} style={{ borderColor: highlight ? p.accent : p.border, backgroundColor: highlight ? p.accentBg : p.surface, color: highlight ? p.accent : p.textMuted }}>{children}</div>;
}
