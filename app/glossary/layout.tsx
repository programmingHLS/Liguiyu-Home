import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "术语图鉴 · Vibe Coding 术语大全",
  description: "专为 Vibe Coding 新手准备——不用背代码，理解这些词，就能更精准地向 AI 描述需求。",
};

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
