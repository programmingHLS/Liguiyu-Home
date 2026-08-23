import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "./components/Providers";
import "./globals.css";

const monaspaceRadonFrozen = localFont({
  variable: "--font-geist-mono",
  src: [
    {
      path: "./fonts/MonaspaceRadonFrozen-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/MonaspaceRadonFrozen-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/MonaspaceRadonFrozen-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/MonaspaceRadonFrozen-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://liguiyu.com"),
  title: {
    default: "李桂聿 · liguiyu.com",
    template: "%s · 李桂聿",
  },
  description:
    "全栈开发者 · AI 基础设施工程师 · 底层玩家。我让机器学会思考。",
  keywords: ["李桂聿", "全栈开发", "AI", "OpenClaw", "3D打印", "基础设施"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "李桂聿 · liguiyu.com",
    description: "全栈开发者 · AI 基础设施工程师 · 底层玩家",
    type: "website",
    locale: "zh_CN",
    siteName: "李桂聿 · liguiyu.com",
    url: "https://liguiyu.com",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "李桂聿 · liguiyu.com — 全栈开发者 · AI 基础设施工程师",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "李桂聿 · liguiyu.com",
    description: "全栈开发者 · AI 基础设施工程师 · 底层玩家",
    images: ["/og-default.png"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "李桂聿 · liguiyu.com",
  url: "https://liguiyu.com",
  description: "全栈开发者 · AI 基础设施工程师 · 底层玩家。我让机器学会思考。",
  inLanguage: "zh-CN",
  author: {
    "@type": "Person",
    name: "李桂聿",
    url: "https://liguiyu.com",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "李桂聿",
  alternateName: "Guiyu Li",
  url: "https://liguiyu.com",
  image: "https://liguiyu.com/og-default.png",
  jobTitle: "全栈开发者 / AI 基础设施工程师",
  knowsAbout: [
    "全栈开发",
    "AI Agent",
    "OpenClaw",
    "3D打印",
    "计算机视觉",
    "基础设施",
  ],
  sameAs: [
    "https://github.com/programmingWTF",
    "https://github.com/programmingHLS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${monaspaceRadonFrozen.variable} h-full antialiased`}
      style={{ "--font-display": "Georgia, 'Noto Serif SC', 'Source Han Serif SC', 'PingFang SC', 'Microsoft YaHei', serif", "--font-body": "Georgia, 'Noto Serif SC', 'Source Han Serif SC', 'PingFang SC', 'Microsoft YaHei', serif" } as any}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}