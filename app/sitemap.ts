import type { MetadataRoute } from "next";
import { getAllPosts } from "@/app/lib/posts";
import { glossaryData } from "./glossary/data";

export const dynamic = "force-dynamic";

/**
 * sitemap.xml — 全站 URL 清单
 * 包含：首页 / 博客（列表+文章）/ 词库（列表+条目）/ 题库入口
 * 受保护页面（admin、league-materials、api、auth）不收录
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://liguiyu.com";
  const now = new Date();

  const posts = getAllPosts();
  const glossaryTerms = glossaryData.flatMap((cat) =>
    cat.terms.map((t) => t.id),
  );

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    {
      url: `${base}/glossary`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...glossaryTerms.map((id) => ({
      url: `${base}/glossary/${id}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    {
      url: `${base}/problems`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}