import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/app/lib/posts";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import InteractiveSection from "@/app/components/InteractiveSection";
import PageGlow from "@/app/components/PageGlow";
import ClickRipple from "@/app/components/ClickRipple";
import BlogComments from "./comments";
import ReadingProgress from "./reading-progress";
import BackToTop from "./back-to-top";
import ArticleToc from "./article-toc";
import ArticleContent from "./article-content";
import BackToList from "./back-to-list";

interface Props { params: Promise<{ slug: string }>; }

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getPostBySlug(slug);
  if (!data) return { title: "文章未找到" };
  return {
    title: `${data.meta.title} · 南航工具箱`,
    description: data.meta.description,
    keywords: data.meta.keywords?.split(",").map((k) => k.trim()),
    alternates: {
      canonical: `/blog/${data.meta.slug}`,
    },
    openGraph: {
      title: `${data.meta.title} · 李桂聿`,
      description: data.meta.description,
      type: "article",
      url: `https://liguiyu.com/blog/${data.meta.slug}`,
      images: [
        {
          url: "/og-default.png",
          width: 1200,
          height: 630,
          alt: data.meta.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const data = getPostBySlug(slug);
  if (!data) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.meta.title,
    description: data.meta.description,
    datePublished: data.meta.date,
    dateModified: data.meta.date,
    inLanguage: "zh-CN",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://liguiyu.com/blog/${data.meta.slug}`,
    },
    author: {
      "@type": "Person",
      name: (data.meta as any).author || "李桂聿",
    },
    publisher: {
      "@type": "Person",
      name: "李桂聿",
      url: "https://liguiyu.com",
    },
    keywords: data.meta.keywords,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <PageGlow />
      <ClickRipple />
      <ReadingProgress />
      <BackToTop />
      <Navbar />
      <main className="flex-1 relative">
        <div className="pt-20">
        <InteractiveSection id="blog-post" theme="lab">
        <div className="max-w-[1100px] mx-auto px-6 relative">
          {/* TOC sidebar — self-positioned */}
          <ArticleToc html={data.html} />

          {/* Article — centered */}
          <article className="max-w-[760px] mx-auto">
            <BackToList />
            <div className="mb-10">
              <div className="blog-date text-[13px] font-[500] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                {data.meta.date}
              </div>
              <h1 className="blog-title text-[32px] sm:text-[40px] font-[500] leading-[1.2] mb-4" style={{ fontFamily: "var(--font-display)" }}>
                {data.meta.title}
              </h1>
              {(data.meta as any).author && (
                <div className="text-[13px] mb-4" style={{ fontFamily: "var(--font-body)", color: "rgba(128,128,128,0.6)" }}>
                  ✍️ {(data.meta as any).author}
                </div>
              )}
              {data.meta.keywords && (
                <div className="flex flex-wrap gap-2">
                  {data.meta.keywords.split(",").map((kw) => (
                    <span key={kw} className="text-[12px] px-2.5 py-1 rounded-[6px] blog-tag" style={{ fontFamily: "var(--font-body)" }}>
                      {kw.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <ArticleContent html={data.html} />

            <div className="mt-10">
              <BackToList />
            </div>
            <div className="mt-16 pt-10 blog-comments-divider">
              <BlogComments slug={slug} />
            </div>
          </article>
        </div>
        </InteractiveSection>
        </div>
      </main>
      <Footer />
    </>
  );
}
