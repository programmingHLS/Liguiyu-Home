import { getAllPosts, getPostBySlug } from "@/app/lib/posts";

export const dynamic = "force-dynamic";

const BASE = "https://liguiyu.com";

/** 极简 HTML → 纯文本：标签换行、去标签、解实体、压缩空行 */
function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h[1-6]|li|tr|blockquote|pre|ul|ol)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * /llms-full.txt — LLM 完整版（llmstxt.org 规范）
 * 包含站点全部公开文章正文，AI 无需逐个抓取即可理解全站内容
 */
export async function GET() {
  const posts = getAllPosts();

  const sections: string[] = [
    "# 李桂聿 · liguiyu.com（完整版）",
    "",
    "> 全栈开发者 · AI 基础设施工程师 · 底层玩家。我让机器学会思考。",
    "",
    "## 站点信息",
    "",
    "- 站长：李桂聿（Guiyu Li）",
    "- 语言：中文（zh-CN）",
    "- 内容类型：原创技术博客、教程、踩坑记录、计算机词库、练习题",
    "- 博客文章共 " + posts.length + " 篇，以下为全文：",
    "",
  ];

  for (const p of posts) {
    sections.push(`## ${p.title}`, "");
    sections.push(`> 文章链接: ${BASE}/blog/${p.slug}`);
    if (p.date) sections.push(`> 发布日期: ${p.date}`);
    sections.push("");
    if (p.description) sections.push(`${p.description}`, "");
    const full = getPostBySlug(p.slug);
    if (full) {
      sections.push(htmlToText(full.html), "");
    }
  }

  return new Response(sections.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}