import { getAllPosts } from "@/app/lib/posts";

export const dynamic = "force-dynamic";

const BASE = "https://liguiyu.com";

/**
 * /llms.txt — LLM 友好站点地图（llmstxt.org 规范）
 * 给 GPT / Claude / Perplexity 等 AI 爬虫一份精炼目录，快速理解站点内容
 */
export async function GET() {
  const posts = getAllPosts();

  const lines: string[] = [
    "# 李桂聿 · liguiyu.com",
    "",
    "> 全栈开发者 · AI 基础设施工程师 · 底层玩家。我让机器学会思考。",
    "> 李桂聿的个人网站：原创技术博客与计算机知识库（教程、工具评测、踩坑记录、词库、题库）。",
    "",
    "## 核心页面",
    "",
    "- [首页](https://liguiyu.com/): 个人介绍与站点导航",
    "- [博客](https://liguiyu.com/blog): 技术教程、工具体验、踩坑记录",
    "- [词库](https://liguiyu.com/glossary): 计算机术语通俗解释（前端/后端/设计/运维）",
    "- [题库](https://liguiyu.com/problems): 编程练习题集",
    "",
    "## 博客文章",
    "",
    ...posts.map(
      (p) => `- [${p.title}](${BASE}/blog/${p.slug}): ${p.description}`,
    ),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}