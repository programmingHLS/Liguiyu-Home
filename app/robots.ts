import type { MetadataRoute } from "next";

/**
 * robots.txt — 搜索引擎 + AI 爬虫放行策略
 * 个人站，内容自愿被索引，因此显式放行主流 AI 爬虫
 * （GPTBot / ClaudeBot 等默认遵循 robots.txt，部分站点屏蔽，这里统一放行）
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // 通用规则：全部放行，仅屏蔽管理/接口/登录区
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/auth", "/api/", "/league-materials"],
      },
      {
        // AI / 大模型爬虫显式放行（与上述规则不冲突，语义明确）
        userAgent: [
          "GPTBot", // OpenAI 抓取（模型训练 + 搜索）
          "OAI-SearchBot", // ChatGPT 联网搜索
          "ChatGPT-User", // ChatGPT 直接访问链接
          "ClaudeBot", // Anthropic Claude
          "Claude-User", // Claude 对话中访问
          "anthropic-ai",
          "PerplexityBot", // Perplexity 搜索
          "Google-Extended", // Google AI / Gemini
          "CCBot", // Common Crawl（公开数据集）
          "Amazonbot", // Amazon / Alexa
          "Applebot-Extended", // Apple Intelligence
          "Bytespider", // 字节跳动 / 豆包
          "Meta-ExternalAgent", // Meta AI
          "cohere-ai",
          "cohere-training-crawler",
          "Diffbot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://liguiyu.com/sitemap.xml",
  };
}