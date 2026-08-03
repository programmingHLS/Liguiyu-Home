"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Quote, Sparkles, Lightbulb, CheckCircle2, XCircle, BookOpen } from "lucide-react";
import { useTheme } from "../../components/ThemeProvider";
import Navbar from "../../components/Navbar";
import PageGlow from "../../components/PageGlow";
import ClickRipple from "../../components/ClickRipple";
import InteractiveSection from "../../components/InteractiveSection";
import { demoComponents } from "../demos";
import type { GlossaryTerm, GlossaryCategory } from "../data";
import { getAdjacentTerms, glossaryData } from "../data";

export default function TermDetail({ term, category }: { term: GlossaryTerm; category: GlossaryCategory }) {
  const { resolved } = useTheme();
  const isDark = resolved === "dark";
  const accent = isDark ? "#e8957a" : "#d97757";
  const router = useRouter();
  const { prev, next } = getAdjacentTerms(term.id);
  const DemoComponent = term.demo ? demoComponents[term.demo] : null;

  // ── 侧边栏折叠 ──
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ── 悬停指示条（与博客文章目录同款弹簧动画）──
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });
  const termListRef = useRef<HTMLDivElement>(null);

  const handleHover = useCallback(
    (index: number | null, e?: React.MouseEvent<HTMLAnchorElement>) => {
      setHoveredIndex(index);
      if (index !== null && e && termListRef.current) {
        const listRect = termListRef.current.getBoundingClientRect();
        const targetRect = e.currentTarget.getBoundingClientRect();
        setIndicatorStyle({
          top: targetRect.top - listRect.top,
          height: targetRect.height,
        });
      }
    },
    []
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // 输入框/文本域/富文本内不劫持按键
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable)) return;
      if (e.key === "Escape") router.push("/glossary", { transitionTypes: ["nav-back"] });
      if (e.key === "ArrowLeft" && prev) router.push(`/glossary/${prev.id}`, { transitionTypes: ["nav-back"] });
      if (e.key === "ArrowRight" && next) router.push(`/glossary/${next.id}`, { transitionTypes: ["nav-forward"] });
    },
    [prev, next, router]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, [term.id]);

  const colors = {
    bg: isDark ? "#0d0d0b" : "#faf9f7",
    surface: isDark ? "rgba(30,28,23,0.92)" : "rgba(255,255,255,0.9)",
    border: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    text: isDark ? "#c2c1b6" : "#4a4840",
    textMuted: isDark ? "#98978f" : "#7d7b72",
    textFaint: isDark ? "rgba(152,151,143,0.6)" : "rgba(125,123,114,0.65)",
    accentBg: isDark ? "rgba(232,149,122,0.08)" : "rgba(217,119,87,0.06)",
    accentBorder: isDark ? "rgba(232,149,122,0.15)" : "rgba(217,119,87,0.12)",
    greenBg: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)",
    greenBorder: isDark ? "rgba(143,184,154,0.2)" : "rgba(95,138,107,0.15)",
    green: isDark ? "#8fb89a" : "#5f8a6b",
    redBg: isDark ? "rgba(212,131,111,0.08)" : "rgba(184,92,74,0.06)",
    redBorder: isDark ? "rgba(212,131,111,0.2)" : "rgba(184,92,74,0.15)",
    red: isDark ? "#d4836f" : "#b85c4a",
    codeBg: isDark ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.03)",
  };

  return (
    <>
      <PageGlow />
      <ClickRipple />
      <div className="min-h-screen pt-[60px]" style={{ backgroundColor: colors.bg, fontFamily: "var(--font-body)" }}>
        <Navbar />
        <InteractiveSection id="glossary-detail" theme="lab" className="!min-h-0 !py-8">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pb-24 min-w-0">
            <div className={`flex items-start ${sidebarOpen ? "gap-8" : "gap-0"}`}>
              {/* Left sidebar: categories + current category terms（可折叠，同博客目录交互） */}
              <AnimatePresence initial={false}>
                {sidebarOpen && (
                  <motion.aside
                    initial={{ width: 0, opacity: 0, marginRight: 0 }}
                    animate={{ width: 200, opacity: 1, marginRight: 32 }}
                    exit={{ width: 0, opacity: 0, marginRight: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="hidden lg:block shrink-0 sticky top-[80px] self-start overflow-hidden"
                  >
                    <div className="w-[200px]">
                      <div className="glossary-scroll-y max-h-[calc(100vh-150px)] flex flex-col gap-1 pr-1.5">
                        {/* Collapse button */}
                        <button
                          onClick={() => setSidebarOpen(false)}
                          className="shrink-0 self-end w-6 h-6 mb-1 rounded-[6px] border flex items-center justify-center cursor-pointer transition-all hover:opacity-75"
                          style={{ borderColor: colors.border, color: colors.textFaint }}
                          aria-label="收起目录"
                        >
                          <ChevronLeft size={13} />
                        </button>
                        <Link href="/glossary" transitionTypes={["nav-back"]} className="shrink-0 w-full px-3 py-2 rounded-[9px] text-[12px] font-medium border transition-colors hover:opacity-75 no-underline flex items-center gap-2" style={{ borderColor: colors.border, color: colors.textMuted }}>
                          <span className="text-[13px] leading-none shrink-0">📚</span>
                          <span className="flex-1 truncate text-left">全部术语</span>
                          <span className="text-[10px] opacity-60 shrink-0">{glossaryData.reduce((n, c) => n + c.terms.length, 0)}</span>
                        </Link>
                        {glossaryData.map((cat) => {
                          const isCurrent = cat.id === category.id;
                          return (
                            <div key={cat.id} className="shrink-0">
                              <Link
                                href="/glossary"
                                transitionTypes={["nav-back"]}
                                className="w-full px-3 py-1.5 rounded-[9px] text-[12px] font-medium border transition-all no-underline flex items-center gap-2"
                                style={{
                                  backgroundColor: isCurrent ? accent : "transparent",
                                  color: isCurrent ? "#fff" : colors.textMuted,
                                  borderColor: isCurrent ? accent : colors.border,
                                }}
                              >
                                <span className="text-[13px] leading-none shrink-0">{cat.icon}</span>
                                <span className="flex-1 truncate text-left">{cat.name}</span>
                                <span className="text-[10px] opacity-60 shrink-0">{cat.terms.length}</span>
                              </Link>
                              {isCurrent && (
                                <div
                                  ref={termListRef}
                                  onMouseLeave={() => handleHover(null)}
                                  className="ml-2.5 mt-1 mb-1.5 pl-2.5 border-l relative flex flex-col gap-0.5"
                                  style={{ borderColor: colors.border }}
                                >
                                  {/* Floating hover indicator — 与博客文章目录同款弹簧动画 */}
                                  <motion.div
                                    className="absolute left-0 right-0 rounded-[7px] pointer-events-none z-0"
                                    animate={
                                      hoveredIndex !== null
                                        ? { y: indicatorStyle.top, height: indicatorStyle.height, opacity: 1 }
                                        : { opacity: 0 }
                                    }
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    style={{ backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.045)" }}
                                  />
                                  {cat.terms.map((t, i) => {
                                    const isActive = t.id === term.id;
                                    return (
                                      <Link
                                        key={t.id}
                                        href={`/glossary/${t.id}`}
                                        transitionTypes={["nav-forward"]}
                                        onMouseEnter={(e) => handleHover(i, e)}
                                        className="no-underline px-2.5 py-1.5 rounded-[7px] text-[12px] transition-colors whitespace-nowrap overflow-hidden text-ellipsis relative z-10"
                                        style={{
                                          color: isActive ? accent : colors.textMuted,
                                          backgroundColor: isActive ? colors.accentBg : "transparent",
                                          fontWeight: isActive ? 600 : 400,
                                        }}
                                      >
                                        {t.name}
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.aside>
                )}
              </AnimatePresence>
              {/* Expand button（目录收起时显示） */}
              <AnimatePresence>
                {!sidebarOpen && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSidebarOpen(true)}
                    className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full border items-center justify-center cursor-pointer no-underline"
                    style={{ borderColor: colors.border, backgroundColor: colors.surface }}
                    aria-label="展开目录"
                  >
                    <ChevronRight size={16} style={{ color: colors.textMuted }} />
                  </motion.button>
                )}
              </AnimatePresence>
              <div className="flex-1 min-w-0">
                <div className="max-w-[780px] mx-auto">
        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-[12px] mb-2">
          <Link href="/glossary" transitionTypes={["nav-back"]} className="no-underline transition-colors hover:opacity-70" style={{ color: colors.textMuted }}>
            <span className="flex items-center gap-1"><ArrowLeft size={12} /> 术语图鉴</span>
          </Link>
          <span style={{ color: colors.textFaint }}>/</span>
          <span style={{ color: accent }}>{category.name}</span>
          <span style={{ color: colors.textFaint }}>/</span>
          <span style={{ color: colors.text }}>{term.name}</span>
        </motion.div>

        {/* Keyboard hint */}
        <div className="flex items-center gap-3 text-[10px] mb-6" style={{ color: colors.textFaint }}>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded border text-[9px] font-mono" style={{ borderColor: colors.border, backgroundColor: colors.codeBg }}>←</kbd>
            <kbd className="px-1.5 py-0.5 rounded border text-[9px] font-mono" style={{ borderColor: colors.border, backgroundColor: colors.codeBg }}>→</kbd>
            切换
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded border text-[9px] font-mono" style={{ borderColor: colors.border, backgroundColor: colors.codeBg }}>Esc</kbd>
            返回
          </span>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] leading-[1.1] mb-6"
          style={{ color: colors.text, fontFamily: "var(--font-display)" }}
        >
          {term.name}{" "}
          <span className="text-[20px] sm:text-[24px] font-medium" style={{ color: accent }}>{term.en}</span>
        </motion.h1>

        {/* Quote Block */}
        {(term.quote || term.scene) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-[14px] px-5 py-4 mb-8 border relative overflow-hidden"
            style={{ backgroundColor: colors.accentBg, borderColor: colors.accentBorder }}
          >
            <Quote size={28} className="absolute top-3 left-3 opacity-15" style={{ color: accent }} />
            <p className="text-[11px] font-semibold mb-1.5 tracking-[0.04em] uppercase" style={{ color: accent }}>你可能会说</p>
            <p className="text-[15px] leading-[1.7] pl-5" style={{ color: colors.text }}>
              {term.quote || term.scene}
            </p>
          </motion.div>
        )}

        {/* Definition */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mb-6">
          {term.definition ? (
            <>
              <p className="text-[16px] font-semibold leading-[1.6] mb-2" style={{ color: colors.text }}>{term.definition}</p>
              <p className="text-[14px] leading-[1.8]" style={{ color: colors.textMuted }}>{term.explanation}</p>
            </>
          ) : (
            <p className="text-[15px] leading-[1.8]" style={{ color: colors.text }}>{term.explanation}</p>
          )}
        </motion.div>

        {/* Aliases */}
        {term.aliases && term.aliases.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-8">
            <span className="text-[12px]" style={{ color: colors.textFaint }}>也常被叫作</span>
            {term.aliases.map((a) => (
              <span key={a} className="px-2.5 py-1 rounded-full text-[11px] font-medium border" style={{ borderColor: colors.border, backgroundColor: colors.codeBg, color: colors.textMuted }}>
                {a}
              </span>
            ))}
          </div>
        )}

        {/* Analogy */}
        <div className="flex gap-3 mb-8 p-4 rounded-[12px] border" style={{ borderColor: colors.border, backgroundColor: colors.surface }}>
          <Lightbulb size={16} className="shrink-0 mt-0.5" style={{ color: isDark ? "#e8c47a" : "#c99a3c" }} />
          <div>
            <p className="text-[11px] font-semibold mb-1 tracking-[0.02em]" style={{ color: colors.textFaint }}>生活类比</p>
            <p className="text-[14px] leading-[1.75]" style={{ color: colors.text }}>{term.analogy}</p>
          </div>
        </div>

        {/* Interactive Demo */}
        {DemoComponent && (
          <div className="rounded-[14px] border p-5 sm:p-6 mb-8" style={{ borderColor: colors.accentBorder, backgroundColor: colors.accentBg }}>
            <p className="text-[11px] font-semibold mb-4 flex items-center gap-1.5 tracking-[0.03em]" style={{ color: accent }}>
              🎮 动手试试
            </p>
            <DemoComponent />
          </div>
        )}

        {/* Quiz */}
        {term.quiz && <QuizBlock quiz={term.quiz} colors={colors} />}

        {/* AI Prompt */}
        {(term.aiPrompt || term.scene) && (
          <div className="rounded-[12px] px-5 py-4 mb-8 border" style={{ backgroundColor: colors.greenBg, borderColor: colors.greenBorder }}>
            <p className="text-[11px] font-semibold mb-2 flex items-center gap-1.5 tracking-[0.03em]" style={{ color: colors.green }}>
              <Sparkles size={12} /> 你可以这样告诉 AI
            </p>
            <p className="text-[14px] leading-[1.75]" style={{ color: colors.text }}>
              {term.aiPrompt || term.scene}
            </p>
          </div>
        )}

        {/* Confusions */}
        {term.confusions && term.confusions.length > 0 && (
          <section className="mb-8">
            <h2 className="text-[18px] font-semibold mb-4 tracking-[-0.01em]" style={{ color: colors.text }}>容易混淆？这样区分</h2>
            <div className="space-y-3">
              {term.confusions.map((c, i) => (
                <div key={i} className="rounded-[12px] border p-4 flex items-start gap-3" style={{ borderColor: colors.border, backgroundColor: colors.surface }}>
                  <span className="text-[13px] font-semibold shrink-0" style={{ color: accent }}>{term.name} {term.en}</span>
                  <span className="text-[16px] font-bold shrink-0" style={{ color: colors.textFaint }}>≠</span>
                  <div>
                    <span className="text-[13px] font-semibold" style={{ color: colors.textMuted }}>{c.term} {c.en}</span>
                    <p className="text-[13px] mt-1 leading-[1.6]" style={{ color: colors.textMuted }}>{c.difference}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* When to use */}
        {term.whenToUse && term.whenToUse.length > 0 && (
          <section className="mb-8">
            <h2 className="text-[18px] font-semibold mb-4 tracking-[-0.01em]" style={{ color: colors.text }}>什么时候用</h2>
            <div className="space-y-3">
              {term.whenToUse.map((u, i) => (
                <div key={i} className="flex gap-3 items-start rounded-[10px] p-3.5 border" style={{ borderColor: colors.greenBorder, backgroundColor: colors.greenBg }}>
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: colors.green }} />
                  <div>
                    <p className="text-[13px] font-semibold mb-0.5" style={{ color: colors.text }}>{u.title}</p>
                    <p className="text-[12.5px] leading-[1.6]" style={{ color: colors.textMuted }}>{u.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* When NOT to use */}
        {term.whenNotToUse && term.whenNotToUse.length > 0 && (
          <section className="mb-8">
            <h2 className="text-[18px] font-semibold mb-4 tracking-[-0.01em]" style={{ color: colors.text }}>什么时候不用</h2>
            <div className="space-y-3">
              {term.whenNotToUse.map((u, i) => (
                <div key={i} className="flex gap-3 items-start rounded-[10px] p-3.5 border" style={{ borderColor: colors.redBorder, backgroundColor: colors.redBg }}>
                  <XCircle size={16} className="shrink-0 mt-0.5" style={{ color: colors.red }} />
                  <div>
                    <p className="text-[13px] font-semibold mb-0.5" style={{ color: colors.text }}>{u.title}</p>
                    <p className="text-[12.5px] leading-[1.6]" style={{ color: colors.textMuted }}>{u.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Anatomy */}
        {term.anatomy && term.anatomy.length > 0 && (
          <section className="mb-8">
            <h2 className="text-[18px] font-semibold mb-4 tracking-[-0.01em]" style={{ color: colors.text }}>组成结构 · Anatomy</h2>
            <div className="space-y-3">
              {term.anatomy.map((a, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0" style={{ backgroundColor: colors.accentBg, color: accent }}>
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-[14px] font-semibold" style={{ color: colors.text }}>{a.part}</span>
                    <span className="text-[11px] font-mono ml-2" style={{ color: colors.textFaint }}>{a.en}</span>
                    <p className="text-[13px] mt-0.5 leading-[1.6]" style={{ color: colors.textMuted }}>{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Variants */}
        {term.variants && term.variants.length > 0 && (
          <section className="mb-8">
            <h2 className="text-[18px] font-semibold mb-4 tracking-[-0.01em]" style={{ color: colors.text }}>常见变体 · Variants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {term.variants.map((v, i) => (
                <div key={i} className="rounded-[12px] border p-4 space-y-2" style={{ borderColor: colors.border, backgroundColor: colors.surface }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold" style={{ color: colors.text }}>{v.name}</span>
                    <span className="text-[10px] font-mono" style={{ color: colors.textFaint }}>{v.en}</span>
                  </div>
                  {v.visual && (
                    <div className="h-14 rounded-[8px] flex items-center justify-center text-[11px]" style={{ backgroundColor: colors.codeBg, color: colors.textMuted }}>
                      {v.visual}
                    </div>
                  )}
                  <p className="text-[11.5px] leading-[1.5]" style={{ color: colors.textMuted }}>{v.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Scenarios */}
        {term.scenarios && term.scenarios.length > 0 && (
          <section className="mb-8">
            <h2 className="text-[18px] font-semibold mb-4 tracking-[-0.01em]" style={{ color: colors.text }}>典型使用场景</h2>
            <div className="space-y-5">
              {term.scenarios.map((s, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                    <span className="text-[13px] font-semibold" style={{ color: colors.text }}>{s.title}</span>
                  </div>
                  <div className="ml-4 rounded-[12px] border p-4 text-[12px]" style={{ borderColor: colors.border, backgroundColor: colors.codeBg, color: colors.textMuted }}>
                    {s.visual}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {term.references && term.references.length > 0 && (
          <section className="mb-8">
            <h2 className="text-[18px] font-semibold mb-4 tracking-[-0.01em] flex items-center gap-2" style={{ color: colors.text }}>
              <BookOpen size={16} /> 延伸阅读
            </h2>
            <div className="space-y-2">
              {term.references.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-[10px] border no-underline transition-all hover:translate-x-1"
                  style={{ borderColor: colors.border, backgroundColor: colors.surface, color: colors.text }}
                >
                  <span className="text-[13px] flex-1">{r.title}</span>
                  <ExternalLink size={12} style={{ color: colors.textFaint }} />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Navigation footer */}
        <div className="flex items-center justify-between pt-8 border-t" style={{ borderColor: colors.border }}>
          {prev ? (
            <Link href={`/glossary/${prev.id}`} transitionTypes={["nav-back"]} className="flex items-center gap-2 no-underline group transition-opacity hover:opacity-70">
              <ChevronLeft size={16} style={{ color: accent }} />
              <div>
                <p className="text-[10px]" style={{ color: colors.textFaint }}>上一个</p>
                <p className="text-[13px] font-medium" style={{ color: colors.text }}>{prev.name}</p>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/glossary/${next.id}`} transitionTypes={["nav-forward"]} className="flex items-center gap-2 no-underline group transition-opacity hover:opacity-70 text-right">
              <div>
                <p className="text-[10px]" style={{ color: colors.textFaint }}>下一个</p>
                <p className="text-[13px] font-medium" style={{ color: colors.text }}>{next.name}</p>
              </div>
              <ChevronRight size={16} style={{ color: accent }} />
            </Link>
          ) : <div />}
        </div>
          </div>
              </div>
            </div>
          </div>

      {/* Side navigation arrows (desktop) */}
      <motion.div
        animate={{ opacity: sidebarOpen ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-30"
        style={{ pointerEvents: sidebarOpen ? "auto" : "none" }}
      >
        {prev && (
          <Link href={`/glossary/${prev.id}`} transitionTypes={["nav-back"]} className="w-10 h-10 rounded-full border flex items-center justify-center no-underline transition-all hover:scale-110" style={{ borderColor: colors.border, backgroundColor: colors.surface }}>
            <ChevronLeft size={18} style={{ color: colors.textMuted }} />
          </Link>
        )}
      </motion.div>
      <motion.div
        animate={{ opacity: sidebarOpen ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-30"
        style={{ pointerEvents: sidebarOpen ? "auto" : "none" }}
      >
        {next && (
          <Link href={`/glossary/${next.id}`} transitionTypes={["nav-forward"]} className="w-10 h-10 rounded-full border flex items-center justify-center no-underline transition-all hover:scale-110" style={{ borderColor: colors.border, backgroundColor: colors.surface }}>
            <ChevronRight size={18} style={{ color: colors.textMuted }} />
          </Link>
        )}
      </motion.div>
        </InteractiveSection>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   Quiz Block
   ═══════════════════════════════════════════ */

function QuizBlock({ quiz, colors }: { quiz: NonNullable<GlossaryTerm["quiz"]>; colors: Record<string, string> }) {
  const [selected, setSelected] = useState<string | null>(null);
  const isCorrect = selected === quiz.answer;

  return (
    <section className="mb-8 rounded-[14px] border p-5" style={{ borderColor: colors.border, backgroundColor: colors.surface }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: colors.accentBg, color: colors.accentBorder }}>选择题</span>
        <span className="text-[11px]" style={{ color: colors.textFaint }}>选择一个你认为最合适的答案</span>
      </div>
      <p className="text-[14px] font-semibold mb-4 leading-[1.6]" style={{ color: colors.text }}>{quiz.question}</p>
      <div className="space-y-2">
        {quiz.options.map((opt) => {
          const isSelected = selected === opt.label;
          const showResult = selected !== null;
          const isAnswer = opt.label === quiz.answer;
          let borderColor = colors.border;
          let bgColor = "transparent";
          if (showResult && isAnswer) { borderColor = colors.green; bgColor = colors.greenBg; }
          else if (showResult && isSelected && !isAnswer) { borderColor = colors.red; bgColor = colors.redBg; }
          else if (isSelected) { borderColor = colors.accentBorder; bgColor = colors.accentBg; }

          return (
            <button
              key={opt.label}
              onClick={() => !selected && setSelected(opt.label)}
              className="w-full text-left px-4 py-3 rounded-[10px] border transition-all cursor-pointer flex items-start gap-3"
              style={{ borderColor, backgroundColor: bgColor }}
            >
              <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5" style={{ borderColor: isSelected ? colors.accentBorder : colors.border, color: isSelected ? colors.accentBorder : colors.textFaint }}>
                {opt.label}
              </span>
              <span className="text-[13px] leading-[1.5]" style={{ color: colors.text }}>{opt.text}</span>
            </button>
          );
        })}
      </div>
      {selected && (
        <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-[12.5px] leading-[1.6] px-4 py-2.5 rounded-[8px]" style={{ backgroundColor: isCorrect ? colors.greenBg : colors.redBg, color: isCorrect ? colors.green : colors.red }}>
          {isCorrect ? "✅ 正确！" : "❌ 不太对。"} {quiz.explanation}
        </motion.p>
      )}
    </section>
  );
}
