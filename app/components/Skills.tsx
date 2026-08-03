"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/app/lib/animations";
import InteractiveSection from "./InteractiveSection";

const categories = [
  {
    title: "Web 前端",
    desc: "这个网站的每一像素，从设计到实现",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Web 后端",
    desc: "接口、数据库、认证，一条龙自己来",
    skills: ["Node.js", "Python", "REST API", "SQLite"],
  },
  {
    title: "AI 与机器学习",
    desc: "从实时手势识别到交互式点云处理",
    skills: ["PyTorch", "MediaPipe", "OpenCV", "NumPy"],
  },
  {
    title: "基建与部署",
    desc: "宿舍服务器 + NAS，全部自己动手运维",
    skills: ["Docker", "Linux", "Nginx", "Cloudflare"],
  },
];

const exploring = ["Rust", "CUDA", "分布式推理"];

export default function Skills() {
  return (
    <InteractiveSection id="skills" theme="blueprint">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-heading text-[48px] leading-[1.1] tracking-[-0.96px] font-[500] mb-4" style={{ fontFamily: "var(--font-display)" }}>
          技术栈
        </h2>
        <p className="text-body text-[16px] leading-[1.5] font-[400] mb-12" style={{ fontFamily: "var(--font-body)" }}>
          把想法变成真实工具所需的一切
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid sm:grid-cols-2 gap-5 w-full max-w-[860px] text-left"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutExpo } },
              }}
              whileHover={{ y: -4 }}
              className="rounded-[20px] p-6 sm:p-7 transition-all duration-300"
              style={{
                backgroundColor: "rgba(217,119,87,0.04)",
                border: "1px solid rgba(217,119,87,0.18)",
              }}
            >
              <h3 className="text-accent text-[17px] font-[600] mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
                {cat.title}
              </h3>
              <p className="text-body text-[13px] font-[400] mb-4" style={{ fontFamily: "var(--font-body)" }}>
                {cat.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="text-accent inline-flex items-center px-3.5 py-1.5 rounded-full text-[13px] font-[500] transition-all duration-300 cursor-default hover:scale-105"
                    style={{
                      fontFamily: "var(--font-body)",
                      backgroundColor: "rgba(217,119,87,0.08)",
                      border: "1px solid rgba(217,119,87,0.22)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-body text-[13px] font-[400] tracking-[0.02em] mt-12"
          style={{ fontFamily: "var(--font-body)" }}
        >
          正在探索：
          {exploring.map((s, i) => (
            <span key={s}>
              <span className="text-accent font-[500]">{s}</span>
              {i < exploring.length - 1 && <span className="opacity-60"> · </span>}
            </span>
          ))}
        </motion.p>
      </div>
    </InteractiveSection>
  );
}
