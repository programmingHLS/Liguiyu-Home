import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import PageGlow from "@/app/components/PageGlow";
import GlobalGrid from "@/app/components/GlobalGrid";
import ClickRipple from "@/app/components/ClickRipple";
import HeroSection from "./HeroSection";
import ContactPanel from "./ContactPanel";
import { serviceCategories, regionCards, promises } from "./data";

export const metadata: Metadata = {
  title: "技术服务",
  description:
    "电脑救援、性能优化、系统重装、AI Agent 部署、NAS 与网站搭建——南航天目湖校区可线下、全国可远程。明码标价，先报价后动手。",
  keywords: [
    "技术服务",
    "电脑维修",
    "重装系统",
    "电脑优化",
    "AI Agent 安装",
    "NAS 搭建",
    "网站部署",
    "南京航空航天大学",
    "天目湖校区",
  ],
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageGlow />
      <GlobalGrid />
      <ClickRipple />
      <Navbar />
      <main className="flex-1">
        <HeroSection />

        {/* ── 服务范围 ── */}
        <section className="px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 text-center">
              <span className="text-[12px] font-[600] tracking-[0.22em] uppercase text-accent" style={{ fontFamily: "var(--font-body)" }}>
                📍 服务范围
              </span>
              <h2 className="text-heading mt-3 text-[28px] leading-[1.15] tracking-[-0.6px] font-[500] sm:text-[40px]" style={{ fontFamily: "var(--font-display)" }}>
                先看你在哪个校区
              </h2>
              <p className="text-body mx-auto mt-4 max-w-[600px] text-[15px] leading-[1.7] font-[400]" style={{ fontFamily: "var(--font-body)" }}>
                南航三个校区的同学都能找我；远程服务不受地域限制，全国都可以。
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {regionCards.map((r) => (
                <div key={r.title} className="card-surface rounded-[20px] p-7">
                  <div className="flex items-center gap-3">
                    <span className="text-[26px]">{r.emoji}</span>
                    <div>
                      <h3 className="text-heading text-[20px] font-[600]" style={{ fontFamily: "var(--font-body)" }}>
                        {r.title}
                      </h3>
                      <p className="text-body text-[13px] font-[400]" style={{ fontFamily: "var(--font-body)" }}>
                        {r.subtitle}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {r.rows.map((row) => (
                      <li key={row.t} className="flex items-center gap-2.5">
                        <span
                          className="w-5 shrink-0 text-[13px] leading-none"
                          style={{
                            fontFamily: "var(--font-body)",
                            color: row.ok === "yes" ? "#16a34a" : row.ok === "no" ? "#dc2626" : "#95938a",
                          }}
                        >
                          {row.ok === "yes" ? "✔" : row.ok === "no" ? "✖" : "·"}
                        </span>
                        <span className="text-sub text-[14px] font-[500]" style={{ fontFamily: "var(--font-body)" }}>
                          {row.t}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div
              className="mt-5 flex flex-col items-start gap-3 rounded-[16px] border px-6 py-5 sm:flex-row sm:items-center"
              style={{
                backgroundColor: "rgba(217,119,87,0.06)",
                borderColor: "rgba(217,119,87,0.25)",
                fontFamily: "var(--font-body)",
              }}
            >
              <span className="text-[22px]">⚠️</span>
              <p className="text-[14px] leading-[1.65] font-[400]">
                <span className="font-[600]" style={{ color: "#d97757" }}>系统重装等需要实体操作电脑的服务，仅支持天目湖校区线下。</span>
                <span className="text-body"> 其余服务（软件、AI、环境、NAS、网站类）全部可以远程完成，不受地域限制。</span>
              </p>
            </div>
          </div>
        </section>

        {/* ── 服务与价格 ── */}
        <section id="services-list" className="px-6 pb-20 sm:pb-24">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 text-center">
              <span className="text-[12px] font-[600] tracking-[0.22em] uppercase text-accent" style={{ fontFamily: "var(--font-body)" }}>
                🧾 服务与价格
              </span>
              <h2 className="text-heading mt-3 text-[28px] leading-[1.15] tracking-[-0.6px] font-[500] sm:text-[40px]" style={{ fontFamily: "var(--font-display)" }}>
                明码标价，按复杂度定价
              </h2>
              <p className="text-body mx-auto mt-4 max-w-[600px] text-[15px] leading-[1.7] font-[400]" style={{ fontFamily: "var(--font-body)" }}>
                “起”表示基础价，实际按问题复杂度与所需时间浮动。拿不准价格？直接问，免费估价。
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {serviceCategories.map((cat) => (
                <article key={cat.id} className="card-surface flex flex-col rounded-[20px] p-7">
                  <header className="mb-5 flex items-start gap-4">
                    <span className="text-[28px] leading-none">{cat.emoji}</span>
                    <div>
                      <h3 className="text-heading text-[21px] leading-[1.2] font-[600]" style={{ fontFamily: "var(--font-body)" }}>
                        {cat.title}
                      </h3>
                      <p className="text-body mt-1 text-[13px] leading-[1.5] font-[400]" style={{ fontFamily: "var(--font-body)" }}>
                        {cat.tagline}
                      </p>
                    </div>
                  </header>

                  {cat.chips && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {cat.chips.map((chip) => (
                        <span
                          key={chip}
                          className="text-body rounded-full px-3 py-1 text-[12px] font-[400]"
                          style={{
                            fontFamily: "var(--font-body)",
                            border: "1px solid rgba(125,123,114,0.25)",
                          }}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}

                  <ul className="flex flex-col">
                    {cat.items.map((item, i) => (
                      <li
                        key={item.name}
                        className={`flex items-start justify-between gap-4 py-3 ${i > 0 ? "mt-1" : ""}`}
                        style={{ borderTop: i > 0 ? "1px solid rgba(125,123,114,0.15)" : undefined }}
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sub text-[15px] font-[600]" style={{ fontFamily: "var(--font-body)" }}>
                              {item.name}
                            </span>
                            {item.offlineOnly && (
                              <span
                                className="text-accent rounded-[6px] px-2 py-[2px] text-[11px] font-[500]"
                                style={{
                                  fontFamily: "var(--font-body)",
                                  backgroundColor: "rgba(217,119,87,0.1)",
                                  border: "1px solid rgba(217,119,87,0.3)",
                                }}
                              >
                                仅线下 · 天目湖
                              </span>
                            )}
                          </div>
                          {item.desc && (
                            <p className="text-body mt-1 text-[13px] leading-[1.55] font-[400]" style={{ fontFamily: "var(--font-body)" }}>
                              {item.desc}
                            </p>
                          )}
                        </div>
                        <span
                          className={`shrink-0 text-[15px] font-[600] whitespace-nowrap ${item.price === "免费" ? "" : "text-accent"}`}
                          style={{
                            fontFamily: "var(--font-body)",
                            ...(item.price === "免费" ? { color: "#16a34a" } : {}),
                          }}
                        >
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 服务承诺 ── */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {promises.map((p) => (
                <div key={p.title} className="card-surface rounded-[18px] p-6">
                  <span className="text-[22px]">{p.emoji}</span>
                  <h3 className="text-heading mt-3 text-[16px] font-[600]" style={{ fontFamily: "var(--font-body)" }}>
                    {p.title}
                  </h3>
                  <p className="text-body mt-1.5 text-[13px] leading-[1.6] font-[400]" style={{ fontFamily: "var(--font-body)" }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 联系面板（提前醒目放置） ── */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-[1200px]">
            <ContactPanel />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
