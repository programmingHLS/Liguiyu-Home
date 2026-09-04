"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, MessageCircle } from "lucide-react";

// ⚠️ 联系方式与 Footer.tsx 保持同步，改这里记得改那边
const CONTACTS = [
  { label: "QQ", value: "3477492305", hint: "加好友 · 备注「技术服务」", kind: "copy" as const },
  { label: "微信", value: "liguiyu666666666666", hint: "加好友 · 备注「技术服务」", kind: "copy" as const },
  { label: "邮箱", value: "contact@liguiyu.com", href: "mailto:contact@liguiyu.com?subject=技术服务咨询", hint: "发邮件 · 标题注明来意", kind: "mailto" as const },
];

function QqIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.395 15.035a39.548 39.548 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a38.97 38.97 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.369 1.598 0 7.138.209 7.481-.369.078-.132.132-.458-.301-.778-.482-.356-1.233-.646-1.846-.835 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673z" />
    </svg>
  );
}

const dim = "rgba(222,226,222,0.55)";
const dim2 = "rgba(222,226,222,0.38)";

export default function ContactPanel() {
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

  return (
    <div
      id="services-contact"
      className="relative overflow-hidden rounded-[28px] px-6 py-12 sm:px-12 sm:py-16"
      style={{ backgroundColor: "#1f1f1e" }}
    >
      {/* 装饰圆 */}
      <div aria-hidden className="pointer-events-none absolute rounded-full" style={{ width: 320, height: 320, top: "-40%", right: "-6%", border: "1.5px solid rgba(232,149,122,0.25)" }} />
      <div aria-hidden className="pointer-events-none absolute rounded-full" style={{ width: 6, height: 6, bottom: "18%", left: "8%", backgroundColor: "rgba(232,149,122,0.6)" }} />

      <div className="relative z-10 mx-auto max-w-[900px] text-center">
        <span className="text-[12px] font-[600] tracking-[0.22em] uppercase" style={{ fontFamily: "var(--font-body)", color: "rgba(232,149,122,0.85)" }}>
          📮 直接找我
        </span>
        <h2 className="mt-4 text-[30px] leading-[1.15] tracking-[-0.6px] font-[500] sm:text-[40px]" style={{ fontFamily: "var(--font-display)", color: "#e6e5dd" }}>
          想咨询或下单？挑一个方式直接联系
        </h2>
        <p className="mx-auto mt-4 max-w-[620px] text-[15px] leading-[1.7] font-[400]" style={{ fontFamily: "var(--font-body)", color: dim }}>
          说一句你想解决什么就行（例如“电脑最近特别卡”“想装一个 Agent”），我会先免费判断问题、给个估价，你点头才动手。本人在线回复，通常当天内答复。
        </p>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {CONTACTS.map((c) => {
            const icon =
              c.label === "QQ" ? <QqIcon size={22} /> : c.label === "微信" ? <MessageCircle size={22} /> : <Mail size={22} />;

            const inner = (
              <>
                <div className="transition-colors duration-300" style={{ color: dim }}>
                  {icon}
                </div>
                <span className="mt-1 text-[14px] font-[600]" style={{ fontFamily: "var(--font-body)", color: "#e6e5dd" }}>
                  {c.label}
                </span>
                <span className="mt-0.5 max-w-full truncate text-[12px] font-[400]" style={{ fontFamily: "var(--font-body)", color: dim2 }}>
                  {c.value}
                </span>
                <span className="mt-1 text-[11px] font-[400]" style={{ fontFamily: "var(--font-body)", color: "rgba(232,149,122,0.75)" }}>
                  {c.hint}
                </span>
              </>
            );

            const baseClass =
              "group flex flex-col items-center gap-0.5 rounded-[18px] px-4 py-6 text-center cursor-pointer no-underline transition-all duration-300 hover:scale-[1.04] hover:-translate-y-0.5";
            const baseStyle: React.CSSProperties = {
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              fontFamily: "var(--font-body)",
            };

            if (c.kind === "copy") {
              return (
                <button key={c.label} onClick={() => copy(c.value, c.label)} title={c.value} className={baseClass} style={baseStyle}>
                  {inner}
                </button>
              );
            }
            return (
              <a key={c.label} href={c.href} className={baseClass} style={baseStyle}>
                {inner}
              </a>
            );
          })}
        </div>

        <p className="mt-8 text-[13px] leading-[1.6] font-[400]" style={{ fontFamily: "var(--font-body)", color: dim2 }}>
          不确定自己的问题属不属于服务范围？直接问，免费判断，几句话能解决的就不收费。
        </p>
      </div>

      {/* Copy toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-8 left-1/2 z-50 flex max-w-[calc(100vw-32px)] -translate-x-1/2 items-center gap-2.5 rounded-full px-5 py-3 shadow-2xl"
            style={{ backgroundColor: "rgba(30,30,40,0.95)", border: "1px solid rgba(232,149,122,0.35)", backdropFilter: "blur(8px)" }}
          >
            <Check size={15} color="#e8957a" className="shrink-0" />
            <span className="text-[13px] font-[500] text-center whitespace-normal sm:whitespace-nowrap" style={{ fontFamily: "var(--font-body)", color: "#e6e5dd" }}>
              {toast}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
