"use client";

import { easeOutExpo } from "@/app/lib/animations";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import StarfieldBackground from "./StarfieldBackground";

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: easeOutExpo,
    },
  },
};

export default function Hero() {
  const { resolved: theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const cnName = ["李", "桂", "聿"];
  const enName = ["（", "G", "u", "i", "y", "u", " ", "L", "i", "）"];

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-700"
      style={{ 
        backgroundColor: isDark ? "#12120f" : "#f8f9fa",
        willChange: "transform" 
      }}
    >
      {/* Three.js Starfield — at the end, on top */}
      <StarfieldBackground />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-[800px] mt-[48px]"
      >
        {/* Badge — 高级发光胶囊 */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: easeOutExpo }}
          whileHover={{ scale: 1.05, boxShadow: isDark ? "0 0 30px rgba(217,119,87,0.3)" : "0 0 20px rgba(217,119,87,0.2)" }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10 cursor-default transition-all duration-300 backdrop-blur-md"
          style={{
            backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.05)",
            boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.2)" : "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-[16px] leading-none"
          >
            👋
          </motion.span>
          <span
            className="text-[14px] font-[500] tracking-wide"
            style={{
              fontFamily: "var(--font-body)",
              color: isDark ? "#d6d5cd" : "#4a4840",
            }}
          >
            Hi，我是李桂聿
          </span>
        </motion.div>

        {/* Title — 中文名大字 + 英文名小字 */}
        <motion.h1
          className="flex items-baseline justify-center gap-3 sm:gap-5 text-[48px] sm:text-[72px] leading-[1.1] tracking-[-0.02em] font-[400] mb-8 select-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <motion.span
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="whitespace-nowrap"
            style={{ color: isDark ? "#c2c1b6" : "#4a4840" }}
          >
            {cnName.map((ch, i) => (
              <motion.span key={i} variants={letterVariants} className="inline-block">
                {ch}
              </motion.span>
            ))}
          </motion.span>
          <motion.span
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.9 } } }}
            className="text-[20px] sm:text-[32px] whitespace-nowrap"
            style={{ color: "#d97757" }}
          >
            {enName.map((ch, i) => (
              <motion.span key={i} variants={letterVariants} className="inline-block">
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>

        {/* Signature — 橙色小字 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
          className="text-[14px] font-[400] tracking-[0.18em] uppercase mb-8 select-none"
          style={{
            fontFamily: "var(--font-body)",
            color: isDark ? "rgba(217,119,87,0.7)" : "rgba(217,119,87,0.85)",
          }}
        >
          Artificial Intelligence @ NUAA
        </motion.p>

        {/* Subtitle — 能力介绍 + 邀约 */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1.8, ease: easeOutExpo }}
          className="text-[18px] sm:text-[22px] leading-[1.6] tracking-[-0.01em] font-[400] max-w-[600px] mb-14 select-none"
          style={{
            fontFamily: "var(--font-body)",
            color: isDark ? "#d6d5cd" : "#7d7b72",
          }}
        >
          全栈开发 · AI · 把想法做成真实可用的工具<br/>
          如果有比赛或项目想邀请参加，欢迎随时联系我
        </motion.p>

        {/* CTA — 主按钮 + 次级锚点导航 */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 2.0 } },
          }}
          className="flex flex-col items-center gap-7"
        >
          {/* 主 CTA 行 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
            }}
            className="flex flex-col sm:flex-row items-center gap-5"
          >
            {[
              {
                href: "#tools",
                label: "探索我的项目",
                primary: true,
              },
              {
                href: "https://github.com/programmingWTF",
                label: "GitHub →",
                primary: false,
              },
            ].map((btn) => (
              <motion.a
                key={btn.label}
                href={btn.href}
                target={btn.primary ? undefined : "_blank"}
                rel={btn.primary ? undefined : "noopener noreferrer"}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-[16px] font-[500] no-underline transition-all duration-300 select-none backdrop-blur-md`}
                style={
                  btn.primary
                    ? {
                        backgroundColor: isDark ? "rgba(255,255,255,0.9)" : "#0f172a",
                        color: isDark ? "#4a4840" : "#c2c1b6",
                        boxShadow: isDark 
                          ? "0 10px 30px -10px rgba(255,255,255,0.3)" 
                          : "0 10px 30px -10px rgba(15,23,42,0.4)",
                      }
                    : {
                        backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                        color: isDark ? "#c2c1b6" : "#4a4840",
                        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
                      }
                }
              >
                {btn.label}
              </motion.a>
            ))}
          </motion.div>

          {/* 次级锚点导航 — 轻量小字 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
            }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {[
              { href: "#skills", label: "技术栈" },
              { href: "#blog", label: "博客" },
              { href: "#tools", label: "工具箱" },
              { href: "#about", label: "关于我" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[14px] font-[500] no-underline transition-all duration-300 hover:text-[#e8957a] hover:-translate-y-0.5"
                style={{
                  fontFamily: "var(--font-body)",
                  color: isDark ? "rgba(214,213,205,0.4)" : "rgba(74,72,64,0.4)",
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => {
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="p-3 rounded-full backdrop-blur-sm transition-colors"
          style={{ 
            backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.03)",
          }}
        >
          <ChevronDown size={18} color={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"} />
        </motion.div>
      </motion.div>
    </section>
  );
}
