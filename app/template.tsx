"use client";

import { ViewTransition } from "react";

/**
 * 全局页面过渡：路由跳转时旧页滑出、新页滑入（方向性动画）。
 * - nav-forward：内容向左滑出、新内容从右滑入（深入）
 * - nav-back：内容向右滑出、新内容从左滑入（返回）
 * - 默认：交叉淡化（auto）
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "auto",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "auto",
      }}
    >
      {children}
    </ViewTransition>
  );
}
