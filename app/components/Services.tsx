"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const MotionLink = motion.create(Link);
import { Bot, LifeBuoy, Gauge, Monitor, Boxes, Server } from "lucide-react";
import InteractiveSection from "./InteractiveSection";

const services = [
  { icon: Bot, title: "AI & Agent", desc: "Agent 安装、配置调优、本地 AI 部署——把 AI 装好、配好、用起来。", price: "¥29 起" },
  { icon: LifeBuoy, title: "电脑救援", desc: "卡顿、蓝屏、报错、连不上网……说现象我判断，先免费诊断。", price: "免费诊断" },
  { icon: Gauge, title: "性能优化", desc: "从基础清理到深度分析，定位“为什么这么慢”并解决。", price: "¥20 起" },
  { icon: Monitor, title: "Windows 与系统", desc: "重装系统、新机全家桶、迁移备份。天目湖校区可线下。", price: "¥49 起" },
  { icon: Boxes, title: "开发环境 · 虚拟机", desc: "虚拟机、WSL / Docker、编程环境、CUDA，一次配好。", price: "¥30 起" },
  { icon: Server, title: "NAS · 网站 · 部署", desc: "家庭服务器、Docker 服务、域名 HTTPS、网站上线。", price: "¥49 起" },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <InteractiveSection id="services" theme="lab">
      <div ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mb-16 text-center">
          <h2 className="text-heading text-[32px] sm:text-[48px] leading-[1.1] tracking-[-0.96px] font-[500] mb-4" style={{ fontFamily: "var(--font-display)" }}>技术服务</h2>
          <p className="text-body text-[18px] leading-[1.3] tracking-[-0.18px] font-[400] mx-auto max-w-[560px]" style={{ fontFamily: "var(--font-body)" }}>电脑、AI、网站、服务器——搞不定的交给我。南航天目湖校区可线下，全国可远程。</p>
        </motion.div>

        <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }} initial="hidden" animate={inView ? "visible" : "hidden"} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc) => (
            <MotionLink
              key={svc.title}
              href="/services"
              transitionTypes={["nav-forward"]}
              variants={{ hidden: { opacity: 0, y: 50, scale: 0.92, filter: "blur(4px)" }, visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
              whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
              className="group relative rounded-[16px] p-7 no-underline overflow-hidden card-surface"
              style={{
                backgroundColor: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 1px 1px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.06)",
                "--card-accent": "#d97757",
                "--card-accent-08": "#d9775714",
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1), 0 0 40px rgba(217,119,87,0.09)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 1px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.06)";
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(400px circle at 50% 0%, rgba(217,119,87,0.03) 0%, transparent 70%)" }} />
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: "rgba(217,119,87,0.07)", color: "#d97757" }}><svc.icon size={20} /></div>
                <span className="text-[12px] font-[600] px-2.5 py-1 rounded-[6px] text-accent" style={{ fontFamily: "var(--font-body)", backgroundColor: "rgba(217,119,87,0.08)", border: "1px solid rgba(217,119,87,0.18)" }}>{svc.price}</span>
              </div>
              <h3 className="text-sub text-[18px] leading-[1.2] tracking-[-0.18px] font-[600] mb-2.5 transition-colors duration-300" style={{ fontFamily: "var(--font-body)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#d97757"; }} onMouseLeave={(e) => { e.currentTarget.style.color = ""; }}>{svc.title}</h3>
              <p className="text-body text-[15px] leading-[1.55] font-[400] mb-5" style={{ fontFamily: "var(--font-body)" }}>{svc.desc}</p>
              <div className="flex items-center gap-1.5 mt-auto">
                <span className="text-[14px] font-[500] group-hover:translate-x-0.5 transition-transform duration-300" style={{ fontFamily: "var(--font-body)", color: "#d97757" }}>了解详情</span>
                <motion.span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "#d97757" }}>→</motion.span>
              </div>
            </MotionLink>
          ))}
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="text-body mt-10 text-center text-[14px] font-[400]" style={{ fontFamily: "var(--font-body)" }}>
          明码标价 · 先报价后动手 · 配置含 7 天售后 ·{" "}
          <Link href="/services" transitionTypes={["nav-forward"]} className="text-accent font-[600] no-underline">
            查看全部服务与价格 →
          </Link>
        </motion.p>
      </div>
    </InteractiveSection>
  );
}
