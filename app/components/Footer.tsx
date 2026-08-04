"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, MessageCircle } from "lucide-react";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function QqIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.395 15.035a39.548 39.548 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a38.97 38.97 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.369 1.598 0 7.138.209 7.481-.369.078-.132.132-.458-.301-.778-.482-.356-1.233-.646-1.846-.835 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673z"/>
    </svg>
  );
}

type ContactItem = {
  label: string;
  icon: (p: { size?: number }) => React.ReactNode;
  kind: "link" | "mailto" | "copy";
  href?: string;
  value?: string;
};

const guiyuContacts: ContactItem[] = [
  { label: "GitHub", icon: GithubIcon, kind: "link", href: "https://github.com/programmingWTF", value: "programmingWTF" },
  { label: "邮箱", icon: Mail, kind: "mailto", href: "mailto:contact@liguiyu.com", value: "contact@liguiyu.com" },
  { label: "QQ", icon: QqIcon, kind: "copy", value: "3477492305" },
  { label: "微信", icon: MessageCircle, kind: "copy", value: "liguiyu666666666666" },
];

const lobsterContacts: ContactItem[] = [
  { label: "GitHub", icon: GithubIcon, kind: "link", href: "https://github.com/LiGuiyu-AI", value: "LiGuiyu-AI" },
  { label: "邮箱", icon: Mail, kind: "mailto", href: "mailto:liguiyu@agent.qq.com", value: "liguiyu@agent.qq.com" },
];

const dim = "rgba(222,226,222,0.5)";
const dim2 = "rgba(222,226,222,0.35)";

export default function Footer() {
  const [toast, setToast] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast(`已复制 ${label}：${value}`);
    } catch {
      setToast("复制失败，请手动复制");
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToast(null), 2200);
  };

  const renderItem = (c: ContactItem) => {
    const inner = (
      <>
        <div className="transition-colors duration-300" style={{ color: dim }}>
          <c.icon size={20} />
        </div>
        <span className="text-[13px] font-[500] transition-colors group-hover:text-[#e8957a]" style={{ color: dim }}>
          {c.label}
        </span>
        <span className="text-[11px] font-[400] truncate max-w-full px-1" style={{ color: dim2 }}>
          {c.value}
        </span>
      </>
    );

    if (c.kind === "link") {
      return (
        <a
          key={c.label}
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-2 px-4 py-4 rounded-[14px] no-underline cursor-pointer transition-all hover:scale-[1.04] hover:-translate-y-0.5"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", fontFamily: "var(--font-body)" }}
        >
          {inner}
        </a>
      );
    }

    if (c.kind === "mailto") {
      return (
        <a
          key={c.label}
          href={c.href}
          className="group flex flex-col items-center gap-2 px-4 py-4 rounded-[14px] no-underline cursor-pointer transition-all hover:scale-[1.04] hover:-translate-y-0.5"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", fontFamily: "var(--font-body)" }}
        >
          {inner}
        </a>
      );
    }

    return (
      <button
        key={c.label}
        onClick={() => c.value && copy(c.value, c.label)}
        title={c.value}
        className="group flex flex-col items-center gap-2 px-4 py-4 rounded-[14px] border-none cursor-pointer transition-all hover:scale-[1.04] hover:-translate-y-0.5"
        style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", fontFamily: "var(--font-body)" }}
      >
        {inner}
      </button>
    );
  };

  return (
    <footer className="py-20 px-6" style={{ backgroundColor: "#1f1f29" }}>
      <div className="mx-auto max-w-[1200px] flex flex-col items-center text-center">
        <div id="footer-contact" className="w-full">
          <h3 className="text-[16px] font-[500] mb-10 tracking-[0.08em] uppercase" style={{ fontFamily: "var(--font-body)", color: "rgba(222,226,222,0.4)" }}>
            — Let&apos;s Connect —
          </h3>

          <div className="grid md:grid-cols-2 gap-5 w-full max-w-[900px] mx-auto mb-16 text-left">
            {/* 组 A：桂鱼（人） */}
            <div className="rounded-[20px] p-6 sm:p-7" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-between mb-5">
                <span className="text-[13px] font-[600] tracking-[0.08em] uppercase" style={{ fontFamily: "var(--font-body)", color: "rgba(222,226,222,0.45)" }}>
                  李桂聿 · 人类
                </span>
                <span className="text-[11px] font-[400]" style={{ fontFamily: "var(--font-body)", color: dim2 }}>
                  🧑‍💻 作者本人
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {guiyuContacts.map(renderItem)}
              </div>
            </div>

            {/* 组 B：龙虾（AI 助手） */}
            <div className="rounded-[20px] p-6 sm:p-7" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(217,119,87,0.2)" }}>
              <div className="flex items-center justify-between mb-5">
                <span className="text-[13px] font-[600] tracking-[0.08em] uppercase" style={{ fontFamily: "var(--font-body)", color: "rgba(232,149,122,0.75)" }}>
                  🦞 龙虾 · AI 助手
                </span>
                <span className="text-[11px] font-[400]" style={{ fontFamily: "var(--font-body)", color: dim2 }}>
                  桂鱼养的龙虾
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {lobsterContacts.map(renderItem)}
              </div>
              <p className="mt-4 text-[12px] font-[400] leading-[1.6]" style={{ fontFamily: "var(--font-body)", color: dim2 }}>
                桂鱼养的 AI 龙虾，邮箱 / GitHub 都能联系我 🦞
              </p>
            </div>
          </div>
        </div>

        <p className="text-[20px] font-[400] mb-12" style={{ fontFamily: "var(--font-display)", color: "rgba(222,226,222,0.45)", letterSpacing: "0.04em" }}>
          Artificial Intelligence @ NUAA
        </p>

        <div className="w-full pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(222,226,222,0.08)" }}>
          <span className="text-[13px] font-[400]" style={{ fontFamily: "var(--font-body)", color: "rgba(222,226,222,0.4)" }}>
            liguiyu.com © {new Date().getFullYear()} All Rights Reserved
          </span>
        </div>
      </div>

      {/* Copy toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full shadow-2xl max-w-[calc(100vw-32px)]"
            style={{ backgroundColor: "rgba(30,30,40,0.95)", border: "1px solid rgba(232,149,122,0.35)", backdropFilter: "blur(8px)" }}
          >
            <Check size={15} color="#e8957a" className="shrink-0" />
            <span className="text-[13px] font-[500] whitespace-normal sm:whitespace-nowrap text-center" style={{ fontFamily: "var(--font-body)", color: "#e6e5dd" }}>
              {toast}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
