"use client";

import { useTheme } from "@/app/components/ThemeProvider";

export default function HeroSection() {
  const { resolved: theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 text-center transition-colors duration-700"
      style={{ backgroundColor: isDark ? "#0d0d0b" : "#f8f9fa" }}
    >
      {/* 静态几何装饰（深浅两用，低透明度） */}
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{ width: 420, height: 420, top: "-12%", right: "-8%", border: "1.5px solid rgba(217,119,87,0.22)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{ width: 240, height: 240, bottom: "-6%", left: "-4%", border: "1px solid rgba(217,119,87,0.18)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{ width: 8, height: 8, top: "24%", left: "16%", backgroundColor: "rgba(217,119,87,0.5)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{ width: 5, height: 5, bottom: "28%", right: "18%", backgroundColor: "rgba(217,119,87,0.4)" }}
      />

      <div className="relative z-10 mx-auto flex max-w-[820px] flex-col items-center">
        {/* Badge */}
        <span
          className="mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-[500] tracking-[0.02em]"
          style={{
            fontFamily: "var(--font-body)",
            color: "#d97757",
            backgroundColor: isDark ? "rgba(217,119,87,0.12)" : "rgba(217,119,87,0.08)",
            border: isDark ? "1px solid rgba(217,119,87,0.3)" : "1px solid rgba(217,119,87,0.18)",
          }}
        >
          🛠️ 技术服务 · 电脑 / AI / 网站 / 服务器
        </span>

        <h1
          className="text-heading text-[38px] leading-[1.12] tracking-[-0.8px] font-[500] sm:text-[56px] sm:leading-[1.08] sm:tracking-[-1.1px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          搞不定的电脑问题，
          <br />
          交给我。
        </h1>

        <p className="text-body mt-6 max-w-[560px] text-[16px] leading-[1.7] font-[400] sm:text-[18px]" style={{ fontFamily: "var(--font-body)" }}>
          电脑卡顿、系统重装、AI Agent 部署、NAS 与网站搭建——
          你负责说想实现什么，剩下的技术问题交给我。明码标价，先报价后动手。
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#services-list"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-[16px] font-[500] no-underline transition-all duration-300 hover:shadow-[0_0_24px_rgba(217,119,87,0.35)]"
            style={{ fontFamily: "var(--font-body)", backgroundColor: "#d97757", color: "#ffffff" }}
          >
            看看能解决什么
          </a>
          <a
            href="#services-contact"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-[16px] font-[500] no-underline transition-colors duration-300"
            style={{
              fontFamily: "var(--font-body)",
              color: "#d97757",
              border: "1.5px solid rgba(217,119,87,0.55)",
              backgroundColor: isDark ? "rgba(217,119,87,0.06)" : "rgba(255,255,255,0.4)",
            }}
          >
            📮 直接联系我
          </a>
        </div>
      </div>
    </section>
  );
}
