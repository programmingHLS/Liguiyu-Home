"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useTheme } from "../components/ThemeProvider";
import Navbar from "../components/Navbar";
import PageGlow from "../components/PageGlow";
import ClickRipple from "../components/ClickRipple";
import InteractiveSection from "../components/InteractiveSection";
import { glossaryData } from "./data";
import type { GlossaryTerm, GlossaryCategory } from "./data";
import TermPreview from "./previews";

export default function GlossaryPage() {
  const { resolved } = useTheme();
  const isDark = resolved === "dark";
  const accent = isDark ? "#e8957a" : "#d97757";

  const [activeCategory, setActiveCategory] = useState<string>(glossaryData[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const currentCategory = glossaryData.find((c) => c.id === activeCategory) || glossaryData[0];

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    const results: { category: GlossaryCategory; term: GlossaryTerm }[] = [];
    for (const cat of glossaryData) {
      for (const term of cat.terms) {
        if (
          term.name.toLowerCase().includes(q) ||
          term.en.toLowerCase().includes(q) ||
          term.explanation.toLowerCase().includes(q)
        ) {
          results.push({ category: cat, term });
        }
      }
    }
    return results;
  }, [searchQuery]);

  const totalTerms = glossaryData.reduce((sum, c) => sum + c.terms.length, 0);

  const colors = {
    bg: isDark ? "#0d0d0b" : "#faf9f7",
    surface: isDark ? "rgba(30,28,23,0.92)" : "rgba(255,255,255,0.9)",
    border: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    text: isDark ? "#c2c1b6" : "#4a4840",
    textMuted: isDark ? "#98978f" : "#7d7b72",
    textFaint: isDark ? "rgba(152,151,143,0.6)" : "rgba(125,123,114,0.65)",
  };

  const termsToShow = searchResults
    ? searchResults.map((r) => r.term)
    : currentCategory.terms;

  return (
    <>
      <PageGlow />
      <ClickRipple />
      <div className="min-h-screen pt-[60px]" style={{ backgroundColor: colors.bg, fontFamily: "var(--font-body)" }}>
        <Navbar />

        <InteractiveSection id="glossary-list" theme="lab" className="!min-h-0 !py-8 !overflow-visible">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-[28px] sm:text-[36px] font-bold tracking-[-0.03em] leading-[1.1] mb-3" style={{ color: colors.text, fontFamily: "var(--font-display)" }}>
            Vibe Coding 术语图鉴
          </h1>
          <p className="text-[14px] leading-[1.7] max-w-[600px]" style={{ color: colors.textMuted }}>
            专为 Vibe Coding 新手准备——不用背代码，理解这些词，就能更精准地向 AI 描述需求。
          </p>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-[11px] px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: isDark ? "rgba(232,149,122,0.1)" : "rgba(217,119,87,0.07)", color: accent }}>
              {totalTerms} 个术语
            </span>
            <span className="text-[11px] px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", color: colors.textMuted }}>
              {glossaryData.length} 个分类
            </span>
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative max-w-[360px] mb-6">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: colors.textFaint }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索术语：试试「按钮」「动画」「部署」"
            className="w-full h-10 pl-9 pr-4 rounded-[10px] text-[13px] outline-none border transition-colors"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              color: colors.text,
              fontFamily: "var(--font-body)",
            }}
          />
        </div>

        {/* Category tabs - mobile horizontal scroll */}
        {!searchResults && (
          <div className="flex gap-2 glossary-scroll pb-3 mb-6 -mx-1 px-1 md:hidden">
            {glossaryData.map((cat) => {
              const active = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="shrink-0 px-3.5 py-2 rounded-[9px] text-[12px] font-medium border transition-all cursor-pointer whitespace-nowrap"
                  style={{
                    backgroundColor: active ? accent : "transparent",
                    color: active ? "#fff" : colors.textMuted,
                    borderColor: active ? accent : colors.border,
                  }}
                >
                  {cat.icon} {cat.name}
                  <span className="ml-1.5 text-[10px] opacity-60">{cat.terms.length}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Cards grid (shared by both branches) */}
        {(() => {
          const cards = (
            <AnimatePresence mode="popLayout">
              {termsToShow.map((term, index) => (
                <motion.div
                  key={term.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.2), ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/glossary/${term.id}`}
                    className="block no-underline rounded-[14px] border p-5 transition-all duration-200 hover:-translate-y-0.5 group"
                    style={{
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                      boxShadow: isDark ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Card title */}
                    <div className="flex items-baseline gap-2 mb-2">
                      <h3 className="text-[16px] font-bold tracking-[-0.01em]" style={{ color: colors.text }}>
                        {term.name}
                      </h3>
                      <span className="text-[12px] font-medium" style={{ color: accent }}>{term.en}</span>
                    </div>

                    {/* Quote */}
                    <p className="text-[13px] leading-[1.6] mb-3 line-clamp-2" style={{ color: colors.textMuted }}>
                      <span className="font-bold text-[16px] mr-1" style={{ color: accent }}>&ldquo;</span>
                      {term.quote || term.scene || term.explanation.slice(0, 60)}
                    </p>

                    {/* Visual preview */}
                    <TermPreview termId={term.id} previewType={term.preview} termName={term.name} termEn={term.en} category={searchResults ? searchResults.find((r) => r.term.id === term.id)?.category.id ?? activeCategory : activeCategory} />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          );

          if (searchResults) {
            return (
              <>
                <div className="mb-5">
                  <h2 className="text-[16px] font-semibold" style={{ color: colors.text }}>
                    搜索「{searchQuery}」
                  </h2>
                  <p className="text-[12px] mt-1" style={{ color: colors.textFaint }}>找到 {searchResults.length} 个结果</p>
                </div>

                {/* Card grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cards}
                </div>

                {termsToShow.length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-[32px] mb-3">🔍</p>
                    <p className="text-[14px]" style={{ color: colors.textMuted }}>没有找到匹配的术语</p>
                  </div>
                )}
              </>
            );
          }

          return (
            <div className="flex items-start gap-6">
              {/* Sidebar: vertical category list */}
              <aside className="hidden md:block w-[170px] lg:w-[190px] shrink-0 sticky top-[80px]">
                <div className="glossary-scroll-y max-h-[calc(100vh-150px)] flex flex-col gap-1 pr-1.5">
                  {glossaryData.map((cat) => {
                    const active = cat.id === activeCategory;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className="shrink-0 w-full px-3 py-2 rounded-[9px] text-[12px] font-medium border transition-all cursor-pointer whitespace-nowrap flex items-center gap-2"
                        style={{
                          backgroundColor: active ? accent : "transparent",
                          color: active ? "#fff" : colors.textMuted,
                          borderColor: active ? accent : colors.border,
                        }}
                      >
                        <span className="text-[13px] leading-none shrink-0">{cat.icon}</span>
                        <span className="flex-1 truncate text-left">{cat.name}</span>
                        <span className="text-[10px] opacity-60 shrink-0">{cat.terms.length}</span>
                      </button>
                    );
                  })}
                </div>
              </aside>

              <div className="flex-1 min-w-0">
                {/* Section header */}
                <div className="flex items-center gap-3 mb-5">
                  <h2 className="text-[18px] font-semibold tracking-[-0.01em]" style={{ color: colors.text }}>
                    {currentCategory.name}
                  </h2>
                  <span className="text-[12px]" style={{ color: colors.textFaint }}>{currentCategory.terms.length} 个条目</span>
                </div>

                {/* Card grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {cards}
                </div>
              </div>
            </div>
          );
        })()}
          </div>
        </InteractiveSection>
      </div>
    </>
  );
}
