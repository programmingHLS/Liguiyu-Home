"use client";

import { useTheme } from "../components/ThemeProvider";

/**
 * Unique visual preview per term.
 * Uses term name + category to generate a distinctive CSS mockup.
 * Returns null if no meaningful preview can be generated.
 */
export default function TermPreview({ termName, termEn, category, previewType }: {
  termName: string;
  termEn?: string;
  category?: string;
  previewType?: string;
}) {
  const { resolved } = useTheme();
  const isDark = resolved === "dark";
  const accent = isDark ? "#e8957a" : "#d97757";
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const surface = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
  const text = isDark ? "#98978f" : "#7d7b72";
  const textFaint = isDark ? "rgba(152,151,143,0.5)" : "rgba(125,123,114,0.5)";
  const accentBg = isDark ? "rgba(232,149,122,0.1)" : "rgba(217,119,87,0.08)";
  const green = isDark ? "#8fb89a" : "#5f8a6b";
  const yellow = isDark ? "#e8c47a" : "#c99a3c";
  const blue = isDark ? "#7ba3c9" : "#4a7fa5";

  const box = { backgroundColor: surface, borderColor: border };

  // ─── Term-specific unique previews ───
  const name = termName.toLowerCase();
  const en = (termEn || "").toLowerCase();

  // HTML
  if (name === "html" || en.includes("hyper")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[9px] space-y-0.5 overflow-hidden" style={{ ...box, color: text }}>
      <div><span style={{ color: textFaint }}>&lt;</span><span style={{ color: accent }}>h1</span><span style={{ color: textFaint }}>&gt;</span><span style={{ color: text }}>我的网页</span><span style={{ color: textFaint }}>&lt;/</span><span style={{ color: accent }}>h1</span><span style={{ color: textFaint }}>&gt;</span></div>
      <div><span style={{ color: textFaint }}>&lt;</span><span style={{ color: accent }}>p</span><span style={{ color: textFaint }}>&gt;</span><span style={{ color: text }}>正文内容...</span><span style={{ color: textFaint }}>&lt;/</span><span style={{ color: accent }}>p</span><span style={{ color: textFaint }}>&gt;</span></div>
      <div><span style={{ color: textFaint }}>&lt;</span><span style={{ color: accent }}>button</span><span style={{ color: textFaint }}>&gt;</span><span style={{ color: text }}>点击</span><span style={{ color: textFaint }}>&lt;/</span><span style={{ color: accent }}>button</span><span style={{ color: textFaint }}>&gt;</span></div>
    </div>
  );

  // CSS
  if (name === "css" || en.includes("cascading")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[9px] space-y-0.5 overflow-hidden" style={{ ...box, color: text }}>
      <div><span style={{ color: accent }}>.card</span> {"{"}</div>
      <div className="pl-3"><span style={{ color: blue }}>border-radius</span>: <span style={{ color: yellow }}>12px</span>;</div>
      <div className="pl-3"><span style={{ color: blue }}>box-shadow</span>: <span style={{ color: yellow }}>0 4px 12px</span>;</div>
      <div className="pl-3"><span style={{ color: blue }}>transition</span>: <span style={{ color: yellow }}>all 0.3s</span>;</div>
      <div>{"}"}</div>
    </div>
  );

  // JSX (must be before JavaScript check)
  if (name === "jsx" || en.includes("javascript xml")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[9px] space-y-0.5 overflow-hidden" style={{ ...box, color: text }}>
      <div><span style={{ color: accent }}>return</span> (</div>
      <div className="pl-3">&lt;<span style={{ color: accent }}>div</span> <span style={{ color: blue }}>className</span>=<span style={{ color: green }}>"card"</span>&gt;</div>
      <div className="pl-5">&lt;<span style={{ color: accent }}>h1</span>&gt;{"{title}"}&lt;/&gt;</div>
      <div className="pl-3">&lt;/<span style={{ color: accent }}>div</span>&gt;</div>
      <div>)</div>
    </div>
  );

  // JavaScript
  if (name === "javascript" || en === "javascript (js)") return (
    <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[9px] space-y-0.5 overflow-hidden" style={{ ...box, color: text }}>
      <div><span style={{ color: accent }}>const</span> btn = <span style={{ color: blue }}>document</span>.<span style={{ color: accent }}>querySelector</span>(<span style={{ color: green }}>'.btn'</span>)</div>
      <div>btn.<span style={{ color: accent }}>addEventListener</span>(<span style={{ color: green }}>'click'</span>, () =&gt; {"{"}</div>
      <div className="pl-3"><span style={{ color: blue }}>alert</span>(<span style={{ color: green }}>'Hello!'</span>)</div>
      <div>{"})"}</div>
    </div>
  );

  // React
  if (name === "react" || en === "react") return (
    <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[9px] space-y-0.5 overflow-hidden" style={{ ...box, color: text }}>
      <div><span style={{ color: accent }}>function</span> <span style={{ color: blue }}>Counter</span>() {"{"}</div>
      <div className="pl-3"><span style={{ color: accent }}>const</span> [n, setN] = <span style={{ color: blue }}>useState</span>(<span style={{ color: yellow }}>0</span>)</div>
      <div className="pl-3"><span style={{ color: accent }}>return</span> &lt;<span style={{ color: accent }}>button</span>&gt;{"{n}"}&lt;/&gt;</div>
      <div>{"}"}</div>
    </div>
  );

  // Component
  if (name.includes("组件") || en.includes("component")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center gap-2" style={box}>
      <div className="flex flex-col gap-1.5">
        <div className="px-2 py-1 rounded-[5px] text-[8px] font-medium border" style={{ borderColor: accent + "40", color: accent, backgroundColor: accentBg }}>Card</div>
        <div className="px-2 py-1 rounded-[5px] text-[8px] font-medium border" style={{ borderColor: green + "40", color: green, backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)" }}>Button</div>
        <div className="px-2 py-1 rounded-[5px] text-[8px] font-medium border" style={{ borderColor: blue + "40", color: blue, backgroundColor: isDark ? "rgba(123,163,201,0.08)" : "rgba(74,127,165,0.06)" }}>Input</div>
      </div>
      <div className="text-[8px] leading-[1.5]" style={{ color: textFaint }}>
        可复用<br/>独立封装<br/>Props 传入
      </div>
    </div>
  );

  // Responsive
  if (name.includes("响应") || en.includes("responsive")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-end justify-center gap-3" style={box}>
      <div className="w-[50px] h-[60px] rounded-[4px] border flex flex-col overflow-hidden" style={{ borderColor: border }}>
        <div className="h-3 border-b flex items-center px-1" style={{ borderColor: border }}><div className="w-3 h-1 rounded-full" style={{ backgroundColor: accentBg }} /></div>
        <div className="flex-1 p-1 space-y-0.5"><div className="h-1 rounded-full" style={{ backgroundColor: surface }} /><div className="h-1 rounded-full w-3/4" style={{ backgroundColor: surface }} /></div>
      </div>
      <div className="w-[35px] h-[50px] rounded-[4px] border flex flex-col overflow-hidden" style={{ borderColor: border }}>
        <div className="h-2 border-b flex items-center px-0.5" style={{ borderColor: border }}><div className="w-2 h-0.5 rounded-full" style={{ backgroundColor: accentBg }} /></div>
        <div className="flex-1 p-0.5 space-y-0.5"><div className="h-0.5 rounded-full" style={{ backgroundColor: surface }} /><div className="h-0.5 rounded-full" style={{ backgroundColor: surface }} /></div>
      </div>
      <div className="w-[20px] h-[35px] rounded-[3px] border flex flex-col overflow-hidden" style={{ borderColor: border }}>
        <div className="h-1.5 border-b" style={{ borderColor: border }} />
        <div className="flex-1 p-0.5"><div className="h-0.5 rounded-full" style={{ backgroundColor: surface }} /></div>
      </div>
    </div>
  );

  // Animation
  if (name.includes("动画") || name.includes("动效") || en.includes("animation")) return (
    <div className="h-[88px] rounded-[10px] border flex items-center justify-center gap-3" style={box}>
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: accent }} />
        <div className="absolute inset-1 rounded-full" style={{ backgroundColor: accentBg, border: `1.5px solid ${accent}50` }} />
      </div>
      <div className="space-y-1.5">
        <div className="h-1.5 w-14 rounded-full animate-pulse" style={{ backgroundColor: accent + "30" }} />
        <div className="h-1.5 w-10 rounded-full animate-pulse" style={{ backgroundColor: surface, animationDelay: "0.3s" }} />
        <div className="h-1.5 w-12 rounded-full animate-pulse" style={{ backgroundColor: surface, animationDelay: "0.6s" }} />
      </div>
    </div>
  );

  // Flexbox
  if (name.includes("弹性") || name.includes("flex") || en.includes("flexbox")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex flex-col justify-center gap-1.5" style={box}>
      <div className="flex gap-1.5 justify-between">
        <div className="w-6 h-6 rounded-[4px] flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: accentBg, color: accent }}>1</div>
        <div className="w-6 h-6 rounded-[4px] flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: accentBg, color: accent }}>2</div>
        <div className="w-6 h-6 rounded-[4px] flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: accentBg, color: accent }}>3</div>
      </div>
      <div className="text-[7px] font-mono text-center" style={{ color: textFaint }}>justify-content: space-between</div>
      <div className="flex gap-1.5 justify-center">
        <div className="w-6 h-6 rounded-[4px] flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: surface, color: textFaint }}>A</div>
        <div className="w-6 h-6 rounded-[4px] flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: surface, color: textFaint }}>B</div>
      </div>
    </div>
  );

  // Grid
  if (name.includes("网格") || name.includes("grid") || en.includes("grid")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 grid grid-cols-3 grid-rows-2 gap-1.5" style={box}>
      {[1,2,3,4,5,6].map(i => (
        <div key={i} className="rounded-[4px] flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: i <= 2 ? accentBg : surface, color: i <= 2 ? accent : textFaint }}>{i}</div>
      ))}
    </div>
  );

  // Tailwind
  if (name.includes("tailwind") || en.includes("tailwind")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-1 overflow-hidden" style={{ ...box, color: text }}>
      <div>&lt;div class="<span style={{ color: accent }}>rounded-xl</span> <span style={{ color: green }}>shadow-lg</span>"&gt;</div>
      <div className="pl-2">&lt;h2 class="<span style={{ color: accent }}>text-2xl</span> <span style={{ color: blue }}>font-bold</span>"&gt;</div>
      <div className="pl-2">&lt;p class="<span style={{ color: yellow }}>mt-2</span> <span style={{ color: green }}>text-gray-600</span>"&gt;</div>
      <div className="opacity-50">...</div>
    </div>
  );

  // API
  if (name.includes("api") || name.includes("接口") || en.includes("api") || en.includes("rest")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[9px] space-y-1" style={box}>
      <div className="flex items-center gap-1.5">
        <span className="px-1 py-0.5 rounded text-[7px] font-bold" style={{ backgroundColor: "rgba(95,138,107,0.15)", color: green }}>GET</span>
        <span style={{ color: text }}>/api/users</span>
        <span style={{ color: green }}>200</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="px-1 py-0.5 rounded text-[7px] font-bold" style={{ backgroundColor: "rgba(217,119,87,0.15)", color: accent }}>POST</span>
        <span style={{ color: text }}>/api/login</span>
        <span style={{ color: yellow }}>401</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="px-1 py-0.5 rounded text-[7px] font-bold" style={{ backgroundColor: "rgba(184,92,74,0.15)", color: isDark ? "#d4836f" : "#b85c4a" }}>DEL</span>
        <span style={{ color: text }}>/api/post/42</span>
        <span style={{ color: green }}>204</span>
      </div>
    </div>
  );

  // Database
  if (name.includes("数据库") || name.includes("database") || en.includes("database") || en.includes("sql")) return (
    <div className="h-[88px] rounded-[10px] border overflow-hidden" style={box}>
      <div className="grid grid-cols-3 text-[7px] font-bold px-2 py-1 border-b" style={{ borderColor: border, color: accent, backgroundColor: accentBg }}>
        <span>id</span><span>name</span><span>email</span>
      </div>
      {[["1", "Alice", "a@x.com"], ["2", "Bob", "b@x.com"], ["3", "Carol", "c@x.com"]].map((row, i) => (
        <div key={i} className="grid grid-cols-3 text-[7px] px-2 py-0.5 border-b last:border-0" style={{ borderColor: border, color: textFaint }}>
          {row.map((cell, j) => <span key={j}>{cell}</span>)}
        </div>
      ))}
    </div>
  );

  // Git
  if (name.includes("git") || en === "git") return (
    <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-1" style={box}>
      <div className="flex items-center gap-1.5"><span style={{ color: accent }}>●</span><span style={{ color: text }}>main</span></div>
      <div className="flex items-center gap-1.5 pl-3"><span style={{ color: green }}>●</span><span style={{ color: textFaint }}>feat/login</span></div>
      <div className="flex items-center gap-1.5 pl-3"><span style={{ color: yellow }}>●</span><span style={{ color: textFaint }}>fix/bug-42</span></div>
      <div className="mt-1 text-[7px]" style={{ color: textFaint }}>$ git merge feat/login</div>
    </div>
  );

  // Docker
  if (name.includes("docker") || name.includes("容器") || en.includes("docker") || en.includes("container")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
      <div className="grid grid-cols-3 gap-1">
        {["web", "api", "db"].map((s, i) => (
          <div key={i} className="w-10 h-7 rounded-[4px] border flex items-center justify-center text-[7px] font-mono" style={{ borderColor: accent + "30", backgroundColor: accentBg, color: accent }}>
            📦 {s}
          </div>
        ))}
      </div>
    </div>
  );

  // Deploy / CI/CD
  if (name.includes("部署") || name.includes("deploy") || name.includes("cicd") || en.includes("deploy") || en.includes("ci/cd")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
      {["push", "build", "test", "deploy"].map((step, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className="px-1.5 py-0.5 rounded-[4px] text-[7px] font-medium" style={{ backgroundColor: i < 3 ? accentBg : surface, color: i < 3 ? accent : textFaint, border: `1px solid ${i < 3 ? accent + "30" : border}` }}>{step}</div>
          {i < 3 && <span style={{ color: textFaint }}>→</span>}
        </div>
      ))}
    </div>
  );

  // Domain / DNS
  if (name.includes("域名") || name.includes("dns") || en.includes("domain") || en.includes("dns")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-1" style={box}>
      <div style={{ color: text }}>www.example.com</div>
      <div style={{ color: textFaint }}>  ↓ DNS 解析</div>
      <div style={{ color: accent }}>  → 192.168.1.1</div>
      <div className="mt-1 flex items-center gap-1">
        <span style={{ color: green }}>🔒</span><span style={{ color: textFaint }}>HTTPS / SSL</span>
      </div>
    </div>
  );

  // LLM / AI model
  if (name.includes("llm") || name.includes("大模型") || name.includes("大语言") || en.includes("llm") || en.includes("large language")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px]" style={{ backgroundColor: accentBg, border: `1.5px solid ${accent}40` }}>🧠</div>
        <div className="space-y-0.5">
          <div className="h-1.5 w-12 rounded-full" style={{ backgroundColor: accent + "30" }} />
          <div className="h-1.5 w-8 rounded-full" style={{ backgroundColor: surface }} />
          <div className="h-1.5 w-10 rounded-full" style={{ backgroundColor: surface }} />
        </div>
        <div className="text-[7px] font-mono" style={{ color: textFaint }}>7B / 70B<br/>params</div>
      </div>
    </div>
  );

  // Prompt
  if (name.includes("提示词") || name.includes("prompt") || en.includes("prompt")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 space-y-1.5" style={box}>
      <div className="text-[7px] font-semibold" style={{ color: accent }}>ROLE</div>
      <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: surface }} />
      <div className="text-[7px] font-semibold" style={{ color: green }}>TASK</div>
      <div className="h-1.5 w-3/4 rounded-full" style={{ backgroundColor: surface }} />
      <div className="text-[7px] font-semibold" style={{ color: yellow }}>FORMAT</div>
      <div className="h-1.5 w-1/2 rounded-full" style={{ backgroundColor: surface }} />
    </div>
  );

  // Agent
  if (name.includes("agent") || name.includes("智能体")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px]" style={{ backgroundColor: accentBg, border: `1px solid ${accent}30` }}>🤖</div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: green }} /><span className="text-[7px]" style={{ color: textFaint }}>思考</span></div>
        <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} /><span className="text-[7px]" style={{ color: textFaint }}>行动</span></div>
        <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: yellow }} /><span className="text-[7px]" style={{ color: textFaint }}>观察</span></div>
      </div>
    </div>
  );

  // RAG
  if (name.includes("rag") || en.includes("rag")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
      <div className="flex flex-col gap-0.5">
        <div className="w-8 h-3 rounded-[3px]" style={{ backgroundColor: surface }} />
        <div className="w-8 h-3 rounded-[3px]" style={{ backgroundColor: accentBg }} />
        <div className="w-8 h-3 rounded-[3px]" style={{ backgroundColor: surface }} />
      </div>
      <span style={{ color: textFaint }}>→</span>
      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px]" style={{ backgroundColor: accentBg }}>🔍</div>
      <span style={{ color: textFaint }}>→</span>
      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px]" style={{ backgroundColor: accentBg }}>🧠</div>
    </div>
  );

  // Token
  if (name.includes("token") || en.includes("token")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
      <div className="flex flex-wrap gap-1 max-w-[160px]">
        {["Hello", ",", " how", " are", " you", "?", " I", "'m", " fine", "."].map((t, i) => (
          <span key={i} className="px-1 py-0.5 rounded-[3px] text-[7px] font-mono" style={{ backgroundColor: i % 3 === 0 ? accentBg : surface, color: i % 3 === 0 ? accent : textFaint, border: `1px solid ${border}` }}>{t}</span>
        ))}
      </div>
    </div>
  );

  // Temperature
  if (name.includes("温度") || en.includes("temperature")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-4" style={box}>
      <div className="text-center">
        <div className="text-[7px] mb-1" style={{ color: textFaint }}>0.0</div>
        <div className="w-2 h-10 rounded-full relative overflow-hidden" style={{ backgroundColor: surface }}>
          <div className="absolute bottom-0 w-full h-[20%] rounded-full" style={{ backgroundColor: blue }} />
        </div>
        <div className="text-[6px] mt-0.5" style={{ color: blue }}>确定</div>
      </div>
      <div className="text-center">
        <div className="text-[7px] mb-1" style={{ color: textFaint }}>0.7</div>
        <div className="w-2 h-10 rounded-full relative overflow-hidden" style={{ backgroundColor: surface }}>
          <div className="absolute bottom-0 w-full h-[70%] rounded-full" style={{ backgroundColor: accent }} />
        </div>
        <div className="text-[6px] mt-0.5" style={{ color: accent }}>平衡</div>
      </div>
      <div className="text-center">
        <div className="text-[7px] mb-1" style={{ color: textFaint }}>1.5</div>
        <div className="w-2 h-10 rounded-full relative overflow-hidden" style={{ backgroundColor: surface }}>
          <div className="absolute bottom-0 w-full h-full rounded-full" style={{ backgroundColor: isDark ? "#d4836f" : "#b85c4a" }} />
        </div>
        <div className="text-[6px] mt-0.5" style={{ color: isDark ? "#d4836f" : "#b85c4a" }}>随机</div>
      </div>
    </div>
  );

  // Embedding
  if (name.includes("embedding") || name.includes("向量")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
      <div className="relative w-16 h-16">
        <div className="absolute w-2 h-2 rounded-full" style={{ top: "20%", left: "30%", backgroundColor: accent }} />
        <div className="absolute w-2 h-2 rounded-full" style={{ top: "25%", left: "35%", backgroundColor: accent + "80" }} />
        <div className="absolute w-2 h-2 rounded-full" style={{ top: "60%", left: "70%", backgroundColor: green }} />
        <div className="absolute w-2 h-2 rounded-full" style={{ top: "65%", left: "65%", backgroundColor: green + "80" }} />
        <div className="absolute w-2 h-2 rounded-full" style={{ top: "50%", left: "20%", backgroundColor: blue }} />
        <div className="absolute w-12 h-8 rounded-full border border-dashed" style={{ top: "10%", left: "15%", borderColor: accent + "30" }} />
        <div className="absolute w-10 h-7 rounded-full border border-dashed" style={{ top: "45%", left: "50%", borderColor: green + "30" }} />
      </div>
    </div>
  );

  // Hallucination
  if (name.includes("幻觉") || en.includes("hallucin")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3" style={box}>
      <div className="text-center">
        <div className="text-[14px]">✅</div>
        <div className="text-[7px] mt-0.5" style={{ color: green }}>事实</div>
      </div>
      <div className="text-[12px]" style={{ color: textFaint }}>vs</div>
      <div className="text-center">
        <div className="text-[14px]">⚠️</div>
        <div className="text-[7px] mt-0.5" style={{ color: isDark ? "#d4836f" : "#b85c4a" }}>编造</div>
      </div>
    </div>
  );

  // Context window
  if (name.includes("上下文") || en.includes("context")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex flex-col justify-center" style={box}>
      <div className="flex items-center gap-1 mb-1">
        <span className="text-[7px]" style={{ color: textFaint }}>窗口</span>
        <div className="flex-1 h-3 rounded-[4px] border overflow-hidden flex" style={{ borderColor: border }}>
          <div className="h-full" style={{ width: "70%", backgroundColor: accentBg }} />
          <div className="h-full flex-1" style={{ backgroundColor: surface }} />
        </div>
        <span className="text-[7px] font-mono" style={{ color: accent }}>128K</span>
      </div>
      <div className="flex gap-0.5 flex-wrap">
        {Array.from({length: 14}, (_, i) => (
          <div key={i} className="w-2 h-2 rounded-[2px]" style={{ backgroundColor: i < 10 ? accent + "40" : surface }} />
        ))}
      </div>
    </div>
  );

  // Vibe Coding
  if (name.includes("vibe") || en.includes("vibe")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center gap-2" style={box}>
      <div className="flex-1 space-y-1">
        <div className="px-1.5 py-0.5 rounded-[4px] text-[7px]" style={{ backgroundColor: surface, color: text }}>「帮我做个登录页」</div>
        <div className="px-1.5 py-0.5 rounded-[4px] text-[7px] ml-4" style={{ backgroundColor: accentBg, color: accent }}>✨ 生成代码...</div>
      </div>
      <div className="text-[16px]">🎵</div>
    </div>
  );

  // Iteration
  if (name.includes("迭代") || en.includes("iteration")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
      {["v1", "v2", "v3"].map((v, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className="w-8 h-10 rounded-[4px] border flex items-center justify-center text-[7px] font-mono" style={{ borderColor: i === 2 ? accent : border, backgroundColor: i === 2 ? accentBg : surface, color: i === 2 ? accent : textFaint }}>{v}</div>
          {i < 2 && <span className="text-[8px]" style={{ color: textFaint }}>→</span>}
        </div>
      ))}
    </div>
  );

  // Debug
  if (name.includes("调试") || name.includes("debug") || en.includes("debug")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-1" style={box}>
      <div style={{ color: isDark ? "#d4836f" : "#b85c4a" }}>❌ TypeError: x is not defined</div>
      <div style={{ color: textFaint }}>  at line 42</div>
      <div className="flex items-center gap-1 mt-1">
        <span style={{ color: green }}>🔧</span>
        <span style={{ color: text }}>Fix: add const x = ...</span>
      </div>
    </div>
  );

  // Commit
  if (name.includes("提交") || name.includes("commit") || en.includes("commit")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-1.5" style={box}>
      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} /><span style={{ color: text }}>feat: add login page</span></div>
      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: green }} /><span style={{ color: text }}>fix: resolve CORS issue</span></div>
      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: yellow }} /><span style={{ color: text }}>docs: update README</span></div>
    </div>
  );

  // Branch
  if (name.includes("分支") || name.includes("branch") || en.includes("branch")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
      <svg width="120" height="50" viewBox="0 0 120 50">
        <line x1="10" y1="25" x2="110" y2="25" stroke={text} strokeWidth="1.5" />
        <line x1="40" y1="25" x2="60" y2="10" stroke={accent} strokeWidth="1.5" />
        <line x1="60" y1="10" x2="90" y2="10" stroke={accent} strokeWidth="1.5" />
        <line x1="90" y1="10" x2="100" y2="25" stroke={accent} strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="10" cy="25" r="3" fill={text} />
        <circle cx="40" cy="25" r="3" fill={text} />
        <circle cx="60" cy="10" r="3" fill={accent} />
        <circle cx="90" cy="10" r="3" fill={accent} />
        <circle cx="110" cy="25" r="3" fill={text} />
      </svg>
    </div>
  );

  // PR / Merge Request (use exact match to avoid matching "props")
  if (name === "pr" || name === "pull request" || name.includes("拉取请求") || name.includes("合并请求") || en.includes("pull request")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 space-y-1.5" style={box}>
      <div className="flex items-center gap-1.5">
        <span className="text-[8px]">🔀</span>
        <span className="text-[8px] font-medium" style={{ color: text }}>PR #42: Add dark mode</span>
      </div>
      <div className="flex items-center gap-2 text-[7px]">
        <span style={{ color: green }}>+128</span>
        <span style={{ color: isDark ? "#d4836f" : "#b85c4a" }}>-34</span>
        <span style={{ color: textFaint }}>3 files</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="px-1 py-0.5 rounded-[3px] text-[6px]" style={{ backgroundColor: "rgba(95,138,107,0.15)", color: green }}>✓ Approved</span>
        <span className="px-1 py-0.5 rounded-[3px] text-[6px]" style={{ backgroundColor: accentBg, color: accent }}>2 reviews</span>
      </div>
    </div>
  );

  // SSL / HTTPS
  if (name.includes("ssl") || name.includes("https") || name.includes("证书")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
      <div className="text-[16px]">🔒</div>
      <div className="font-mono text-[8px] space-y-0.5">
        <div style={{ color: green }}>https://example.com</div>
        <div style={{ color: textFaint }}>TLS 1.3 · AES-256</div>
        <div style={{ color: textFaint }}>Cert: Let's Encrypt</div>
      </div>
    </div>
  );

  // SSR / CSR (must be before Server check)
  if (name === "ssr" || name === "csr" || en.includes("server-side rendering") || en.includes("client-side rendering")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
      <div className="flex flex-col items-center gap-1">
        <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: accentBg, color: accent }}>Server</div>
        <span className="text-[8px]" style={{ color: textFaint }}>↓ HTML</span>
        <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: surface, color: textFaint }}>Browser</div>
        <span className="text-[8px]" style={{ color: textFaint }}>↓ JS</span>
        <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green }}>Hydrate</div>
      </div>
    </div>
  );

  // Server
  if (name.includes("服务器") || name === "server" || en === "server") return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
      <div className="flex flex-col gap-1">
        {[1,2,3].map(i => (
          <div key={i} className="w-14 h-4 rounded-[3px] border flex items-center px-1.5 gap-1" style={{ borderColor: border }}>
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: green }} />
            <div className="h-1 flex-1 rounded-full" style={{ backgroundColor: surface }} />
          </div>
        ))}
      </div>
      <div className="text-[7px] font-mono" style={{ color: textFaint }}>port:3000<br/>uptime: 99.9%</div>
    </div>
  );

  // Middleware
  if (name.includes("中间件") || en.includes("middleware")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
      {["req", "auth", "log", "res"].map((s, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className="px-1.5 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: i === 0 || i === 3 ? surface : accentBg, color: i === 0 || i === 3 ? textFaint : accent, border: `1px solid ${border}` }}>{s}</div>
          {i < 3 && <span className="text-[7px]" style={{ color: textFaint }}>→</span>}
        </div>
      ))}
    </div>
  );

  // Cache
  if (name.includes("缓存") || name.includes("cache") || en.includes("cache")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3" style={box}>
      <div className="text-center">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px]" style={{ backgroundColor: accentBg, border: `1px solid ${accent}30` }}>⚡</div>
        <div className="text-[6px] mt-0.5" style={{ color: accent }}>Cache HIT</div>
      </div>
      <div className="text-center">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px]" style={{ backgroundColor: surface, border: `1px solid ${border}` }}>🐢</div>
        <div className="text-[6px] mt-0.5" style={{ color: textFaint }}>MISS → DB</div>
      </div>
    </div>
  );

  // Auth / Login
  if (name.includes("认证") || name.includes("登录") || name.includes("auth") || en.includes("auth")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
      <div className="w-20 space-y-1.5">
        <div className="h-4 rounded-[4px] border px-1.5 flex items-center text-[7px]" style={{ borderColor: border, color: textFaint }}>👤 email</div>
        <div className="h-4 rounded-[4px] border px-1.5 flex items-center text-[7px]" style={{ borderColor: border, color: textFaint }}>🔑 ••••••</div>
        <div className="h-4 rounded-[4px] flex items-center justify-center text-[7px] font-medium text-white" style={{ backgroundColor: accent }}>Login</div>
      </div>
    </div>
  );

  // UI/UX Design
  if (name.includes("ui") || name.includes("界面") || en === "ui" || en.includes("user interface")) return (
    <div className="h-[88px] rounded-[10px] border overflow-hidden flex flex-col" style={box}>
      <div className="h-4 flex items-center px-2 gap-1 border-b" style={{ borderColor: border }}>
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isDark ? "#d4836f" : "#b85c4a" }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: yellow }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: green }} />
      </div>
      <div className="flex-1 flex">
        <div className="w-8 border-r p-1 space-y-0.5" style={{ borderColor: border }}>
          <div className="h-1 rounded-full" style={{ backgroundColor: accentBg }} />
          <div className="h-1 rounded-full" style={{ backgroundColor: surface }} />
          <div className="h-1 rounded-full" style={{ backgroundColor: surface }} />
        </div>
        <div className="flex-1 p-1.5 grid grid-cols-2 gap-1">
          <div className="rounded-[3px]" style={{ backgroundColor: accentBg }} />
          <div className="rounded-[3px]" style={{ backgroundColor: surface }} />
        </div>
      </div>
    </div>
  );

  // Color theory
  if (name.includes("配色") || name.includes("色彩") || en.includes("color")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1.5" style={box}>
      {[accent, green, yellow, blue, isDark ? "#c9a3d4" : "#8b5fa0"].map((c, i) => (
        <div key={i} className="w-5 h-10 rounded-[4px]" style={{ backgroundColor: c, opacity: 1 - i * 0.1 }} />
      ))}
    </div>
  );

  // Typography
  if (name.includes("字体") || name.includes("排版") || en.includes("typo") || en.includes("font")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex flex-col justify-center gap-1" style={box}>
      <div className="text-[16px] font-bold" style={{ color: text }}>Aa</div>
      <div className="text-[10px]" style={{ color: text }}>The quick brown fox</div>
      <div className="text-[7px]" style={{ color: textFaint }}>16px / 1.5 line-height / -0.02em</div>
    </div>
  );

  // Whitespace
  if (name.includes("留白") || name.includes("空白") || en.includes("whitespace")) return (
    <div className="h-[88px] rounded-[10px] border p-4 flex items-center justify-center" style={box}>
      <div className="w-10 h-6 rounded-[4px]" style={{ backgroundColor: accentBg, border: `1px dashed ${accent}40` }} />
    </div>
  );

  // Skeleton / Loading
  if (name.includes("骨架") || name.includes("skeleton") || name.includes("加载") || en.includes("skeleton") || en.includes("loading")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 space-y-2" style={box}>
      <div className="flex gap-2">
        <div className="w-6 h-6 rounded-full animate-pulse" style={{ backgroundColor: surface }} />
        <div className="flex-1 space-y-1">
          <div className="h-2 rounded-full animate-pulse" style={{ backgroundColor: surface }} />
          <div className="h-2 rounded-full w-2/3 animate-pulse" style={{ backgroundColor: surface, animationDelay: "0.2s" }} />
        </div>
      </div>
      <div className="h-2 rounded-full animate-pulse" style={{ backgroundColor: surface, animationDelay: "0.4s" }} />
      <div className="h-2 rounded-full w-4/5 animate-pulse" style={{ backgroundColor: surface, animationDelay: "0.6s" }} />
    </div>
  );

  // Toast / Notification
  if (name.includes("toast") || name.includes("通知") || name.includes("提示") || en.includes("toast") || en.includes("notification")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-end justify-end" style={box}>
      <div className="px-2 py-1.5 rounded-[6px] text-[8px] font-medium flex items-center gap-1" style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}30`, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        ✅ 保存成功
      </div>
    </div>
  );

  // Modal / Dialog
  if (name.includes("弹窗") || name.includes("模态") || name.includes("modal") || name.includes("dialog") || en.includes("modal") || en.includes("dialog")) return (
    <div className="h-[88px] rounded-[10px] border relative overflow-hidden" style={box}>
      <div className="absolute inset-0" style={{ backgroundColor: isDark ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-14 rounded-[6px] border p-1.5 flex flex-col justify-between" style={{ backgroundColor: isDark ? "#1e1c17" : "#fff", borderColor: border }}>
        <div className="h-1.5 w-3/4 rounded-full" style={{ backgroundColor: surface }} />
        <div className="flex gap-1 justify-end">
          <div className="w-5 h-2.5 rounded-[3px]" style={{ backgroundColor: surface }} />
          <div className="w-5 h-2.5 rounded-[3px]" style={{ backgroundColor: accent }} />
        </div>
      </div>
    </div>
  );

  // Dark mode
  if (name.includes("暗色") || name.includes("深色") || name.includes("dark") || en.includes("dark")) return (
    <div className="h-[88px] rounded-[10px] border flex overflow-hidden" style={box}>
      <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "#faf9f7" }}>
        <div className="text-[14px]">☀️</div>
      </div>
      <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "#0d0d0b" }}>
        <div className="text-[14px]">🌙</div>
      </div>
    </div>
  );

  // Hover
  if (name.includes("悬停") || name.includes("hover") || en.includes("hover")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3" style={box}>
      <div className="px-3 py-1.5 rounded-[6px] text-[8px] border" style={{ borderColor: border, color: text }}>Normal</div>
      <span style={{ color: textFaint }}>→</span>
      <div className="px-3 py-1.5 rounded-[6px] text-[8px] font-medium -translate-y-0.5" style={{ backgroundColor: accent, color: "#fff", boxShadow: `0 3px 8px ${accent}40` }}>Hover</div>
    </div>
  );

  // Workflow / Chain
  if (name.includes("工作流") || name.includes("workflow") || name.includes("chain") || en.includes("workflow") || en.includes("chain")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
      {["输入", "处理", "判断", "输出"].map((s, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className={`px-1.5 py-1 rounded-[4px] text-[7px] ${i === 2 ? "rotate-45 w-5 h-5 flex items-center justify-center" : ""}`} style={{ backgroundColor: i === 2 ? yellow + "20" : accentBg, color: i === 2 ? yellow : accent, border: `1px solid ${border}` }}>{i === 2 ? "?" : s}</div>
          {i < 3 && <span className="text-[7px]" style={{ color: textFaint }}>→</span>}
        </div>
      ))}
    </div>
  );

  // Memory
  if (name.includes("记忆") || name.includes("memory") || en.includes("memory")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3" style={box}>
      <div className="text-center">
        <div className="w-8 h-8 rounded-[4px] border flex items-center justify-center text-[8px]" style={{ borderColor: accent + "30", backgroundColor: accentBg, color: accent }}>RAM</div>
        <div className="text-[6px] mt-0.5" style={{ color: textFaint }}>短期</div>
      </div>
      <span style={{ color: textFaint }}>→</span>
      <div className="text-center">
        <div className="w-8 h-8 rounded-[4px] border flex items-center justify-center text-[8px]" style={{ borderColor: green + "30", backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green }}>DB</div>
        <div className="text-[6px] mt-0.5" style={{ color: textFaint }}>长期</div>
      </div>
    </div>
  );

  // Tool calling
  if (name.includes("工具") || name.includes("tool") || en.includes("tool")) return (
    <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px]" style={{ backgroundColor: accentBg }}>🤖</div>
      <span style={{ color: textFaint }}>→</span>
      <div className="flex flex-col gap-0.5">
        <div className="px-1.5 py-0.5 rounded-[3px] text-[7px] font-mono" style={{ backgroundColor: surface, color: textFaint }}>search()</div>
        <div className="px-1.5 py-0.5 rounded-[3px] text-[7px] font-mono" style={{ backgroundColor: accentBg, color: accent }}>fetch()</div>
        <div className="px-1.5 py-0.5 rounded-[3px] text-[7px] font-mono" style={{ backgroundColor: surface, color: textFaint }}>calc()</div>
      </div>
    </div>
  );

  // Fallback: return null to hide preview for terms without unique visuals
  return null;
}
