"use client";

import { motion } from "framer-motion";
import { CalendarDays, Heart, Users, Zap } from "lucide-react";
import InteractiveSection from "./InteractiveSection";
import TiltCard from "./TiltCard";

function GithubIcon({ size = 22, color, className }: { size?: number; color?: string; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const stats = [
  { icon: Users, value: "AI 专业", label: "南航在读" },
  { icon: Zap, value: "全栈", label: "Web + AI" },
  { icon: GithubIcon, value: "开源", label: "GitHub 全公开" },
  { icon: CalendarDays, value: "02 年", label: "持续更新中" },
];

const archLayers = [
  { label: "同学访问", accent: "#e8957a", bg: "rgba(232,149,122,0.08)" },
  { label: "Cloudflare CDN + DNS", accent: "#e8957a", bg: "rgba(232,149,122,0.12)" },
  { label: "服务器 · Docker 集群", accent: "#d97757", bg: "rgba(217,119,87,0.15)" },
];

export default function About() {
  return (
    <InteractiveSection id="about" theme="blueprint">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Left: Text */}
        <div className="flex-1">
          <h2 className="text-heading text-[48px] leading-[1.1] tracking-[-0.96px] font-[500] mb-6" style={{ fontFamily: "var(--font-display)" }}>
            关于我
          </h2>
          <p className="text-body text-[18px] leading-[1.45] tracking-[-0.18px] font-[400] mb-5" style={{ fontFamily: "var(--font-body)" }}>
            我是李桂聿（Guiyu Li），南京航空航天大学人工智能专业学生。白天上课，晚上写代码——从 Web 全栈到 AI，喜欢把想法做成真实可用的东西。
          </p>
          <p className="text-body text-[18px] leading-[1.45] tracking-[-0.18px] font-[400] mb-5" style={{ fontFamily: "var(--font-body)" }}>
            我在宿舍搭了一台服务器，跑着自己的网站、工具和 AI 服务。没有云厂商账单，没有第三方数据收集，所有代码开源在 GitHub。
          </p>
          <p className="text-body text-[18px] leading-[1.45] tracking-[-0.18px] font-[400] mb-8" style={{ fontFamily: "var(--font-body)" }}>
            做过的项目：实时手势识别系统（天目启航 · 校级优秀）、交互式点云框架，还有这个工具箱里的所有工具。
          </p>
          <div className="flex flex-col gap-2.5">
            <a href="https://github.com/programmingWTF" target="_blank" rel="noopener noreferrer" className="text-accent inline-flex items-center gap-2 text-[16px] font-[500] no-underline transition-colors hover:text-[#e8957a] w-fit" style={{ fontFamily: "var(--font-body)" }}>
              GitHub → programmingWTF
            </a>
            <a href="https://github.com/LiGuiyu-AI" target="_blank" rel="noopener noreferrer" className="text-accent inline-flex items-center gap-2 text-[16px] font-[500] no-underline transition-colors hover:text-[#e8957a] w-fit" style={{ fontFamily: "var(--font-body)" }}>
              🦞 认识我的 AI 助手龙虾 →
            </a>
          </div>
        </div>

        {/* Right: Architecture */}
        <div className="flex-1 w-full">
          <div className="arch-diagram relative rounded-[24px] overflow-hidden p-8">
            <div className="text-center text-[13px] font-[500] tracking-[0.2em] uppercase mb-6" style={{ fontFamily: "var(--font-body)", color: "rgba(217,119,87,0.6)" }}>
              本站架构
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full max-w-[360px] flex flex-col gap-2 items-center">
                {archLayers.map((item, i) => (
                  <div key={item.label} className="w-full flex flex-col items-center gap-2">
                    {i > 0 && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 8 }}
                        transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                        className="w-px arch-connector"
                      />
                    )}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                      className="w-full rounded-[12px] px-5 py-3.5 text-center"
                      style={{ backgroundColor: item.bg, border: `1px solid ${item.accent}20` }}
                    >
                      <span className="text-[14px] font-[500]" style={{ fontFamily: "var(--font-body)", color: item.accent }}>
                        {item.label}
                      </span>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
        {stats.map((s, i) => (
          <TiltCard key={s.label} className="rounded-[16px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            className="text-center p-6 rounded-[16px] card-surface-stat"
          >
            <s.icon size={22} color="#d97757" className="mx-auto mb-3" />
            <div className="text-heading text-[20px] font-[600] mb-1" style={{ fontFamily: "var(--font-display)" }}>{s.value}</div>
            <div className="text-body text-[13px] font-[400]" style={{ fontFamily: "var(--font-body)" }}>{s.label}</div>
          </motion.div>
          </TiltCard>
        ))}
      </div>
    </InteractiveSection>
  );
}
