"use client";

import { useTheme } from "../components/ThemeProvider";

/**
 * Unique visual preview per term — matched by exact termId.
 * Returns null if no unique preview exists for this term.
 * NO fallback templates — every preview must be visually distinct.
 */
export default function TermPreview({ termId, termName, termEn, category, previewType }: {
  termId?: string;
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

  // ─── Exact termId → unique visual ───
  switch (termId) {
    case "html": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[9px] space-y-0.5 overflow-hidden" style={{ ...box, color: text }}>
        <div><span style={{ color: textFaint }}>&lt;</span><span style={{ color: accent }}>h1</span><span style={{ color: textFaint }}>&gt;</span><span style={{ color: text }}>我的网页</span><span style={{ color: textFaint }}>&lt;/</span><span style={{ color: accent }}>h1</span><span style={{ color: textFaint }}>&gt;</span></div>
        <div><span style={{ color: textFaint }}>&lt;</span><span style={{ color: accent }}>p</span><span style={{ color: textFaint }}>&gt;</span><span style={{ color: text }}>正文内容</span><span style={{ color: textFaint }}>&lt;/</span><span style={{ color: accent }}>p</span><span style={{ color: textFaint }}>&gt;</span></div>
        <div><span style={{ color: textFaint }}>&lt;</span><span style={{ color: accent }}>button</span><span style={{ color: textFaint }}>&gt;</span><span style={{ color: text }}>点击</span><span style={{ color: textFaint }}>&lt;/</span><span style={{ color: accent }}>button</span><span style={{ color: textFaint }}>&gt;</span></div>
      </div>
    );

    case "css": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[9px] space-y-0.5 overflow-hidden" style={{ ...box, color: text }}>
        <div><span style={{ color: accent }}>.card</span> {"{"}</div>
        <div className="pl-3"><span style={{ color: blue }}>border-radius</span>: <span style={{ color: yellow }}>12px</span>;</div>
        <div className="pl-3"><span style={{ color: blue }}>box-shadow</span>: <span style={{ color: yellow }}>0 4px 12px</span>;</div>
        <div className="pl-3"><span style={{ color: blue }}>transition</span>: <span style={{ color: yellow }}>all 0.3s</span>;</div>
        <div>{"}"}</div>
      </div>
    );

    case "jsx": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[9px] space-y-0.5 overflow-hidden" style={{ ...box, color: text }}>
        <div><span style={{ color: accent }}>return</span> (</div>
        <div className="pl-3">&lt;<span style={{ color: accent }}>div</span> <span style={{ color: blue }}>className</span>=<span style={{ color: green }}>"card"</span>&gt;</div>
        <div className="pl-5">&lt;<span style={{ color: accent }}>h1</span>&gt;{"{title}"}&lt;/&gt;</div>
        <div className="pl-3">&lt;/<span style={{ color: accent }}>div</span>&gt;</div>
        <div>)</div>
      </div>
    );

    case "javascript": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[9px] space-y-0.5 overflow-hidden" style={{ ...box, color: text }}>
        <div><span style={{ color: accent }}>const</span> btn = <span style={{ color: blue }}>document</span>.<span style={{ color: accent }}>querySelector</span>(<span style={{ color: green }}>'.btn'</span>)</div>
        <div>btn.<span style={{ color: accent }}>addEventListener</span>(<span style={{ color: green }}>'click'</span>, () =&gt; {"{"}</div>
        <div className="pl-3"><span style={{ color: blue }}>alert</span>(<span style={{ color: green }}>'Hello!'</span>)</div>
        <div>{"})"}</div>
      </div>
    );

    case "react": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[9px] space-y-0.5 overflow-hidden" style={{ ...box, color: text }}>
        <div><span style={{ color: accent }}>function</span> <span style={{ color: blue }}>Counter</span>() {"{"}</div>
        <div className="pl-3"><span style={{ color: accent }}>const</span> [n, setN] = <span style={{ color: blue }}>useState</span>(<span style={{ color: yellow }}>0</span>)</div>
        <div className="pl-3"><span style={{ color: accent }}>return</span> &lt;<span style={{ color: accent }}>button</span>&gt;{"{n}"}&lt;/&gt;</div>
        <div>{"}"}</div>
      </div>
    );

    case "component": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center gap-2" style={box}>
        <div className="flex flex-col gap-1.5">
          <div className="px-2 py-1 rounded-[5px] text-[8px] font-medium border" style={{ borderColor: accent + "40", color: accent, backgroundColor: accentBg }}>Card</div>
          <div className="px-2 py-1 rounded-[5px] text-[8px] font-medium border" style={{ borderColor: green + "40", color: green, backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)" }}>Button</div>
          <div className="px-2 py-1 rounded-[5px] text-[8px] font-medium border" style={{ borderColor: blue + "40", color: blue, backgroundColor: isDark ? "rgba(123,163,201,0.08)" : "rgba(74,127,165,0.06)" }}>Input</div>
        </div>
        <div className="text-[8px] leading-[1.5]" style={{ color: textFaint }}>可复用<br/>独立封装<br/>Props 传入</div>
      </div>
    );

    case "responsive": return (
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

    case "animation": return (
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

    case "flexbox": return (
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

    case "grid": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 grid grid-cols-3 grid-rows-2 gap-1.5" style={box}>
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="rounded-[4px] flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: i <= 2 ? accentBg : surface, color: i <= 2 ? accent : textFaint }}>{i}</div>
        ))}
      </div>
    );

    case "tailwind": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-1 overflow-hidden" style={{ ...box, color: text }}>
        <div>&lt;div class="<span style={{ color: accent }}>rounded-xl</span> <span style={{ color: green }}>shadow-lg</span>"&gt;</div>
        <div className="pl-2">&lt;h2 class="<span style={{ color: accent }}>text-2xl</span> <span style={{ color: blue }}>font-bold</span>"&gt;</div>
        <div className="pl-2">&lt;p class="<span style={{ color: yellow }}>mt-2</span> <span style={{ color: green }}>text-gray-600</span>"&gt;</div>
      </div>
    );

    case "api": return (
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

    case "database": return (
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

    case "git": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-1" style={box}>
        <div className="flex items-center gap-1.5"><span style={{ color: accent }}>●</span><span style={{ color: text }}>main</span></div>
        <div className="flex items-center gap-1.5 pl-3"><span style={{ color: green }}>●</span><span style={{ color: textFaint }}>feat/login</span></div>
        <div className="flex items-center gap-1.5 pl-3"><span style={{ color: yellow }}>●</span><span style={{ color: textFaint }}>fix/bug-42</span></div>
        <div className="mt-1 text-[7px]" style={{ color: textFaint }}>$ git merge feat/login</div>
      </div>
    );

    case "docker": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="grid grid-cols-3 gap-1">
          {["web", "api", "db"].map((s, i) => (
            <div key={i} className="w-10 h-7 rounded-[4px] border flex items-center justify-center text-[7px] font-mono" style={{ borderColor: accent + "30", backgroundColor: accentBg, color: accent }}>📦 {s}</div>
          ))}
        </div>
      </div>
    );

    case "deploy": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
        {["push", "build", "test", "deploy"].map((step, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="px-1.5 py-0.5 rounded-[4px] text-[7px] font-medium" style={{ backgroundColor: i < 3 ? accentBg : surface, color: i < 3 ? accent : textFaint, border: `1px solid ${i < 3 ? accent + "30" : border}` }}>{step}</div>
            {i < 3 && <span style={{ color: textFaint }}>→</span>}
          </div>
        ))}
      </div>
    );

    case "domain": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-1" style={box}>
        <div style={{ color: text }}>www.example.com</div>
        <div style={{ color: textFaint }}>  ↓ DNS 解析</div>
        <div style={{ color: accent }}>  → 192.168.1.1</div>
        <div className="mt-1 flex items-center gap-1"><span style={{ color: green }}>🔒</span><span style={{ color: textFaint }}>HTTPS / SSL</span></div>
      </div>
    );

    case "llm": return (
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

    case "prompt": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 space-y-1.5" style={box}>
        <div className="text-[7px] font-semibold" style={{ color: accent }}>ROLE</div>
        <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: surface }} />
        <div className="text-[7px] font-semibold" style={{ color: green }}>TASK</div>
        <div className="h-1.5 w-3/4 rounded-full" style={{ backgroundColor: surface }} />
        <div className="text-[7px] font-semibold" style={{ color: yellow }}>FORMAT</div>
        <div className="h-1.5 w-1/2 rounded-full" style={{ backgroundColor: surface }} />
      </div>
    );

    case "agent": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px]" style={{ backgroundColor: accentBg, border: `1px solid ${accent}30` }}>🤖</div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: green }} /><span className="text-[7px]" style={{ color: textFaint }}>思考</span></div>
          <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} /><span className="text-[7px]" style={{ color: textFaint }}>行动</span></div>
          <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: yellow }} /><span className="text-[7px]" style={{ color: textFaint }}>观察</span></div>
        </div>
      </div>
    );

    case "rag": return (
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

    case "token": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="flex flex-wrap gap-1 max-w-[160px]">
          {["Hello", ",", " how", " are", " you", "?", " I", "'m", " fine", "."].map((t, i) => (
            <span key={i} className="px-1 py-0.5 rounded-[3px] text-[7px] font-mono" style={{ backgroundColor: i % 3 === 0 ? accentBg : surface, color: i % 3 === 0 ? accent : textFaint, border: `1px solid ${border}` }}>{t}</span>
          ))}
        </div>
      </div>
    );

    case "temperature": return (
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

    case "embedding": return (
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

    case "hallucination": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3" style={box}>
        <div className="text-center"><div className="text-[14px]">✅</div><div className="text-[7px] mt-0.5" style={{ color: green }}>事实</div></div>
        <div className="text-[12px]" style={{ color: textFaint }}>vs</div>
        <div className="text-center"><div className="text-[14px]">⚠️</div><div className="text-[7px] mt-0.5" style={{ color: isDark ? "#d4836f" : "#b85c4a" }}>编造</div></div>
      </div>
    );

    case "context-window": return (
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

    case "vibe-coding": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center gap-2" style={box}>
        <div className="flex-1 space-y-1">
          <div className="px-1.5 py-0.5 rounded-[4px] text-[7px]" style={{ backgroundColor: surface, color: text }}>「帮我做个登录页」</div>
          <div className="px-1.5 py-0.5 rounded-[4px] text-[7px] ml-4" style={{ backgroundColor: accentBg, color: accent }}>✨ 生成代码</div>
        </div>
        <div className="text-[16px]">🎵</div>
      </div>
    );

    case "iteration": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
        {["v1", "v2", "v3"].map((v, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-8 h-10 rounded-[4px] border flex items-center justify-center text-[7px] font-mono" style={{ borderColor: i === 2 ? accent : border, backgroundColor: i === 2 ? accentBg : surface, color: i === 2 ? accent : textFaint }}>{v}</div>
            {i < 2 && <span className="text-[8px]" style={{ color: textFaint }}>→</span>}
          </div>
        ))}
      </div>
    );

    case "debug": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-1" style={box}>
        <div style={{ color: isDark ? "#d4836f" : "#b85c4a" }}>❌ TypeError: x is not defined</div>
        <div style={{ color: textFaint }}>  at line 42</div>
        <div className="flex items-center gap-1 mt-1"><span style={{ color: green }}>🔧</span><span style={{ color: text }}>Fix: add const x = ...</span></div>
      </div>
    );

    case "commit": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-1.5" style={box}>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} /><span style={{ color: text }}>feat: add login page</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: green }} /><span style={{ color: text }}>fix: resolve CORS issue</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: yellow }} /><span style={{ color: text }}>docs: update README</span></div>
      </div>
    );

    case "branch": return (
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

    case "pull-request": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 space-y-1.5" style={box}>
        <div className="flex items-center gap-1.5"><span className="text-[8px]">🔀</span><span className="text-[8px] font-medium" style={{ color: text }}>PR #42: Add dark mode</span></div>
        <div className="flex items-center gap-2 text-[7px]"><span style={{ color: green }}>+128</span><span style={{ color: isDark ? "#d4836f" : "#b85c4a" }}>-34</span><span style={{ color: textFaint }}>3 files</span></div>
        <div className="flex items-center gap-1"><span className="px-1 py-0.5 rounded-[3px] text-[6px]" style={{ backgroundColor: "rgba(95,138,107,0.15)", color: green }}>✓ Approved</span><span className="px-1 py-0.5 rounded-[3px] text-[6px]" style={{ backgroundColor: accentBg, color: accent }}>2 reviews</span></div>
      </div>
    );

    case "ssl": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="text-[16px]">🔒</div>
        <div className="font-mono text-[8px] space-y-0.5">
          <div style={{ color: green }}>https://example.com</div>
          <div style={{ color: textFaint }}>TLS 1.3 · AES-256</div>
          <div style={{ color: textFaint }}>Cert: Let&apos;s Encrypt</div>
        </div>
      </div>
    );

    case "ssr": return (
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

    case "server": return (
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

    case "middleware": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
        {["req", "auth", "log", "res"].map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="px-1.5 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: i === 0 || i === 3 ? surface : accentBg, color: i === 0 || i === 3 ? textFaint : accent, border: `1px solid ${border}` }}>{s}</div>
            {i < 3 && <span className="text-[7px]" style={{ color: textFaint }}>→</span>}
          </div>
        ))}
      </div>
    );

    case "cache": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3" style={box}>
        <div className="text-center"><div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px]" style={{ backgroundColor: accentBg, border: `1px solid ${accent}30` }}>⚡</div><div className="text-[6px] mt-0.5" style={{ color: accent }}>Cache HIT</div></div>
        <div className="text-center"><div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px]" style={{ backgroundColor: surface, border: `1px solid ${border}` }}>🐢</div><div className="text-[6px] mt-0.5" style={{ color: textFaint }}>MISS → DB</div></div>
      </div>
    );

    case "auth": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="w-20 space-y-1.5">
          <div className="h-4 rounded-[4px] border px-1.5 flex items-center text-[7px]" style={{ borderColor: border, color: textFaint }}>👤 email</div>
          <div className="h-4 rounded-[4px] border px-1.5 flex items-center text-[7px]" style={{ borderColor: border, color: textFaint }}>🔑 ••••••</div>
          <div className="h-4 rounded-[4px] flex items-center justify-center text-[7px] font-medium text-white" style={{ backgroundColor: accent }}>Login</div>
        </div>
      </div>
    );

    case "ui": return (
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

    case "color-theory": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1.5" style={box}>
        {[accent, green, yellow, blue, isDark ? "#c9a3d4" : "#8b5fa0"].map((c, i) => (
          <div key={i} className="w-5 h-10 rounded-[4px]" style={{ backgroundColor: c, opacity: 1 - i * 0.1 }} />
        ))}
      </div>
    );

    case "typography": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex flex-col justify-center gap-1" style={box}>
        <div className="text-[16px] font-bold" style={{ color: text }}>Aa</div>
        <div className="text-[10px]" style={{ color: text }}>The quick brown fox</div>
        <div className="text-[7px]" style={{ color: textFaint }}>16px / 1.5 line-height / -0.02em</div>
      </div>
    );

    case "whitespace": return (
      <div className="h-[88px] rounded-[10px] border p-4 flex items-center justify-center" style={box}>
        <div className="w-10 h-6 rounded-[4px]" style={{ backgroundColor: accentBg, border: `1px dashed ${accent}40` }} />
      </div>
    );

    case "skeleton": return (
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

    case "toast": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-end justify-end" style={box}>
        <div className="px-2 py-1.5 rounded-[6px] text-[8px] font-medium flex items-center gap-1" style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}30`, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>✅ 保存成功</div>
      </div>
    );

    case "modal": return (
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

    case "dark-mode": return (
      <div className="h-[88px] rounded-[10px] border flex overflow-hidden" style={box}>
        <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "#faf9f7" }}><div className="text-[14px]">☀️</div></div>
        <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "#0d0d0b" }}><div className="text-[14px]">🌙</div></div>
      </div>
    );

    case "hover": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3" style={box}>
        <div className="px-3 py-1.5 rounded-[6px] text-[8px] border" style={{ borderColor: border, color: text }}>Normal</div>
        <span style={{ color: textFaint }}>→</span>
        <div className="px-3 py-1.5 rounded-[6px] text-[8px] font-medium -translate-y-0.5" style={{ backgroundColor: accent, color: "#fff", boxShadow: `0 3px 8px ${accent}40` }}>Hover</div>
      </div>
    );

    case "workflow": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
        {["输入", "处理", "判断", "输出"].map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className={`px-1.5 py-1 rounded-[4px] text-[7px] ${i === 2 ? "rotate-45 w-5 h-5 flex items-center justify-center" : ""}`} style={{ backgroundColor: i === 2 ? yellow + "20" : accentBg, color: i === 2 ? yellow : accent, border: `1px solid ${border}` }}>{i === 2 ? "?" : s}</div>
            {i < 3 && <span className="text-[7px]" style={{ color: textFaint }}>→</span>}
          </div>
        ))}
      </div>
    );

    case "memory": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3" style={box}>
        <div className="text-center"><div className="w-8 h-8 rounded-[4px] border flex items-center justify-center text-[8px]" style={{ borderColor: accent + "30", backgroundColor: accentBg, color: accent }}>RAM</div><div className="text-[6px] mt-0.5" style={{ color: textFaint }}>短期</div></div>
        <span style={{ color: textFaint }}>→</span>
        <div className="text-center"><div className="w-8 h-8 rounded-[4px] border flex items-center justify-center text-[8px]" style={{ borderColor: green + "30", backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green }}>DB</div><div className="text-[6px] mt-0.5" style={{ color: textFaint }}>长期</div></div>
      </div>
    );

    case "tool-calling": return (
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

case "chain-of-thought": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
        {["分析","推理","结论"].map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-10 h-6 rounded-[5px] border flex items-center justify-center text-[7px] font-medium" style={{ borderColor: accent + "30", backgroundColor: accentBg, color: accent }}>{i+1}.{s}</div>
            {i < 2 && <span className="text-[7px]" style={{ color: textFaint }}>→</span>}
          </div>
        ))}
      </div>
    );

    case "multi-agent": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1.5" style={box}>
        {[{ emoji:"💻", role:"前端" },{ emoji:"🗄️", role:"后端" },{ emoji:"🧪", role:"测试" }].map((a,i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <div className="w-7 h-7 rounded-full border flex items-center justify-center text-[10px]" style={{ borderColor: i===0?accent+"30":i===1?green+"30":blue+"30", backgroundColor: i===0?accentBg:i===1?isDark?"rgba(143,184,154,0.08)":"rgba(95,138,107,0.06)":isDark?"rgba(123,163,201,0.08)":"rgba(74,127,165,0.06)" }}>{a.emoji}</div>
            <div className="text-[6px]" style={{ color: textFaint }}>{a.role}</div>
          </div>
        ))}
      </div>
    );

    case "orchestration": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="w-8 h-8 rounded-full border flex items-center justify-center text-[9px] font-bold" style={{ borderColor: accent, backgroundColor: accentBg, color: accent }}>编</div>
        <div className="flex flex-col gap-1 ml-2">
          {["爬取 → 清洗","分析 → 入库","报告 ✅"].map((t, i) => (
            <div key={i} className="px-1.5 py-0.5 rounded-[3px] text-[7px] font-mono" style={{ backgroundColor: surface, color: textFaint, border: `1px solid ${border}` }}>{t}</div>
          ))}
        </div>
      </div>
    );

    case "grounding": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px]" style={{ backgroundColor: accentBg }}>🧠</div>
          <div className="text-[6px]" style={{ color: accent }}>AI</div>
        </div>
        <div className="flex flex-col gap-1">
          {["📚 知识库","🔍 搜索引擎","🗄️ 数据库"].map((s,i) => (
            <div key={i} className="px-1.5 py-0.5 rounded-[3px] text-[7px] border flex items-center gap-1" style={{ borderColor: border, color: textFaint }}>{s}</div>
          ))}
        </div>
      </div>
    );

    case "sandbox": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="w-20 h-14 rounded-[6px] border-2 flex flex-col items-center justify-center gap-1 relative" style={{ borderColor: accent + "40", borderStyle: "dashed" }}>
          <div className="text-[7px] font-mono" style={{ color: green }}>$ node app.js</div>
          <div className="text-[7px] font-mono" style={{ color: textFaint }}>✓ OK</div>
          <div className="absolute -top-1.5 left-1 px-1 rounded-[2px] text-[6px] font-bold" style={{ backgroundColor: accentBg, color: accent }}>隔离</div>
        </div>
      </div>
    );

    case "guardrails": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-1 h-12 rounded-full" style={{ backgroundColor: accent + "30" }} />
          <div className="text-[6px]" style={{ color: textFaint }}>✓ 安全</div>
        </div>
        <div className="w-16 h-10 rounded-[4px] border flex items-center justify-center text-[7px]" style={{ borderColor: border, color: text }}>AI 输出</div>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-1 h-12 rounded-full" style={{ backgroundColor: accent + "30" }} />
          <div className="text-[6px]" style={{ color: textFaint }}>✕ 违规</div>
        </div>
      </div>
    );

    case "planning": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex flex-col justify-center gap-1" style={box}>
        {["分析需求","拆解任务","分配执行","验证结果"].map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold" style={{ backgroundColor: i<3 ? green : surface, color: i<3 ? "#fff" : textFaint, border: i<3 ? "none" : `1px solid ${border}` }}>{i<3 ? "✓" : (i+1)}</div>
            <span className="text-[7px]" style={{ color: i<3 ? text : textFaint }}>{s}</span>
          </div>
        ))}
      </div>
    );

    case "reflection": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
        {["执行","检查","修正","完成"].map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="px-1.5 py-0.5 rounded-[4px] text-[7px] font-medium" style={{ backgroundColor: i===1 ? accentBg : surface, color: i===1 ? accent : textFaint, border: `1px solid ${i===1 ? accent+"30" : border}` }}>{s}</div>
            {i < 3 && <span className="text-[7px]" style={{ color: i===2 ? accent : textFaint }}>{i===2 ? "↩" : "→"}</span>}
          </div>
        ))}
      </div>
    );

    case "human-in-loop": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-[14px]">👤</div>
          <div className="text-[6px]" style={{ color: accent }}>确认</div>
        </div>
        <span className="text-[9px]" style={{ color: green }}>⇄</span>
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-[14px]">🤖</div>
          <div className="text-[6px]" style={{ color: blue }}>执行</div>
        </div>
      </div>
    );

    case "autonomy": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex flex-col justify-center gap-1.5" style={box}>
        <div className="flex items-center gap-1.5">
          <span className="text-[7px]" style={{ color: text }}>自主性</span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: surface }}>
            <div className="h-full rounded-full w-3/4" style={{ backgroundColor: accent }} />
          </div>
        </div>
        <div className="flex justify-between text-[6px]" style={{ color: textFaint }}>
          <span>👤 低</span><span>⚡ 中</span><span>🤖 高</span>
        </div>
      </div>
    );

    case "subagent": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="flex flex-col items-center">
          <div className="w-8 h-5 rounded-[4px] border flex items-center justify-center text-[7px] font-bold" style={{ borderColor: accent, backgroundColor: accentBg, color: accent }}>主</div>
          <div className="flex gap-3 mt-1">
            {["搜索","编码","测试"].map((r,i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-0.5 h-2" style={{ backgroundColor: border }} />
                <div className="w-7 h-4 rounded-[3px] border flex items-center justify-center text-[6px]" style={{ borderColor: border, color: textFaint }}>{r}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    case "long-running": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex flex-col justify-center gap-1.5" style={box}>
        <div className="flex items-center gap-1.5">
          <span className="text-[7px]" style={{ color: text }}>🕐 批量处理</span>
          <span className="text-[7px] font-mono" style={{ color: accent }}>67%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: surface }}>
          <div className="h-full rounded-full" style={{ width: "67%", backgroundColor: accent }} />
        </div>
        <div className="text-[6px] flex justify-between" style={{ color: textFaint }}>
          <span>已用 42min</span><span>剩余 21min</span>
        </div>
      </div>
    );

    case "agentic-coding": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
        {["📖 读文件","✏️ 写代码","🧪 跑测试","🔧 修Bug"].map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="px-1 py-0.5 rounded-[3px] text-[6px] font-mono" style={{ backgroundColor: i===1 ? accentBg : surface, color: i===1 ? accent : textFaint, border: `1px solid ${i===1 ? accent+"30" : border}` }}>{s}</div>
            {i < 3 && <span className="text-[6px]" style={{ color: i===2 ? green : textFaint }}>{i===2 ? "↻" : "→"}</span>}
          </div>
        ))}
      </div>
    );

    case "agent-memory": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="w-8 h-8 rounded-[5px] border flex items-center justify-center text-[12px]" style={{ borderColor: accent + "30", backgroundColor: accentBg }}>💾</div>
        <div className="flex flex-col gap-0.5">
          {["偏好：React+TS","项目：/my-app","上次：修复了登录"].map((s,i) => (
            <div key={i} className="text-[7px] font-mono" style={{ color: i===0 ? text : textFaint }}>{s}</div>
          ))}
        </div>
      </div>
    );

case "fine-tuning": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
        <div className="px-1.5 py-1 rounded-[4px] text-[7px] font-mono text-center" style={{ backgroundColor: surface, color: textFaint, border: `1px solid ${border}` }}>通用模型</div>
        <span className="text-[7px]" style={{ color: textFaint }}>→</span>
        <div className="px-1.5 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}30` }}>微调</div>
        <span className="text-[7px]" style={{ color: textFaint }}>→</span>
        <div className="px-1.5 py-1 rounded-[4px] text-[7px] font-mono text-center" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.1)" : "rgba(95,138,107,0.08)", color: green, border: `1px solid ${green}30` }}>专家模型</div>
      </div>
    );

    case "multimodal": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-[6px] flex items-center justify-center text-[12px]" style={{ backgroundColor: accentBg, border: `1px solid ${accent}20` }}>📝</div>
          <span className="text-[6px]" style={{ color: accent }}>文字</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-[6px] flex items-center justify-center text-[12px]" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", border: `1px solid ${green}20` }}>🖼️</div>
          <span className="text-[6px]" style={{ color: green }}>图片</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-[6px] flex items-center justify-center text-[12px]" style={{ backgroundColor: isDark ? "rgba(123,163,201,0.08)" : "rgba(74,127,165,0.06)", border: `1px solid ${blue}20` }}>🎵</div>
          <span className="text-[6px]" style={{ color: blue }}>音频</span>
        </div>
      </div>
    );

    case "streaming": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-0.5" style={box}>
        <div style={{ color: text }}>AI: 你好，我是</div>
        <div style={{ color: text }}>AI助手，可以帮</div>
        <div style={{ color: accent }}>你解答问题▌</div>
        <div className="text-[7px] mt-1" style={{ color: textFaint, opacity: 0.6 }}>↑ 逐字生成中…</div>
      </div>
    );

    case "context-engineering": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="flex flex-col gap-0.5">
          <div className="px-1.5 py-0.5 rounded-[3px] text-[7px] font-mono" style={{ backgroundColor: accentBg, color: accent }}>项目背景</div>
          <div className="px-1.5 py-0.5 rounded-[3px] text-[7px] font-mono" style={{ backgroundColor: surface, color: textFaint }}>技术栈</div>
          <div className="px-1.5 py-0.5 rounded-[3px] text-[7px] font-mono" style={{ backgroundColor: surface, color: textFaint }}>约束条件</div>
        </div>
        <span className="text-[8px]" style={{ color: textFaint }}>→</span>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px]" style={{ backgroundColor: accentBg, border: `1px solid ${accent}30` }}>🤖</div>
        <div className="text-[6px]" style={{ color: green }}>精准<br/>回答</div>
      </div>
    );

    case "mcp": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1.5" style={box}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px]" style={{ backgroundColor: accentBg, border: `1px solid ${accent}30` }}>🤖</div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <span className="text-[6px]" style={{ color: textFaint }}>┌</span>
            <div className="px-1 py-0.5 rounded-[3px] text-[7px] font-mono" style={{ backgroundColor: surface, color: text, border: `1px solid ${border}` }}>📁 文件</div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[6px]" style={{ color: textFaint }}>├</span>
            <div className="px-1 py-0.5 rounded-[3px] text-[7px] font-mono" style={{ backgroundColor: surface, color: text, border: `1px solid ${border}` }}>🗄️ 数据库</div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[6px]" style={{ color: textFaint }}>└</span>
            <div className="px-1 py-0.5 rounded-[3px] text-[7px] font-mono" style={{ backgroundColor: surface, color: text, border: `1px solid ${border}` }}>🌐 浏览器</div>
          </div>
        </div>
      </div>
    );

    case "knowledge-base": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1.5" style={box}>
        <div className="flex flex-col gap-0.5">
          <div className="px-1.5 py-0.5 rounded-[3px] text-[7px] font-mono" style={{ backgroundColor: surface, color: textFaint }}>📄 文档</div>
          <div className="px-1.5 py-0.5 rounded-[3px] text-[7px] font-mono" style={{ backgroundColor: surface, color: textFaint }}>📋 FAQ</div>
          <div className="px-1.5 py-0.5 rounded-[3px] text-[7px] font-mono" style={{ backgroundColor: surface, color: textFaint }}>📖 手册</div>
        </div>
        <span className="text-[8px]" style={{ color: textFaint }}>→</span>
        <div className="px-1.5 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: yellow + "20", color: yellow }}>🔍 检索</div>
        <span className="text-[8px]" style={{ color: textFaint }}>→</span>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px]" style={{ backgroundColor: accentBg }}>🤖</div>
      </div>
    );

    case "inference": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1.5" style={box}>
        <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: surface, color: text, border: `1px solid ${border}` }}>输入</div>
        <span className="text-[7px]" style={{ color: textFaint }}>→</span>
        <div className="w-10 h-7 rounded-[4px] flex items-center justify-center text-[7px] font-bold" style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}30` }}>模型</div>
        <span className="text-[7px]" style={{ color: textFaint }}>→</span>
        <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.1)" : "rgba(95,138,107,0.08)", color: green, border: `1px solid ${green}20` }}>输出</div>
      </div>
    );

    case "training": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1.5" style={box}>
        <div className="flex flex-col gap-0.5 items-center">
          <div className="text-[10px]">📚</div>
          <div className="text-[6px]" style={{ color: textFaint }}>海量数据</div>
        </div>
        <span className="text-[7px]" style={{ color: textFaint }}>→</span>
        <div className="flex flex-col gap-0.5 items-center">
          <div className="text-[10px]">⚙️</div>
          <div className="text-[6px] font-mono" style={{ color: accent }}>训练</div>
        </div>
        <span className="text-[7px]" style={{ color: textFaint }}>→</span>
        <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.1)" : "rgba(95,138,107,0.08)", color: green, border: `1px solid ${green}30` }}>模型</div>
      </div>
    );

    case "open-source-model": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-9 h-9 rounded-[6px] flex items-center justify-center text-[10px]" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.12)" : "rgba(95,138,107,0.1)", border: `1px solid ${green}30` }}>📦</div>
          <span className="text-[6px]" style={{ color: green }}>开源</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[8px]" style={{ color: textFaint }}>⬇</span>
          <span className="text-[6px]" style={{ color: textFaint }}>下载</span>
        </div>
        <div className="text-[7px] font-mono space-y-0.5">
          <div style={{ color: text }}>Llama</div>
          <div style={{ color: text }}>Qwen</div>
          <div style={{ color: blue }}>DeepSeek</div>
        </div>
      </div>
    );

    case "api-key": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-1" style={box}>
        <div className="flex items-center gap-1.5">
          <span className="text-[12px]">🔑</span>
          <span style={{ color: text }}>sk-</span>
          <span style={{ color: accent }}>••••••••••</span>
          <span style={{ color: text }}>4kAb</span>
        </div>
        <div className="text-[7px] pl-6" style={{ color: textFaint }}>勿泄露 · 放 .env</div>
        <div className="text-[7px] pl-6" style={{ color: green }}>✓ 只读 · 限流</div>
      </div>
    );

    case "parameters": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="flex flex-col items-center gap-1">
          <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[7px] font-bold" style={{ borderColor: accent + "50", color: accent }}>7B</div>
          <span className="text-[6px]" style={{ color: textFaint }}>轻量</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[7px] font-bold" style={{ borderColor: yellow + "60", color: yellow }}>13B</div>
          <span className="text-[6px]" style={{ color: textFaint }}>均衡</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-[7px] font-bold" style={{ borderColor: green + "50", color: green }}>70B</div>
          <span className="text-[6px]" style={{ color: textFaint }}>强大</span>
        </div>
      </div>
    );

case "http": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1.5" style={box}>
        <div className="px-1.5 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: accentBg, color: accent }}>客户端</div>
        <span className="text-[8px]" style={{ color: textFaint }}>→</span>
        <div className="px-1.5 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: surface, color: textFaint, border: `1px solid ${border}` }}>请求</div>
        <span className="text-[8px]" style={{ color: textFaint }}>→</span>
        <div className="px-1.5 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green }}>服务器</div>
        <span className="text-[8px]" style={{ color: textFaint }}>→</span>
        <div className="px-1.5 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: surface, color: textFaint, border: `1px solid ${border}` }}>响应</div>
      </div>
    );

    case "rest": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex flex-col justify-center gap-1" style={box}>
        <div className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 rounded-[3px] text-[7px] font-bold font-mono" style={{ backgroundColor: "rgba(95,138,107,0.15)", color: green }}>GET</span><span className="text-[7px] font-mono" style={{ color: textFaint }}>/users</span></div>
        <div className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 rounded-[3px] text-[7px] font-bold font-mono" style={{ backgroundColor: "rgba(74,127,165,0.15)", color: blue }}>POST</span><span className="text-[7px] font-mono" style={{ color: textFaint }}>/users</span></div>
        <div className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 rounded-[3px] text-[7px] font-bold font-mono" style={{ backgroundColor: "rgba(201,154,60,0.15)", color: yellow }}>PUT</span><span className="text-[7px] font-mono" style={{ color: textFaint }}>/users/1</span></div>
        <div className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 rounded-[3px] text-[7px] font-bold font-mono" style={{ backgroundColor: "rgba(184,92,74,0.15)", color: isDark ? "#d4836f" : "#b85c4a" }}>DELETE</span><span className="text-[7px] font-mono" style={{ color: textFaint }}>/users/1</span></div>
      </div>
    );

    case "json": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-0.5 overflow-hidden" style={{ ...box, color: text }}>
        <div>{"{"}</div>
        <div className="pl-2"><span style={{ color: green }}>&quot;name&quot;</span>: <span style={{ color: accent }}>&quot;小明&quot;</span>,</div>
        <div className="pl-2"><span style={{ color: green }}>&quot;age&quot;</span>: <span style={{ color: yellow }}>20</span>,</div>
        <div className="pl-2"><span style={{ color: green }}>&quot;email&quot;</span>: <span style={{ color: blue }}>&quot;a@x.com&quot;</span></div>
        <div>{"}"}</div>
      </div>
    );

    case "cors": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}30` }}>A 网站</div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[10px]">🚫</span>
          <span className="text-[6px] font-mono" style={{ color: isDark ? "#d4836f" : "#b85c4a" }}>被拦截</span>
        </div>
        <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green, border: `1px solid ${green}30` }}>B 服务器</div>
        <span className="text-[7px]" style={{ color: textFaint }}>需允许</span>
      </div>
    );

    case "sql": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-0.5 overflow-hidden" style={{ ...box, color: text }}>
        <div><span style={{ color: accent }}>SELECT</span> <span style={{ color: blue }}>name</span>, <span style={{ color: blue }}>age</span></div>
        <div><span style={{ color: accent }}>FROM</span> <span style={{ color: green }}>users</span></div>
        <div><span style={{ color: accent }}>WHERE</span> <span style={{ color: blue }}>age</span> &gt; <span style={{ color: yellow }}>18</span></div>
        <div><span style={{ color: accent }}>ORDER BY</span> <span style={{ color: blue }}>name</span> <span style={{ color: accent }}>ASC</span></div>
      </div>
    );

    case "nosql": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="flex flex-col gap-1">
          <div className="px-1.5 py-0.5 rounded-[3px] text-[7px] font-mono" style={{ backgroundColor: surface, color: textFaint, border: `1px solid ${border}` }}>{"{ _id:1, name:\"A\", tag:[\"x\"] }"}</div>
          <div className="px-1.5 py-0.5 rounded-[3px] text-[7px] font-mono" style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}30` }}>{"{ _id:2, name:\"B\", color:\"red\" }"}</div>
          <div className="px-1.5 py-0.5 rounded-[3px] text-[7px] font-mono" style={{ backgroundColor: surface, color: textFaint, border: `1px solid ${border}` }}>{"{ _id:3, name:\"C\" }"}</div>
        </div>
        <div className="text-[6px] font-mono" style={{ color: textFaint }}>结构灵活<br/>无固定列</div>
      </div>
    );

    case "cookie": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="text-[20px]">🍪</div>
        <div className="font-mono text-[7px] space-y-0.5">
          <div style={{ color: green }}>sessionId=abc123</div>
          <div style={{ color: textFaint }}>Domain: .example.com</div>
          <div style={{ color: textFaint }}>HttpOnly · Secure</div>
          <div style={{ color: yellow }}>Expires: 7天后</div>
        </div>
      </div>
    );

    case "session": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3" style={box}>
        <div className="flex flex-col gap-1">
          <div className="w-10 h-5 rounded-[3px] border flex items-center justify-center text-[6px] font-mono" style={{ borderColor: accent + "30", backgroundColor: accentBg, color: accent }}>👤 用户A</div>
          <div className="w-10 h-5 rounded-[3px] border flex items-center justify-center text-[6px] font-mono" style={{ borderColor: green + "30", backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green }}>👤 用户B</div>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[8px]" style={{ color: textFaint }}>↕</span>
          <div className="px-1.5 py-0.5 rounded-[3px] text-[6px] font-mono" style={{ backgroundColor: surface, color: text, border: `1px solid ${border}` }}>服务端</div>
        </div>
      </div>
    );

    case "status-code": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="px-2 py-1 rounded-[5px] text-[9px] font-bold font-mono" style={{ backgroundColor: "rgba(95,138,107,0.15)", color: green }}>200 OK</div>
        <div className="px-2 py-1 rounded-[5px] text-[9px] font-bold font-mono" style={{ backgroundColor: "rgba(201,154,60,0.15)", color: yellow }}>404</div>
        <div className="px-2 py-1 rounded-[5px] text-[9px] font-bold font-mono" style={{ backgroundColor: "rgba(184,92,74,0.15)", color: isDark ? "#d4836f" : "#b85c4a" }}>500</div>
      </div>
    );

    case "concurrency": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1.5" style={box}>
        <div className="flex flex-col gap-0.5">
          {["req1","req2","req3","req4"].map((r, i) => (
            <div key={i} className="text-[6px] font-mono px-1 py-0.5 rounded-[2px]" style={{ backgroundColor: i % 2 === 0 ? accentBg : surface, color: i % 2 === 0 ? accent : textFaint }}>{r}</div>
          ))}
        </div>
        <span className="text-[8px]" style={{ color: textFaint }}>→</span>
        <div className="w-8 h-12 rounded-[4px] border flex items-center justify-center text-[7px] font-mono" style={{ borderColor: accent + "30", backgroundColor: accentBg, color: accent }}>并行<br/>处理</div>
      </div>
    );

    case "load-balancing": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1.5" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[7px] font-mono" style={{ color: textFaint }}>请求</span>
          <div className="w-4 h-4 rounded-full flex items-center justify-center text-[6px] font-mono" style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}30` }}>LB</div>
        </div>
        <span className="text-[8px]" style={{ color: textFaint }}>→</span>
        <div className="flex gap-1">
          {["S1","S2","S3"].map((s, i) => (
            <div key={i} className="w-6 h-6 rounded-[3px] border flex items-center justify-center text-[6px] font-mono" style={{ borderColor: border, backgroundColor: surface, color: textFaint }}>{s}</div>
          ))}
        </div>
      </div>
    );

    case "reverse-proxy": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1.5" style={box}>
        <span className="text-[7px] font-mono" style={{ color: textFaint }}>请求</span>
        <span className="text-[8px]">→</span>
        <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}30` }}>Nginx</div>
        <span className="text-[8px]">→</span>
        <div className="flex flex-col gap-0.5">
          <div className="px-1 py-0.5 rounded-[2px] text-[6px] font-mono" style={{ backgroundColor: surface, color: textFaint, border: `1px solid ${border}` }}>:3000 API</div>
          <div className="px-1 py-0.5 rounded-[2px] text-[6px] font-mono" style={{ backgroundColor: surface, color: textFaint, border: `1px solid ${border}` }}>:4000 Admin</div>
        </div>
      </div>
    );

    case "rate-limit": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-12 h-1.5 rounded-full" style={{ backgroundColor: accentBg }} />
          <div className="w-8 h-1.5 rounded-full" style={{ backgroundColor: accentBg }} />
          <div className="w-4 h-1.5 rounded-full" style={{ backgroundColor: accentBg }} />
          <div className="w-2 h-1.5 rounded-full" style={{ backgroundColor: accent + "40" }} />
        </div>
        <div className="text-[7px] font-mono space-y-0.5">
          <div style={{ color: accent }}>漏斗限流</div>
          <div style={{ color: textFaint }}>60次/分钟</div>
          <div style={{ color: isDark ? "#d4836f" : "#b85c4a" }}>超出→429</div>
        </div>
      </div>
    );

    case "timeout": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3" style={box}>
        <div className="relative w-8 h-10 flex items-center justify-center">
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[12px] border-transparent" style={{ borderTopColor: accent + "60" }} />
          <div className="absolute bottom-0 w-8 h-[6px] rounded-b-full" style={{ backgroundColor: accentBg }} />
          <div className="absolute top-[-2px] text-[7px]" style={{ color: accent }}>⏳</div>
        </div>
        <div className="text-[7px] font-mono space-y-0.5">
          <div style={{ color: isDark ? "#d4836f" : "#b85c4a" }}>Timeout!</div>
          <div style={{ color: textFaint }}>超过 5s 无响应</div>
          <div style={{ color: green }}>已自动重试</div>
        </div>
      </div>
    );

    case "orm": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1.5" style={box}>
        <div className="px-1.5 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}30` }}>user.find()</div>
        <span className="text-[8px]" style={{ color: textFaint }}>→</span>
        <div className="px-1.5 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: surface, color: textFaint, border: `1px solid ${border}` }}>翻译</div>
        <span className="text-[8px]" style={{ color: textFaint }}>→</span>
        <div className="px-1.5 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green, border: `1px solid ${green}30` }}>SELECT *</div>
      </div>
    );

    case "graphql": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[7px] space-y-0.5 overflow-hidden" style={{ ...box, color: text }}>
        <div><span style={{ color: accent }}>query</span> {"{"}</div>
        <div className="pl-2"><span style={{ color: blue }}>user</span>(id: <span style={{ color: yellow }}>1</span>) {"{"}</div>
        <div className="pl-4"><span style={{ color: green }}>name</span></div>
        <div className="pl-4"><span style={{ color: green }}>email</span></div>
        <div className="pl-2">{"}"}</div>
        <div>{"}"}</div>
      </div>
    );

    case "websocket": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}30` }}>客户端</div>
        <div className="flex items-center gap-0.5">
          <span className="text-[10px]" style={{ color: green }}>⇄</span>
        </div>
        <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green, border: `1px solid ${green}30` }}>服务器</div>
        <div className="text-[6px] font-mono" style={{ color: textFaint }}>全双工<br/>持久连接</div>
      </div>
    );

    case "microservices": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
        {["用户", "订单", "支付", "通知"].map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <div className="px-1.5 py-1 rounded-[4px] text-[6px] font-mono" style={{ backgroundColor: i === 0 ? accentBg : surface, color: i === 0 ? accent : textFaint, border: `1px solid ${border}` }}>{s}</div>
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: i < 3 ? green + "40" : "transparent" }} />
          </div>
        ))}
      </div>
    );

    case "serverless": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="flex flex-col gap-1">
          <div className="px-1.5 py-0.5 rounded-[3px] text-[6px] font-mono" style={{ backgroundColor: accentBg, color: accent }}>☁️ handler()</div>
          <div className="px-1.5 py-0.5 rounded-[3px] text-[6px] font-mono" style={{ backgroundColor: surface, color: textFaint }}>☁️ process()</div>
        </div>
        <div className="text-[7px] font-mono space-y-0.5">
          <div style={{ color: green }}>按需运行</div>
          <div style={{ color: textFaint }}>自动扩容</div>
          <div style={{ color: yellow }}>按调用付费</div>
        </div>
      </div>
    );

    case "queue": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1.5" style={box}>
        <div className="flex flex-col gap-0.5">
          {["📧 邮件","📊 报表","🔔 通知"].map((t, i) => (
            <div key={i} className="px-1.5 py-0.5 rounded-[3px] text-[6px] font-mono" style={{ backgroundColor: i === 0 ? accentBg : surface, color: i === 0 ? accent : textFaint, border: `1px solid ${border}` }}>{t}</div>
          ))}
        </div>
        <span className="text-[8px]" style={{ color: textFaint }}>→</span>
        <div className="px-1.5 py-1 rounded-[4px] text-[6px] font-mono flex items-center" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green }}>Worker<br/>逐个处理</div>
      </div>
    );

    case "cron": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="text-[18px]">⏰</div>
        <div className="font-mono text-[7px] space-y-0.5">
          <div style={{ color: accent }}>0 3 * * *</div>
          <div style={{ color: textFaint }}>每天凌晨 3:00</div>
          <div style={{ color: green }}>→ 备份数据库</div>
          <div style={{ color: textFaint }}>0 */6 * * *</div>
          <div style={{ color: yellow }}>→ 清理缓存</div>
        </div>
      </div>
    );

    case "logging": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[7px] space-y-0.5 overflow-hidden" style={{ ...box, color: text }}>
        <div><span style={{ color: textFaint }}>2024-01-15 10:23:01</span> <span style={{ color: green }}>[INFO]</span> <span style={{ color: text }}>Server started</span></div>
        <div><span style={{ color: textFaint }}>2024-01-15 10:23:45</span> <span style={{ color: yellow }}>[WARN]</span> <span style={{ color: text }}>Slow query 2.3s</span></div>
        <div><span style={{ color: textFaint }}>2024-01-15 10:24:12</span> <span style={{ color: isDark ? "#d4836f" : "#b85c4a" }}>[ERROR]</span> <span style={{ color: text }}>DB timeout</span></div>
      </div>
    );

    case "env-var": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[7px] space-y-1 overflow-hidden" style={{ ...box, color: text }}>
        <div><span style={{ color: accent }}>DATABASE_URL</span>=<span style={{ color: green }}>postgres://...</span></div>
        <div><span style={{ color: accent }}>API_KEY</span>=<span style={{ color: yellow }}>sk-abc123...</span></div>
        <div><span style={{ color: accent }}>PORT</span>=<span style={{ color: blue }}>3000</span></div>
        <div><span style={{ color: accent }}>NODE_ENV</span>=<span style={{ color: green }}>production</span></div>
      </div>
    );

    case "jwt": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="font-mono text-[7px] space-y-0.5 max-w-[150px]">
          <div className="text-center" style={{ color: text }}>
            <span style={{ color: isDark ? "#d4836f" : "#b85c4a" }}>eyJhbGci.</span>
            <span style={{ color: accent }}>eyJ1c2Vy.</span>
            <span style={{ color: blue }}>SflKxwR</span>
          </div>
          <div className="flex justify-between text-[6px]">
            <span style={{ color: isDark ? "#d4836f" : "#b85c4a" }}>Header</span>
            <span style={{ color: accent }}>Payload</span>
            <span style={{ color: blue }}>Signature</span>
          </div>
          <div className="text-center text-[6px]" style={{ color: textFaint }}>三段式·自包含·可验证</div>
        </div>
      </div>
    );

case "minimalism": return (
      <div className="h-[88px] rounded-[10px] border flex items-center justify-center" style={box}>
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accent }} />
        <span className="text-[7px] ml-2" style={{ color: textFaint }}>少即是多</span>
      </div>
    );

    case "glassmorphism": return (
      <div className="h-[88px] rounded-[10px] border relative overflow-hidden" style={box}>
        <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at 30% 40%, ${accent}, ${blue}, ${green})` }} />
        <div className="absolute inset-3 rounded-[6px] border flex items-center justify-center" style={{ borderColor: "rgba(255,255,255,0.2)", backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.4)" }}>
          <span className="text-[8px] font-medium" style={{ color: isDark ? "#fff" : "#333" }}>磨砂玻璃 card</span>
        </div>
      </div>
    );

    case "neumorphism": return (
      <div className="h-[88px] rounded-[10px] border flex items-center justify-center gap-4" style={{ ...box, backgroundColor: isDark ? "#2a2824" : "#e8e4de" }}>
        <div className="w-8 h-8 rounded-[10px] flex items-center justify-center text-[7px] font-bold" style={{ color: accent, backgroundColor: isDark ? "#2a2824" : "#e8e4de", boxShadow: isDark ? "3px 3px 6px #1a1814, -2px -2px 5px #3a3834" : "3px 3px 6px #c8c4be, -2px -2px 5px #ffffff" }}>+</div>
        <div className="w-8 h-8 rounded-[10px] flex items-center justify-center text-[7px] font-bold" style={{ color: textFaint, backgroundColor: isDark ? "#2a2824" : "#e8e4de", boxShadow: isDark ? "inset 3px 3px 6px #1a1814, inset -2px -2px 5px #3a3834" : "inset 3px 3px 6px #c8c4be, inset -2px -2px 5px #ffffff" }}>-</div>
      </div>
    );

    case "brutalism": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center gap-2" style={{ ...box, backgroundColor: yellow + "20", borderColor: isDark ? yellow + "80" : "#222", borderWidth: 2 }}>
        <div className="px-2 py-1 text-[7px] font-bold border-2" style={{ color: isDark ? "#fff" : "#222", borderColor: isDark ? "#fff" : "#222", backgroundColor: accent, boxShadow: "3px 3px 0 #000" }}>CLICK</div>
        <div className="px-2 py-1 text-[7px] font-bold border-2" style={{ color: isDark ? "#fff" : "#222", borderColor: isDark ? "#fff" : "#222", backgroundColor: green, boxShadow: "3px 3px 0 #000" }}>HARD</div>
        <div className="px-2 py-1 text-[7px] font-bold border-2" style={{ color: isDark ? "#fff" : "#222", borderColor: isDark ? "#fff" : "#222", backgroundColor: blue, boxShadow: "3px 3px 0 #000" }}>RAW</div>
      </div>
    );

    case "gradient": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex flex-col justify-center gap-1.5" style={box}>
        <div className="h-3 rounded-[3px]" style={{ background: `linear-gradient(90deg, ${accent}, ${yellow})` }} />
        <div className="h-3 rounded-[3px]" style={{ background: `linear-gradient(90deg, ${yellow}, ${green})` }} />
        <div className="h-3 rounded-[3px]" style={{ background: `linear-gradient(90deg, ${green}, ${blue})` }} />
        <div className="h-3 rounded-[3px]" style={{ background: `linear-gradient(90deg, ${blue}, ${accent})` }} />
        <div className="text-[7px] text-center" style={{ color: textFaint }}>linear / radial / conic 渐变</div>
      </div>
    );

    case "responsive-design": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-end justify-center gap-2" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-5 h-10 rounded-[3px] border flex flex-col p-0.5 gap-px" style={{ borderColor: border }}>
            <div className="h-1.5 rounded-px" style={{ backgroundColor: accentBg }} />
            <div className="h-1 rounded-px" style={{ backgroundColor: surface }} />
            <div className="h-1 rounded-px" style={{ backgroundColor: surface }} />
          </div>
          <span className="text-[6px]" style={{ color: textFaint }}>📱 单列</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-8 h-8 rounded-[3px] border grid grid-cols-2 gap-px p-0.5" style={{ borderColor: border }}>
            <div className="rounded-px" style={{ backgroundColor: accentBg }} />
            <div className="rounded-px" style={{ backgroundColor: surface }} />
            <div className="rounded-px" style={{ backgroundColor: surface }} />
            <div className="rounded-px" style={{ backgroundColor: accentBg }} />
          </div>
          <span className="text-[6px]" style={{ color: textFaint }}>📋 两列</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-10 h-6 rounded-[3px] border grid grid-cols-3 gap-px p-0.5" style={{ borderColor: border }}>
            <div className="rounded-px" style={{ backgroundColor: accentBg }} />
            <div className="rounded-px" style={{ backgroundColor: surface }} />
            <div className="rounded-px" style={{ backgroundColor: accentBg }} />
            <div className="rounded-px" style={{ backgroundColor: surface }} />
            <div className="rounded-px" style={{ backgroundColor: accentBg }} />
            <div className="rounded-px" style={{ backgroundColor: surface }} />
          </div>
          <span className="text-[6px]" style={{ color: textFaint }}>🖥 三列</span>
        </div>
      </div>
    );

    case "bento-grid": return (
      <div className="h-[88px] rounded-[10px] border p-2 grid grid-cols-4 grid-rows-3 gap-1" style={box}>
        <div className="col-span-2 row-span-2 rounded-[4px] flex items-center justify-center text-[7px] font-bold" style={{ backgroundColor: accentBg, color: accent }}>主</div>
        <div className="col-span-2 rounded-[4px] flex items-center justify-center text-[6px]" style={{ backgroundColor: surface, color: textFaint }}>辅 A</div>
        <div className="rounded-[4px] flex items-center justify-center text-[6px]" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green }}>B</div>
        <div className="rounded-[4px] flex items-center justify-center text-[6px]" style={{ backgroundColor: surface, color: textFaint }}>C</div>
        <div className="col-span-2 rounded-[4px] flex items-center justify-center text-[6px]" style={{ backgroundColor: surface, color: textFaint }}>辅 D</div>
      </div>
    );

case "ux": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
        {["入口","操作","完成"].map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="px-2 py-1 rounded-[4px] text-[7px] font-medium" style={{ backgroundColor: i < 2 ? accentBg : surface, color: i < 2 ? accent : textFaint, border: `1px solid ${i < 2 ? accent + "30" : border}` }}>{s}</div>
            {i < 2 && <span className="text-[7px]" style={{ color: textFaint }}>→</span>}
          </div>
        ))}
      </div>
    );

    case "hierarchy": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex flex-col justify-center gap-1.5" style={box}>
        <div className="h-4 w-full rounded-[4px]" style={{ backgroundColor: accentBg, border: `1px solid ${accent}40` }} />
        <div className="h-3 w-3/4 rounded-[3px]" style={{ backgroundColor: surface, border: `1px solid ${border}` }} />
        <div className="h-2 w-1/2 rounded-[3px]" style={{ backgroundColor: surface, border: `1px solid ${border}` }} />
        <div className="flex justify-between text-[7px]" style={{ color: textFaint }}><span>H1 最大</span><span>H2 次之</span><span>正文最小</span></div>
      </div>
    );

    case "accessibility": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="text-[22px]">♿</div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <div className="w-6 h-6 rounded-[4px] flex items-center justify-center text-[7px] font-bold" style={{ backgroundColor: "#fff", color: "#000", border: "1px solid #000" }}>WCAG</div>
            <div className="w-6 h-6 rounded-[4px] flex items-center justify-center text-[7px] font-bold" style={{ backgroundColor: "#000", color: "#fff" }}>AA</div>
          </div>
          <div className="flex gap-1">
            <div className="w-6 h-6 rounded-[4px] flex items-center justify-center text-[7px]" style={{ backgroundColor: "#eee", color: "#ccc" }}>Low</div>
            <div className="w-6 h-6 rounded-[4px] flex items-center justify-center text-[7px]" style={{ backgroundColor: accentBg, color: accent }}>4.5:1</div>
          </div>
        </div>
      </div>
    );

    case "loading": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3" style={box}>
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-current animate-spin" style={{ color: accent }} />
          <div className="absolute inset-1.5 rounded-full border" style={{ borderColor: accent + "20" }} />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="h-1.5 w-20 rounded-full overflow-hidden" style={{ backgroundColor: surface }}>
            <div className="h-full rounded-full" style={{ width: "65%", backgroundColor: accent }} />
          </div>
          <div className="text-[7px]" style={{ color: textFaint }}>加载中 65%...</div>
        </div>
      </div>
    );

    case "layout": return (
      <div className="h-[88px] rounded-[10px] border overflow-hidden flex flex-col" style={box}>
        <div className="h-3 border-b flex items-center px-2 gap-1" style={{ borderColor: border }}>
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: accent }} />
          <div className="h-0.5 w-8 rounded-full" style={{ backgroundColor: surface }} />
        </div>
        <div className="flex-1 flex">
          <div className="w-8 border-r p-1 space-y-0.5" style={{ borderColor: border }}>
            <div className="h-1 rounded-full" style={{ backgroundColor: accentBg }} />
            <div className="h-1 rounded-full" style={{ backgroundColor: surface }} />
            <div className="h-1 rounded-full" style={{ backgroundColor: surface }} />
          </div>
          <div className="flex-1 p-1 grid grid-cols-3 gap-0.5">
            <div className="rounded-[2px]" style={{ backgroundColor: accentBg }} />
            <div className="rounded-[2px]" style={{ backgroundColor: surface }} />
            <div className="rounded-[2px]" style={{ backgroundColor: surface }} />
          </div>
        </div>
      </div>
    );

    case "contrast": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex flex-col justify-center gap-2" style={box}>
        <div className="flex items-center gap-2">
          <div className="w-11 h-6 rounded-[4px] flex items-center justify-center text-[7px] font-bold" style={{ backgroundColor: "#fff", color: "#111", border: `1px solid ${border}` }}>白底黑字</div>
          <span className="text-[7px]" style={{ color: green }}>✓ 清晰</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-11 h-6 rounded-[4px] flex items-center justify-center text-[7px]" style={{ backgroundColor: "#e8e8e4", color: "#bbb", border: `1px solid ${border}` }}>灰底灰字</div>
          <span className="text-[7px]" style={{ color: accent }}>✗ 费眼</span>
        </div>
        <div className="text-[7px]" style={{ color: textFaint }}>对比度 4.5:1 → WCAG AA</div>
      </div>
    );

    case "card-design": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1.5" style={box}>
        {[1, 2, 3].map(i => (
          <div key={i} className="w-9 h-12 rounded-[4px] border flex flex-col overflow-hidden" style={{ borderColor: border }}>
            <div className="h-5" style={{ backgroundColor: i === 1 ? accentBg : surface }} />
            <div className="flex-1 p-1 space-y-0.5">
              <div className="h-1 rounded-full" style={{ backgroundColor: i === 1 ? accent + "40" : surface }} />
              <div className="h-0.5 rounded-full w-2/3" style={{ backgroundColor: surface }} />
            </div>
          </div>
        ))}
      </div>
    );

    case "navbar-design": return (
      <div className="h-[88px] rounded-[10px] border overflow-hidden flex flex-col" style={box}>
        <div className="h-5 border-b flex items-center px-2 gap-2" style={{ borderColor: border }}>
          <div className="w-4 h-3 rounded-[3px]" style={{ backgroundColor: accentBg }} />
          <div className="h-1 w-3 rounded-full" style={{ backgroundColor: accent + "50" }} />
          <div className="h-1 w-3 rounded-full" style={{ backgroundColor: surface }} />
          <div className="h-1 w-3 rounded-full" style={{ backgroundColor: surface }} />
          <div className="ml-auto h-2 w-5 rounded-[3px]" style={{ backgroundColor: accent, opacity: 0.6 }} />
        </div>
        <div className="flex-1 p-2 flex items-center justify-center text-[7px]" style={{ color: textFaint }}>
          Logo · 首页 · 博客 · 关于 · 登录
        </div>
      </div>
    );

    case "footer-design": return (
      <div className="h-[88px] rounded-[10px] border overflow-hidden flex flex-col" style={box}>
        <div className="flex-1 p-2 grid grid-cols-3 gap-1">
          {[["产品","价格","帮助"],["资源","博客","文档"],["关于","联系","团队"]].map((col, i) => (
            <div key={i} className="space-y-0.5">
              <div className="text-[7px] font-medium" style={{ color: text }}>{col[0]}</div>
              <div className="text-[6px] space-y-0.5" style={{ color: textFaint }}>
                <div>{col[1]}</div><div>{col[2]}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-4 border-t flex items-center justify-center text-[6px]" style={{ borderColor: border, color: textFaint }}>© 2024 版权所有 · 备案号 · 隐私政策</div>
      </div>
    );

    case "empty-state": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="text-center space-y-1.5">
          <div className="text-[18px]">📭</div>
          <div className="text-[8px] font-medium" style={{ color: text }}>还没有内容</div>
          <div className="text-[7px]" style={{ color: textFaint }}>去创建第一条吧</div>
          <div className="mx-auto w-10 h-3 rounded-[3px] flex items-center justify-center text-[6px] font-medium" style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}30` }}>+ 立即创建</div>
        </div>
      </div>
    );

    case "navbar": return (
      <div className="h-[88px] rounded-[10px] border overflow-hidden flex flex-col" style={box}>
        <div className="h-5 border-b flex items-center px-2 gap-2" style={{ borderColor: border, backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)" }}>
          <div className="text-[8px] font-bold" style={{ color: accent }}>◈ Logo</div>
          <div className="flex gap-1.5 ml-2 text-[7px]" style={{ color: textFaint }}>
            <span style={{ color: accent }}>首页</span><span>博客</span><span>关于</span>
          </div>
          <div className="ml-auto w-4 h-2.5 rounded-[3px]" style={{ backgroundColor: accent, opacity: 0.7 }} />
        </div>
        <div className="flex-1 p-1.5 flex items-center justify-center text-[7px]" style={{ color: textFaint }}>固定顶部 · 全局导航入口</div>
      </div>
    );

    case "sidebar": return (
      <div className="h-[88px] rounded-[10px] border overflow-hidden flex" style={box}>
        <div className="w-10 border-r p-1 space-y-1" style={{ borderColor: border }}>
          <div className="h-1.5 rounded-full w-full" style={{ backgroundColor: accentBg }} />
          <div className="h-1 rounded-full w-full" style={{ backgroundColor: surface }} />
          <div className="h-1 rounded-full w-3/4 ml-auto" style={{ backgroundColor: surface }} />
          <div className="h-1 rounded-full w-2/3 ml-auto" style={{ backgroundColor: surface }} />
          <div className="h-1 rounded-full w-full mt-1" style={{ backgroundColor: surface }} />
          <div className="h-1 rounded-full w-3/4" style={{ backgroundColor: surface }} />
        </div>
        <div className="flex-1 p-1.5 flex items-center justify-center text-[7px]" style={{ color: textFaint }}>左侧导航 · 多级菜单</div>
      </div>
    );

    case "header": return (
      <div className="h-[88px] rounded-[10px] border overflow-hidden flex flex-col" style={box}>
        <div className="h-5 border-b flex items-center px-2 gap-1.5" style={{ borderColor: border }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
          <div className="h-1 w-6 rounded-full" style={{ backgroundColor: surface }} />
          <div className="ml-auto h-1 w-3 rounded-full" style={{ backgroundColor: surface }} />
          <div className="h-1 w-3 rounded-full" style={{ backgroundColor: surface }} />
        </div>
        <div className="flex-1 p-2 flex flex-col justify-center items-center gap-1" style={{ backgroundColor: accentBg }}>
          <div className="h-2 w-16 rounded-full" style={{ backgroundColor: accent, opacity: 0.5 }} />
          <div className="h-1.5 w-10 rounded-full" style={{ backgroundColor: surface }} />
          <div className="h-2.5 w-6 rounded-[3px] mt-0.5" style={{ backgroundColor: accent }} />
        </div>
      </div>
    );

    case "footer": return (
      <div className="h-[88px] rounded-[10px] border overflow-hidden flex flex-col" style={box}>
        <div className="flex-1 p-2 flex justify-between items-start gap-1">
          <div className="space-y-0.5"><div className="text-[6px] font-medium" style={{ color: text }}>产品</div><div className="text-[5px] space-y-0.5" style={{ color: textFaint }}><div>文档</div><div>API</div></div></div>
          <div className="space-y-0.5"><div className="text-[6px] font-medium" style={{ color: text }}>资源</div><div className="text-[5px] space-y-0.5" style={{ color: textFaint }}><div>博客</div><div>社区</div></div></div>
          <div className="space-y-0.5"><div className="text-[6px] font-medium" style={{ color: text }}>联系</div><div className="text-[5px] space-y-0.5" style={{ color: textFaint }}><div>邮箱</div><div>微信</div></div></div>
        </div>
        <div className="h-3 border-t flex items-center justify-center text-[6px] gap-1" style={{ borderColor: border, color: textFaint }}>
          <span>© 2024</span><span>·</span><span>备案号</span>
        </div>
      </div>
    );

    case "hero-section": return (
      <div className="h-[88px] rounded-[10px] border overflow-hidden flex flex-col" style={box}>
        <div className="flex-1 p-2 flex flex-col justify-center items-center gap-1.5" style={{ backgroundColor: accentBg }}>
          <div className="h-3 w-20 rounded-full" style={{ backgroundColor: accent, opacity: 0.4 }} />
          <div className="h-2 w-14 rounded-full" style={{ backgroundColor: surface }} />
          <div className="h-1.5 w-10 rounded-full" style={{ backgroundColor: surface }} />
          <div className="flex gap-1.5 mt-1">
            <div className="h-2.5 w-10 rounded-[3px]" style={{ backgroundColor: accent }} />
            <div className="h-2.5 w-10 rounded-[3px]" style={{ backgroundColor: surface, border: `1px solid ${border}` }} />
          </div>
        </div>
      </div>
    );

    case "cta": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="flex flex-col items-center gap-1.5">
          <div className="text-[8px] font-medium" style={{ color: text }}>准备好开始了吗？</div>
          <div className="px-4 py-2 rounded-[6px] text-[8px] font-bold text-white" style={{ backgroundColor: accent, boxShadow: `0 2px 8px ${accent}40` }}>立即免费试用</div>
          <div className="text-[6px]" style={{ color: textFaint }}>无需信用卡 · 14 天免费</div>
        </div>
      </div>
    );

    case "card": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="w-16 h-14 rounded-[6px] border flex flex-col overflow-hidden" style={{ borderColor: border, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div className="h-7" style={{ backgroundColor: accentBg }} />
          <div className="flex-1 p-1 space-y-0.5">
            <div className="h-1.5 rounded-full" style={{ backgroundColor: surface, opacity: 0.8 }} />
            <div className="h-1 rounded-full w-3/4" style={{ backgroundColor: surface }} />
          </div>
          <div className="h-3 border-t flex items-center px-1 text-[5px]" style={{ borderColor: border, color: textFaint }}>📅 2024 · 🔗 详情</div>
        </div>
      </div>
    );

    case "accordion": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex flex-col justify-center gap-1" style={box}>
        <div className="flex items-center justify-between px-2 py-1 rounded-[4px] text-[7px] font-medium" style={{ backgroundColor: accentBg, color: accent }}>
          <span>什么是 FAQ？</span><span>▾</span>
        </div>
        <div className="px-2 py-1 rounded-[4px] text-[7px]" style={{ backgroundColor: surface, color: textFaint }}>
          常见问题解答，帮助用户自助查询...
        </div>
        <div className="flex items-center justify-between px-2 py-1 rounded-[4px] text-[7px]" style={{ color: textFaint }}>
          <span>如何退款？</span><span>▸</span>
        </div>
      </div>
    );

    case "tab": return (
      <div className="h-[88px] rounded-[10px] border overflow-hidden flex flex-col" style={box}>
        <div className="h-5 border-b flex items-center px-2 gap-1" style={{ borderColor: border }}>
          <div className="px-2 h-full flex items-center text-[7px] font-medium border-b-2" style={{ color: accent, borderColor: accent }}>全部</div>
          <div className="px-2 h-full flex items-center text-[7px]" style={{ color: textFaint }}>已发布</div>
          <div className="px-2 h-full flex items-center text-[7px]" style={{ color: textFaint }}>草稿</div>
        </div>
        <div className="flex-1 p-1.5 flex items-center justify-center text-[7px]" style={{ color: textFaint }}>切换标签 → 切换内容区</div>
      </div>
    );

    case "tooltip": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="relative flex items-center gap-3">
          <div className="w-6 h-6 rounded-[4px] flex items-center justify-center text-[10px]" style={{ backgroundColor: surface, border: `1px solid ${border}` }}>⚙</div>
          <div className="px-2 py-1 rounded-[4px] text-[7px] relative" style={{ backgroundColor: isDark ? "#2a2822" : "#333", color: "#fff" }}>
            设置
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-r-[4px]" style={{ borderRightColor: isDark ? "#2a2822" : "#333" }} />
          </div>
        </div>
      </div>
    );

    case "copyright": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="text-center space-y-1">
          <div className="text-[16px] font-bold" style={{ color: text }}>©</div>
          <div className="text-[8px] font-medium" style={{ color: text }}>2024 桂鱼 版权所有</div>
          <div className="text-[7px]" style={{ color: textFaint }}>All rights reserved</div>
        </div>
      </div>
    );

    case "micro-interaction": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3" style={box}>
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute w-3 h-3 rounded-full animate-ping opacity-20" style={{ backgroundColor: accent }} />
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ backgroundColor: accentBg, border: `1.5px solid ${accent}40` }}>❤</div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-[8px] font-medium" style={{ color: text }}>点赞反馈</div>
          <div className="text-[7px]" style={{ color: textFaint }}>点击波纹 · 缩放弹跳</div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent + "50" }} />
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent + "30", animationDelay: "0.15s" }} />
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent + "15", animationDelay: "0.3s" }} />
          </div>
        </div>
      </div>
    );

    case "design-system": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex flex-col justify-center gap-1.5" style={box}>
        <div className="flex gap-1">
          {[accent, green, yellow, blue].map((c, i) => (
            <div key={i} className="w-4 h-4 rounded-[3px]" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className="flex gap-0.5 items-end">
          <div className="h-3 w-3 rounded-[2px]" style={{ backgroundColor: surface }} />
          <div className="h-4 w-4 rounded-[2px]" style={{ backgroundColor: accentBg, border: `1px solid ${accent}30` }} />
        </div>
        <div className="flex gap-1 text-[6px]" style={{ color: textFaint }}>
          <span>色板</span><span>·</span><span>字体 Aa</span><span>·</span><span>组件库</span>
        </div>
      </div>
    );

case "cicd": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
        {["push", "test", "build", "deploy"].map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="px-1.5 py-0.5 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: i === 3 ? accentBg : surface, color: i === 3 ? accent : textFaint, border: `1px solid ${i === 3 ? accent + "30" : border}` }}>{s}</div>
            {i < 3 && <span className="text-[6px]" style={{ color: textFaint }}>→</span>}
          </div>
        ))}
      </div>
    );

    case "env": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-0.5 overflow-hidden" style={{ ...box, color: text }}>
        <div><span style={{ color: accent }}>DATABASE_URL</span>=<span style={{ color: green }}>postgres://...</span></div>
        <div><span style={{ color: accent }}>API_KEY</span>=<span style={{ color: yellow }}>sk-abc123</span></div>
        <div><span style={{ color: accent }}>PORT</span>=<span style={{ color: blue }}>3000</span></div>
        <div><span style={{ color: accent }}>NODE_ENV</span>=<span style={{ color: green }}>production</span></div>
      </div>
    );

    case "log": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[7px] space-y-0.5 overflow-hidden" style={{ ...box, color: textFaint }}>
        <div><span style={{ color: textFaint }}>[2024-01-15 14:23:01]</span> <span style={{ color: green }}>INFO</span>  <span style={{ color: text }}>GET /api/users</span> <span style={{ color: blue }}>200</span> <span style={{ color: textFaint }}>45ms</span></div>
        <div><span style={{ color: textFaint }}>[2024-01-15 14:23:02]</span> <span style={{ color: yellow }}>WARN</span>  <span style={{ color: text }}>POST /api/login</span> <span style={{ color: accent }}>401</span></div>
        <div><span style={{ color: textFaint }}>[2024-01-15 14:23:05]</span> <span style={{ color: isDark ? "#d4836f" : "#b85c4a" }}>ERROR</span> <span style={{ color: text }}>DB timeout</span></div>
      </div>
    );

    case "monitoring": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center gap-2" style={box}>
        <div className="flex-1 space-y-1">
          <div className="flex items-end gap-0.5 h-10">
            {[30,50,45,70,60,85,42,65,80,55].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-[2px]" style={{ height: `${h}%`, backgroundColor: h > 75 ? accent + "60" : green + "60" }} />
            ))}
          </div>
          <div className="h-3 rounded-[3px] flex items-center px-1 text-[6px]" style={{ backgroundColor: isDark ? "rgba(184,92,74,0.1)" : "rgba(184,92,74,0.06)", color: isDark ? "#d4836f" : "#b85c4a" }}>⚠ CPU 92%</div>
        </div>
        <div className="text-[7px] space-y-0.5" style={{ color: textFaint }}>
          <div>📊 CPU</div><div>💾 RAM</div><div>🔴 Alert</div>
        </div>
      </div>
    );

    case "backup": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-10 h-6 rounded-[4px] border flex items-center justify-center text-[6px]" style={{ borderColor: accent + "30", backgroundColor: accentBg, color: accent }}>📊 DB</div>
          <span className="text-[6px]" style={{ color: textFaint }}>每日</span>
        </div>
        <span className="text-[8px]" style={{ color: textFaint }}>→</span>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-10 h-8 rounded-[4px] border flex items-center justify-center text-[9px]" style={{ borderColor: green + "30", backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green }}>💾</div>
          <span className="text-[6px]" style={{ color: green }}>云端</span>
        </div>
        <span className="text-[8px]" style={{ color: textFaint }}>→</span>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-10 h-8 rounded-[4px] border flex items-center justify-center text-[9px]" style={{ borderColor: blue + "30", backgroundColor: isDark ? "rgba(123,163,201,0.08)" : "rgba(74,127,165,0.06)", color: blue }}>♻</div>
          <span className="text-[6px]" style={{ color: blue }}>可恢复</span>
        </div>
      </div>
    );

    case "tunnel": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="flex items-center gap-0">
          <div className="text-[7px] px-1.5 py-1 rounded-[4px]" style={{ backgroundColor: surface, color: textFaint }}>🌐 外网</div>
          <div className="w-12 h-0.5 relative" style={{ backgroundColor: textFaint + "40" }}>
            <div className="absolute -top-1 left-0 right-0 flex justify-center"><span className="text-[6px]" style={{ color: accent }}>🔒</span></div>
          </div>
          <div className="w-8 h-8 rounded-[4px] border flex items-center justify-center text-[7px]" style={{ borderColor: accent + "30", backgroundColor: accentBg, color: accent }}>T</div>
          <div className="w-8 h-8 rounded-[4px] border border-dashed flex items-center justify-center text-[6px]" style={{ borderColor: border, color: textFaint }}></div>
          <div className="text-[7px] px-1.5 py-1 rounded-[4px]" style={{ backgroundColor: accentBg, color: accent }}>🏠 NAS</div>
        </div>
      </div>
    );

    case "port": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
        <div className="flex flex-col items-center">
          <div className="text-[7px] font-mono" style={{ color: text }}>🌐 :80</div>
          <div className="w-12 h-8 rounded-[5px] border flex flex-col p-1 gap-0.5" style={{ borderColor: border }}>
            <div className="flex gap-0.5">
              <div className="w-5 h-3 rounded-[2px] flex items-center justify-center text-[5px] font-mono" style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}20` }}>3000</div>
              <div className="w-5 h-3 rounded-[2px] flex items-center justify-center text-[5px] font-mono" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.1)" : "rgba(95,138,107,0.08)", color: green, border: `1px solid ${green}20` }}>4000</div>
            </div>
            <div className="flex gap-0.5">
              <div className="w-5 h-3 rounded-[2px] flex items-center justify-center text-[5px] font-mono" style={{ backgroundColor: surface, color: textFaint, border: `1px solid ${border}` }}>5432</div>
              <div className="w-5 h-3 rounded-[2px] flex items-center justify-center text-[5px] font-mono" style={{ backgroundColor: surface, color: textFaint, border: `1px solid ${border}` }}>6379</div>
            </div>
          </div>
        </div>
        <div className="text-[7px] font-mono" style={{ color: textFaint }}>IP: 192.168.1.1</div>
      </div>
    );

    case "nas": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="w-12 h-12 rounded-[6px] border flex flex-col items-center justify-center gap-0.5" style={{ borderColor: accent + "30", backgroundColor: accentBg }}>
          <div className="text-[14px]">🏠</div>
          <div className="text-[6px] font-mono" style={{ color: accent }}>NAS</div>
        </div>
        <div className="text-[7px] space-y-0.5" style={{ color: textFaint }}>
          <div>📁 文件存储</div>
          <div>🐳 Docker</div>
          <div>🌐 私有云</div>
          <div className="text-[6px]" style={{ color: accent }}>24h 开机</div>
        </div>
      </div>
    );

    case "cloud-server": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="flex flex-col items-center gap-1">
          <div className="text-[18px]">☁️</div>
          <div className="flex gap-0.5">
            <div className="w-4 h-4 rounded-[2px]" style={{ backgroundColor: accent + "30", border: `1px solid ${accent}40` }} />
            <div className="w-4 h-4 rounded-[2px]" style={{ backgroundColor: green + "30", border: `1px solid ${green}40` }} />
            <div className="w-4 h-4 rounded-[2px]" style={{ backgroundColor: blue + "30", border: `1px solid ${blue}40` }} />
          </div>
        </div>
        <div className="text-[7px] font-mono space-y-0.5" style={{ color: textFaint }}>
          <div>CPU 2c · RAM 4G</div>
          <div>公网 IP ✓</div>
          <div className="text-[6px]" style={{ color: green }}>24h 在线</div>
        </div>
      </div>
    );

    case "bandwidth": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-end justify-center gap-3" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-[6px]" style={{ color: textFaint }}>慢</div>
          <div className="w-5 h-12 rounded-t-[3px] relative overflow-hidden" style={{ backgroundColor: surface, border: `1px solid ${border}` }}>
            <div className="absolute bottom-0 w-full h-6 rounded-t-[2px]" style={{ backgroundColor: accent + "40" }} />
          </div>
          <div className="text-[6px]" style={{ color: accent }}>1Mbps</div>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-[6px]" style={{ color: textFaint }}>中</div>
          <div className="w-10 h-12 rounded-t-[3px] relative overflow-hidden" style={{ backgroundColor: surface, border: `1px solid ${border}` }}>
            <div className="absolute bottom-0 w-full h-8 rounded-t-[2px]" style={{ backgroundColor: yellow + "40" }} />
          </div>
          <div className="text-[6px]" style={{ color: yellow }}>10Mbps</div>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-[6px]" style={{ color: textFaint }}>快</div>
          <div className="w-12 h-12 rounded-t-[3px] relative overflow-hidden" style={{ backgroundColor: surface, border: `1px solid ${border}` }}>
            <div className="absolute bottom-0 w-full h-10 rounded-t-[2px]" style={{ backgroundColor: green + "40" }} />
          </div>
          <div className="text-[6px]" style={{ color: green }}>100Mbps</div>
        </div>
      </div>
    );

    case "latency": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-[8px]">🟢</div>
          <div className="text-[7px] font-mono" style={{ color: green }}>12ms</div>
          <div className="text-[6px]" style={{ color: textFaint }}>低延迟</div>
          <div className="flex gap-0.5 items-center"><div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: green }} /><div className="w-2 h-2 rounded-full" style={{ backgroundColor: green + "60" }} /></div>
        </div>
        <div className="h-8 w-px" style={{ backgroundColor: border }} />
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-[8px]">🔴</div>
          <div className="text-[7px] font-mono" style={{ color: isDark ? "#d4836f" : "#b85c4a" }}>320ms</div>
          <div className="text-[6px]" style={{ color: textFaint }}>高延迟</div>
          <div className="flex gap-0.5 items-center"><div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: isDark ? "#d4836f" : "#b85c4a" }} /><div className="w-3 h-3 rounded-full" style={{ backgroundColor: isDark ? "rgba(212,131,111,0.4)" : "rgba(184,92,74,0.3)" }} /></div>
        </div>
      </div>
    );

    case "rollback": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="flex items-center gap-1">
          <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: isDark ? "rgba(184,92,74,0.12)" : "rgba(184,92,74,0.08)", color: isDark ? "#d4836f" : "#b85c4a", border: `1px solid ${isDark ? "rgba(212,131,111,0.3)" : "rgba(184,92,74,0.2)"}` }}>v2.0 ❌</div>
          <span className="text-[9px]" style={{ color: accent }}>←</span>
          <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.1)" : "rgba(95,138,107,0.08)", color: green, border: `1px solid ${green}30` }}>v1.9 ✓</div>
        </div>
        <div className="text-[6px] font-mono" style={{ color: textFaint }}>git revert</div>
      </div>
    );

    case "uptime": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="text-center">
          <div className="text-[20px] font-bold" style={{ color: green }}>99.9<span style={{ color: textFaint, fontSize: "10px" }}>%</span></div>
          <div className="text-[6px] font-mono" style={{ color: textFaint }}>SLA 可用性</div>
        </div>
        <div className="h-8 w-px" style={{ backgroundColor: border }} />
        <div className="space-y-0.5 text-[6px] font-mono" style={{ color: textFaint }}>
          <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: green }} /><span style={{ color: text }}>过去 7 天</span> 100%</div>
          <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: green }} /><span style={{ color: text }}>过去 30 天</span> 99.95%</div>
          <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: yellow }} /><span style={{ color: text }}>宕机</span> 8.7h/年</div>
        </div>
      </div>
    );

    case "nginx": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
        <div className="flex items-center gap-0.5">
          <span className="text-[6px] font-mono" style={{ color: textFaint }}>🌐</span>
          <div className="w-0.5 h-10 rounded-full" style={{ backgroundColor: accent }} />
          <div className="px-1.5 py-1 rounded-[4px] text-[7px] font-mono border" style={{ borderColor: accent + "30", backgroundColor: accentBg, color: accent }}>
            <div>Nginx</div>
            <div className="text-[5px]" style={{ color: textFaint }}>:80</div>
          </div>
        </div>
        <div className="flex flex-col gap-0">
          <span className="text-[6px]" style={{ color: green }}>→ :3000</span>
          <span className="text-[6px]" style={{ color: blue }}>→ :4000/api</span>
          <span className="text-[6px]" style={{ color: textFaint }}>→ :443 🔒</span>
        </div>
      </div>
    );

    case "ssh": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px]" style={{ backgroundColor: accentBg, border: `1px solid ${accent}30` }}>🔑</div>
          <div className="text-[6px] font-mono" style={{ color: accent }}>~/.ssh/id_rsa</div>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-0.5 relative" style={{ backgroundColor: textFaint + "60" }}>
            <div className="absolute -top-1.5 left-0 right-0 flex justify-center"><span className="text-[6px]" style={{ color: green }}>🔒</span></div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-8 h-8 rounded-[4px] flex items-center justify-center text-[10px]" style={{ backgroundColor: surface, border: `1px solid ${border}` }}>🖥️</div>
          <div className="text-[6px] font-mono" style={{ color: textFaint }}>root@server</div>
        </div>
        <div className="text-[6px]" style={{ color: textFaint }}>Port 22</div>
      </div>
    );

    case "pm2": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 rounded-[3px] flex items-center justify-center text-[6px] font-mono" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.1)" : "rgba(95,138,107,0.08)", color: green, border: `1px solid ${green}30` }}>app</div>
            <div className="text-[6px]" style={{ color: green }}>● online</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 rounded-[3px] flex items-center justify-center text-[6px] font-mono" style={{ backgroundColor: surface, color: textFaint, border: `1px solid ${border}` }}>api</div>
            <div className="text-[6px]" style={{ color: green }}>● online</div>
          </div>
          <div className="text-[6px] font-mono mt-0.5" style={{ color: textFaint }}>restart: 💀 → 🔄 → ✓</div>
        </div>
        <div className="text-[7px] font-mono" style={{ color: textFaint }}>守护<br/>进程</div>
      </div>
    );

    case "health-check": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: green }} />
          <span className="text-[7px] font-mono" style={{ color: green }}>GET /health</span>
          <span className="text-[6px] font-mono" style={{ color: textFaint }}>200 OK</span>
        </div>
        <div className="flex gap-0.5 items-end h-6">
          {[1,1,0,1,1,1,0,1,1].map((v, i) => (
            <div key={i} className="w-1 rounded-t-[1px]" style={{ height: v ? "100%" : "30%", backgroundColor: v ? green : isDark ? "#d4836f" : "#b85c4a" }} />
          ))}
        </div>
        <div className="text-[6px] font-mono" style={{ color: textFaint }}>每5s探测</div>
      </div>
    );

    case "blue-green": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1.5" style={box}>
        <div className="flex flex-col gap-1">
          <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono flex items-center gap-1" style={{ backgroundColor: "rgba(74,127,165,0.1)", color: blue, border: `1px solid ${blue}30` }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: blue }} />蓝 v1.9
          </div>
          <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono flex items-center gap-1" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green, border: `1px solid ${green}30` }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: green }} />绿 v2.0
          </div>
        </div>
        <div className="text-center">
          <div className="text-[6px]" style={{ color: textFaint }}>切换</div>
          <span className="text-[9px]" style={{ color: accent }}>⇄</span>
          <div className="text-[5px] font-mono" style={{ color: textFaint }}>秒级</div>
        </div>
        <div className="text-[6px] font-mono" style={{ color: textFaint }}>0 停机</div>
      </div>
    );

    case "canary": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1.5" style={box}>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <div className="w-10 h-3 rounded-[3px] flex items-center justify-center text-[6px]" style={{ backgroundColor: accentBg, color: accent }}>5%</div>
            <span className="text-[5px]" style={{ color: textFaint }}>新版</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-10 h-3 rounded-[3px] flex items-center justify-center text-[6px]" style={{ backgroundColor: accentBg, color: accent }}>25%</div>
            <span className="text-[5px]" style={{ color: textFaint }}>扩大</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-10 h-3 rounded-[3px] flex items-center justify-center text-[6px]" style={{ backgroundColor: accentBg, color: accent }}>100%</div>
            <span className="text-[5px]" style={{ color: green }}>全量</span>
          </div>
        </div>
        <div className="text-[6px] font-mono" style={{ color: textFaint }}>
          <div>🐤 渐进</div>
          <div>放量</div>
          <div className="mt-0.5" style={{ color: accent }}>观察→扩大</div>
        </div>
      </div>
    );

    case "systemd": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[7px] space-y-1 overflow-hidden" style={{ ...box, color: text }}>
        <div><span style={{ color: textFaint }}>[Unit]</span></div>
        <div><span style={{ color: blue }}>Description</span>=<span style={{ color: green }}>My App</span></div>
        <div><span style={{ color: textFaint }}>[Service]</span></div>
        <div><span style={{ color: accent }}>ExecStart</span>=<span style={{ color: text }}>/opt/app/start.sh</span></div>
        <div><span style={{ color: accent }}>Restart</span>=<span style={{ color: green }}>always</span></div>
        <div className="text-[6px]" style={{ color: textFaint }}>$ systemctl enable --now myapp</div>
      </div>
    );

    case "iac": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="flex flex-col gap-1">
          <div className="text-[7px] font-mono space-y-0.5">
            <div><span style={{ color: accent }}>resource</span> <span style={{ color: green }}>"server"</span> {"{"}</div>
            <div className="pl-2"><span style={{ color: blue }}>cpu</span> = <span style={{ color: yellow }}>2</span></div>
            <div className="pl-2"><span style={{ color: blue }}>ram</span> = <span style={{ color: yellow }}>4096</span></div>
            <div>{"}"}</div>
          </div>
        </div>
        <span className="text-[9px]" style={{ color: textFaint }}>→</span>
        <div className="flex flex-col gap-0.5">
          <div className="text-[7px]">☁️</div>
          <div className="text-[6px] font-mono" style={{ color: textFaint }}>ECS</div>
          <div className="text-[6px] font-mono" style={{ color: textFaint }}>VPC</div>
          <div className="text-[6px] font-mono" style={{ color: textFaint }}>RDS</div>
        </div>
      </div>
    );

case "docker-intro": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <span className="text-[22px]">🐳</span>
        <div className="w-12 h-10 rounded-[6px] border-2 flex items-center justify-center text-[10px]" style={{ borderColor: accent + "40", backgroundColor: accentBg }}>📦</div>
        <div className="text-[8px] font-mono leading-[1.3]" style={{ color: textFaint }}>一次打包<br/>到处运行</div>
      </div>
    );

    case "image": return (
      <div className="h-[88px] rounded-[10px] border overflow-hidden flex flex-col justify-end" style={box}>
        <div className="w-full h-4 rounded-t-[2px] flex items-center justify-center text-[7px] font-mono" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.12)" : "rgba(95,138,107,0.08)", color: green }}>App 层 · 只读</div>
        <div className="w-full h-3 flex items-center justify-center text-[7px] font-mono" style={{ backgroundColor: isDark ? "rgba(123,163,201,0.1)" : "rgba(74,127,165,0.06)", color: blue }}>Node.js 层 · 只读</div>
        <div className="w-full h-3 flex items-center justify-center text-[7px] font-mono" style={{ backgroundColor: accentBg, color: accent }}>Alpine 层 · 只读</div>
        <div className="flex-1 flex items-center justify-center text-[7px] font-mono" style={{ color: textFaint }}>镜像 = 只读层叠模板</div>
      </div>
    );

    case "container": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1.5" style={box}>
        {["web","api","worker"].map((n,i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <div className="w-8 h-8 rounded-[5px] border flex items-center justify-center text-[9px]" style={{ borderColor: accent + "30", backgroundColor: accentBg }}>📦</div>
            <span className="text-[6px] font-mono" style={{ color: accent }}>{n}</span>
          </div>
        ))}
      </div>
    );

    case "dockerfile": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-0.5 overflow-hidden" style={{ ...box, color: text }}>
        <div><span style={{ color: accent }}>FROM</span> <span style={{ color: green }}>node:20-alpine</span></div>
        <div><span style={{ color: accent }}>RUN</span> <span style={{ color: text }}>npm install</span></div>
        <div><span style={{ color: accent }}>COPY</span> <span style={{ color: textFaint }}>. /app</span></div>
        <div><span style={{ color: accent }}>EXPOSE</span> <span style={{ color: yellow }}>3000</span></div>
        <div><span style={{ color: accent }}>CMD</span> <span style={{ color: text }}>[&quot;npm&quot;,&quot;start&quot;]</span></div>
      </div>
    );

    case "docker-compose": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[7px] space-y-0.5 overflow-hidden" style={{ ...box, color: text }}>
        <div><span style={{ color: accent }}>services</span>:</div>
        <div className="pl-2"><span style={{ color: blue }}>web</span>: <span style={{ color: textFaint }}>build: .</span></div>
        <div className="pl-2"><span style={{ color: blue }}>db</span>: <span style={{ color: textFaint }}>image: postgres:16</span></div>
        <div className="pl-2"><span style={{ color: blue }}>redis</span>: <span style={{ color: textFaint }}>image: redis:7-alpine</span></div>
        <div><span style={{ color: accent }}>networks</span>: <span style={{ color: green }}>backend</span></div>
      </div>
    );

    case "volume": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="w-10 h-10 rounded-[6px] border flex items-center justify-center" style={{ borderColor: border, backgroundColor: surface }}>
          <span className="text-[12px]">🗄️</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-14 h-3 rounded-[3px] flex items-center justify-center text-[6px] font-mono" style={{ backgroundColor: accentBg, color: accent }}>mysql-data</div>
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 rounded-[4px] border flex items-center justify-center text-[7px]" style={{ borderColor: accent + "30", backgroundColor: accentBg, color: accent }}>容器</div>
            <span className="text-[7px]" style={{ color: textFaint }}>↔</span>
            <div className="w-8 h-8 rounded-[4px] border flex items-center justify-center text-[7px]" style={{ borderColor: green + "30", backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green }}>硬盘</div>
          </div>
        </div>
      </div>
    );

    case "docker-network": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
        <div className="flex flex-col items-center">
          <div className="w-7 h-5 rounded-[3px] border flex items-center justify-center text-[6px] font-mono" style={{ borderColor: accent + "40", backgroundColor: accentBg, color: accent }}>web</div>
          <div className="w-0.5 h-3" style={{ backgroundColor: accent + "30" }} />
          <div className="border-t w-16" style={{ borderColor: accent + "30" }} />
          <div className="flex gap-6">
            <div className="w-0.5 h-3" style={{ backgroundColor: accent + "30" }} />
            <div className="w-0.5 h-3" style={{ backgroundColor: accent + "30" }} />
          </div>
          <div className="flex gap-4">
            <div className="w-7 h-5 rounded-[3px] border flex items-center justify-center text-[6px] font-mono" style={{ borderColor: green + "40", backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green }}>db</div>
            <div className="w-7 h-5 rounded-[3px] border flex items-center justify-center text-[6px] font-mono" style={{ borderColor: blue + "40", backgroundColor: isDark ? "rgba(123,163,201,0.08)" : "rgba(74,127,165,0.06)", color: blue }}>redis</div>
          </div>
        </div>
      </div>
    );

    case "registry": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-8 h-5 rounded-[3px] flex items-center justify-center text-[7px] font-mono" style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}30` }}>Docker Hub</div>
          <span className="text-[6px]" style={{ color: green }}>↑ push</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-9 h-9 rounded-[5px] border flex items-center justify-center text-[10px]" style={{ borderColor: accent + "30", backgroundColor: accentBg }}>📦</div>
          <span className="text-[6px]" style={{ color: yellow }}>↓ pull</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-8 h-5 rounded-[3px] flex items-center justify-center text-[7px] font-mono" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green, border: `1px solid ${green}30` }}>服务器</div>
          <span className="text-[6px]" style={{ color: textFaint }}>部署</span>
        </div>
      </div>
    );

    case "docker-build": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-0.5" style={box}>
        {[
          { label: "FROM", color: accent },
          { label: "RUN", color: blue },
          { label: "COPY", color: green },
          { label: "BUILD", color: yellow },
          { label: "📦", color: accent },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-0.5">
            <div className="w-7 h-7 rounded-[4px] border flex items-center justify-center text-[6px] font-mono" style={{ borderColor: s.color + "30", backgroundColor: s.color + "15", color: s.color }}>{s.label}</div>
            {i < 4 && <span className="text-[6px]" style={{ color: textFaint }}>→</span>}
          </div>
        ))}
      </div>
    );

    case "docker-run": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-9 h-9 rounded-[5px] border flex items-center justify-center text-[10px]" style={{ borderColor: accent + "30", backgroundColor: accentBg }}>💿</div>
          <span className="text-[6px] font-mono" style={{ color: textFaint }}>镜像</span>
        </div>
        <div className="flex items-center">
          <span className="text-[8px]" style={{ color: accent }}>run →</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-9 h-9 rounded-[5px] border-2 flex items-center justify-center text-[10px]" style={{ borderColor: green + "50", backgroundColor: isDark ? "rgba(143,184,154,0.10)" : "rgba(95,138,107,0.07)" }}>⚡</div>
          <span className="text-[6px] font-mono" style={{ color: green }}>容器</span>
        </div>
        <div className="text-[6px] font-mono leading-[1.4]" style={{ color: textFaint }}>-p 3000:3000<br/>--name app</div>
      </div>
    );

    case "multi-stage": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
        <div className="flex flex-col items-center">
          <div className="w-12 h-7 rounded-[4px] border flex items-center justify-center text-[6px] font-mono" style={{ borderColor: accent + "30", backgroundColor: accentBg, color: accent }}>FROM golang</div>
          <span className="text-[5px]" style={{ color: textFaint }}>编译阶段</span>
        </div>
        <span className="text-[7px]" style={{ color: green }}>→</span>
        <div className="w-6 h-6 rounded-full border flex items-center justify-center text-[7px]" style={{ borderColor: green + "30", backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green }}>bin</div>
        <span className="text-[7px]" style={{ color: green }}>→</span>
        <div className="flex flex-col items-center">
          <div className="w-8 h-7 rounded-[4px] border flex items-center justify-center text-[5px] font-mono" style={{ borderColor: green + "30", backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green }}>FROM alpine</div>
          <span className="text-[5px]" style={{ color: textFaint }}>运行阶段·瘦身</span>
        </div>
      </div>
    );

    case "container-logs": return (
      <div className="h-[88px] rounded-[10px] border overflow-hidden font-mono text-[7px] space-y-0.5 p-2" style={{ ...box, color: text }}>
        <div style={{ color: green }}>[INFO] Server started on :3000</div>
        <div style={{ color: textFaint }}>[INFO] Connected to database</div>
        <div style={{ color: yellow }}>[WARN] Request timeout /api/slow</div>
        <div style={{ color: isDark ? "#d4836f" : "#b85c4a" }}>[ERROR] Unhandled rejection at line 42</div>
        <span style={{ color: textFaint }}>$ docker logs my-app</span>
      </div>
    );

case "domain-name": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex flex-col items-center justify-center gap-1" style={box}>
        <span className="text-[18px]">🏠</span>
        <span className="font-mono text-[9px] font-bold" style={{ color: accent }}>www.example.com</span>
        <span className="text-[7px]" style={{ color: textFaint }}>网站的门牌号</span>
      </div>
    );

    case "dns": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] flex items-center justify-center gap-1.5" style={box}>
        <span style={{ color: accent }}>example.com</span>
        <span style={{ color: textFaint }}>→</span>
        <span className="px-1.5 py-0.5 rounded-[3px] text-[7px]" style={{ backgroundColor: accentBg, color: accent }}>DNS 解析</span>
        <span style={{ color: textFaint }}>→</span>
        <span style={{ color: green }}>93.184.216.34</span>
      </div>
    );

    case "tld": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1.5 flex-wrap" style={box}>
        {[".com", ".cn", ".org", ".dev", ".io"].map((t, i) => (
          <span key={i} className="px-2 py-1 rounded-[4px] text-[8px] font-mono font-medium" style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}20` }}>{t}</span>
        ))}
        <span className="text-[7px] w-full text-center mt-0.5" style={{ color: textFaint }}>域名后缀 · 顶级域名</span>
      </div>
    );

    case "subdomain": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] flex flex-col justify-center gap-1" style={box}>
        <div><span style={{ color: accent }}>blog</span><span style={{ color: textFaint }}>.example.com</span></div>
        <div><span style={{ color: green }}>api</span><span style={{ color: textFaint }}>.example.com</span></div>
        <div><span style={{ color: blue }}>admin</span><span style={{ color: textFaint }}>.example.com</span></div>
        <div className="text-[7px]" style={{ color: textFaint }}>← 子域名 前缀 → 主域名</div>
      </div>
    );

    case "nameserver": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] flex flex-col justify-center gap-0.5" style={box}>
        <div className="text-[7px] mb-1" style={{ color: textFaint }}>NS 域名服务器</div>
        <div><span className="px-1 py-0.5 rounded-[2px] text-[7px]" style={{ backgroundColor: accentBg, color: accent }}>NS</span><span style={{ color: textFaint }}>  dana.ns.cloudflare.com</span></div>
        <div><span className="px-1 py-0.5 rounded-[2px] text-[7px]" style={{ backgroundColor: surface, color: green }}>NS</span><span style={{ color: textFaint }}>  felipe.ns.cloudflare.com</span></div>
      </div>
    );

    case "a-record": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] flex flex-col items-center justify-center gap-1.5" style={box}>
        <div className="flex items-center gap-2">
          <span style={{ color: accent }}>example.com</span>
          <span style={{ color: textFaint }}>→</span>
          <span className="px-2 py-1 rounded-[4px] text-[8px] font-bold" style={{ backgroundColor: surface, color: green, border: `1px solid ${green}30` }}>192.168.1.1</span>
        </div>
        <span className="text-[7px]" style={{ color: textFaint }}>A 记录 · 域名 → IPv4 地址</span>
      </div>
    );

    case "cname": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] flex flex-col items-center justify-center gap-1.5" style={box}>
        <div className="flex items-center gap-1">
          <span style={{ color: accent }}>www.example.com</span>
        </div>
        <span className="text-[7px]" style={{ color: textFaint }}>↓ CNAME 别名指向 ↓</span>
        <span className="px-2 py-0.5 rounded-[3px] text-[7px]" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green }}>cname.vercel-dns.com</span>
      </div>
    );

    case "https": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="w-full rounded-[5px] border px-2 py-1.5 flex items-center gap-1.5 font-mono text-[8px]" style={{ borderColor: green + "30", backgroundColor: isDark ? "rgba(143,184,154,0.06)" : "rgba(95,138,107,0.04)" }}>
          <span className="text-[11px]">🔒</span>
          <span style={{ color: green }}>https://</span>
          <span style={{ color: text }}>example.com</span>
        </div>
      </div>
    );

    case "whois": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[7px] space-y-0.5 overflow-hidden" style={box}>
        <div className="flex justify-between"><span style={{ color: textFaint }}>域名</span><span style={{ color: accent }}>example.com</span></div>
        <div className="flex justify-between"><span style={{ color: textFaint }}>注册商</span><span style={{ color: text }}>Namecheap</span></div>
        <div className="flex justify-between"><span style={{ color: textFaint }}>注册日</span><span style={{ color: text }}>2024-03-15</span></div>
        <div className="flex justify-between"><span style={{ color: textFaint }}>到期日</span><span style={{ color: text }}>2026-03-15</span></div>
        <div className="flex justify-between"><span style={{ color: textFaint }}>状态</span><span style={{ color: green }}>✓ 活跃</span></div>
      </div>
    );

    case "registrar": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[7px] flex items-center justify-center gap-2" style={box}>
        <div className="flex flex-col gap-1">
          {[["Namecheap", ".com $12"], ["Cloudflare", ".dev $14"], ["阿里云", ".cn ¥39"]].map((r, i) => (
            <div key={i} className="px-2 py-1 rounded-[3px] border flex items-center gap-2" style={{ borderColor: border }}>
              <span style={{ color: i === 0 ? accent : i === 1 ? green : blue }}>{r[0]}</span>
              <span style={{ color: yellow }}>{r[1]}</span>
            </div>
          ))}
        </div>
        <span className="text-[12px]">🛒</span>
      </div>
    );

    case "propagation": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="flex items-center gap-2">
          <span className="text-[18px]">🌍</span>
          <div className="font-mono text-[7px] space-y-1">
            <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: green }} /><span style={{ color: text }}>北美 · 已生效</span></div>
            <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: yellow }} /><span style={{ color: text }}>亚太 · 同步中</span></div>
            <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: textFaint, opacity: 0.5 }} /><span style={{ color: textFaint }}>欧洲 · 等待中</span></div>
          </div>
        </div>
      </div>
    );

    case "ip-address": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex flex-col items-center justify-center gap-1" style={box}>
        <span className="text-[10px]">🖧</span>
        <span className="px-3 py-1.5 rounded-[5px] font-mono text-[11px] font-bold tracking-wider" style={{ backgroundColor: accentBg, color: accent, border: `1.5px solid ${accent}30` }}>192.168.1.1</span>
        <span className="text-[7px]" style={{ color: textFaint }}>互联网唯一编号</span>
      </div>
    );

case "viewport": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="w-[100px] h-[55px] rounded-[4px] border flex flex-col overflow-hidden" style={{ borderColor: accent + "40" }}>
          <div className="h-3 border-b flex items-center px-1.5 gap-1" style={{ borderColor: border }}><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} /><div className="text-[6px]" style={{ color: textFaint }}>viewport</div></div>
          <div className="flex-1 flex items-center justify-center text-[8px]" style={{ color: text, backgroundColor: accentBg }}>首屏可见</div>
        </div>
      </div>
    );

    case "spa": return (
      <div className="h-[88px] rounded-[10px] border overflow-hidden flex flex-col" style={box}>
        <div className="h-4 flex items-center px-2 gap-1.5 border-b" style={{ borderColor: border }}>
          <span className="text-[7px] px-1.5 py-0.5 rounded-[3px]" style={{ backgroundColor: accentBg, color: accent }}>Home</span>
          <span className="text-[7px] px-1.5 py-0.5 rounded-[3px]" style={{ color: textFaint }}>About</span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px]" style={{ color: text }}>内容动态替换 ↻</div>
      </div>
    );

    case "cdn": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2 relative" style={box}>
        <div className="w-8 h-8 rounded-full border flex items-center justify-center text-[7px] font-bold" style={{ borderColor: accent + "40", backgroundColor: accentBg, color: accent }}>源</div>
        <span className="text-[7px]" style={{ color: textFaint }}>→</span>
        {["美", "欧", "亚"].map((r, i) => (
          <div key={i} className="w-6 h-6 rounded-full border flex items-center justify-center text-[6px]" style={{ borderColor: green + "30", backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green, marginTop: i === 0 ? -16 : i === 1 ? 16 : -8 }}>{r}</div>
        ))}
      </div>
    );

    case "state": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="text-center space-y-1">
          <div className="text-[16px] font-bold" style={{ color: accent }}>0</div>
          <div className="flex gap-1"><div className="w-4 h-3 rounded-[3px] flex items-center justify-center text-[7px]" style={{ backgroundColor: accent, color: "#fff" }}>+</div><div className="w-4 h-3 rounded-[3px] flex items-center justify-center text-[7px]" style={{ backgroundColor: surface, color: textFaint, border: `1px solid ${border}` }}>-</div></div>
          <div className="text-[6px] font-mono" style={{ color: textFaint }}>count = useState(0)</div>
        </div>
      </div>
    );

    case "render": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
        {["HTML", "CSS", "布局", "绘制"].map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="px-1.5 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}30` }}>{s}</div>
            {i < 3 && <span className="text-[7px]" style={{ color: textFaint }}>→</span>}
          </div>
        ))}
      </div>
    );

    case "media-query": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3" style={box}>
        <div className="text-center">
          <div className="w-9 h-9 rounded-[4px] border flex items-center justify-center text-[6px]" style={{ borderColor: accent + "40", backgroundColor: accentBg }}>@media</div>
          <div className="text-[6px] mt-0.5 font-mono" style={{ color: textFaint }}>max-width</div>
        </div>
        <span className="text-[8px]" style={{ color: textFaint }}>→</span>
        <div className="flex gap-1.5"><div className="w-8 h-10 rounded-[3px] border" style={{ borderColor: border }}><div className="h-2 border-b" style={{ borderColor: border }} /><div className="h-2" style={{ backgroundColor: accentBg }} /></div><div className="w-5 h-8 rounded-[3px] border" style={{ borderColor: border }}><div className="h-1.5 border-b" style={{ borderColor: border }} /><div className="h-1.5" style={{ backgroundColor: accentBg }} /></div></div>
      </div>
    );

    case "breakpoint": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-end justify-center gap-3" style={box}>
        <div className="text-center"><div className="w-5 h-8 rounded-[3px] border flex flex-col" style={{ borderColor: border }}><div className="h-1 border-b" style={{ borderColor: border }} /><div className="flex-1" style={{ backgroundColor: accentBg }} /></div><div className="text-[6px] mt-0.5" style={{ color: accent }}>640</div></div>
        <div className="text-center"><div className="w-8 h-9 rounded-[3px] border flex flex-col" style={{ borderColor: border }}><div className="h-1.5 border-b" style={{ borderColor: border }} /><div className="flex-1" style={{ backgroundColor: accentBg }} /></div><div className="text-[6px] mt-0.5" style={{ color: green }}>768</div></div>
        <div className="text-center"><div className="w-11 h-10 rounded-[3px] border flex flex-col" style={{ borderColor: border }}><div className="h-2 border-b" style={{ borderColor: border }} /><div className="flex-1" style={{ backgroundColor: accentBg }} /></div><div className="text-[6px] mt-0.5" style={{ color: blue }}>1024</div></div>
      </div>
    );

    case "scroll": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center gap-2 overflow-hidden" style={box}>
        <div className="flex-1 space-y-1.5 overflow-hidden">
          <div className="h-2 rounded-full" style={{ backgroundColor: surface }} />
          <div className="h-2 rounded-full w-4/5" style={{ backgroundColor: surface }} />
          <div className="h-2 rounded-full w-3/5" style={{ backgroundColor: surface }} />
          <div className="h-2 rounded-full w-5/6" style={{ backgroundColor: surface }} />
          <div className="h-2 rounded-full w-2/3" style={{ backgroundColor: accentBg }} />
        </div>
        <div className="w-1.5 h-12 rounded-full relative" style={{ backgroundColor: surface }}>
          <div className="absolute w-1.5 h-4 rounded-full" style={{ backgroundColor: accent, top: "30%" }} />
        </div>
      </div>
    );

    case "sticky": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex flex-col gap-1.5 overflow-hidden" style={box}>
        <div className="h-5 rounded-[4px] flex items-center px-2 text-[7px] font-medium" style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}30` }}>吸顶导航 position:sticky</div>
        <div className="flex-1 space-y-1.5 overflow-hidden px-1">
          <div className="h-1.5 rounded-full" style={{ backgroundColor: surface }} />
          <div className="h-1.5 rounded-full w-4/5" style={{ backgroundColor: surface }} />
          <div className="h-1.5 rounded-full w-3/5" style={{ backgroundColor: surface }} />
          <div className="h-1.5 rounded-full w-5/6" style={{ backgroundColor: surface }} />
        </div>
      </div>
    );

    case "form": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="w-24 space-y-1.5">
          <div className="text-[7px]" style={{ color: text }}>邮箱</div>
          <div className="h-4 rounded-[4px] border px-1.5 flex items-center text-[7px]" style={{ borderColor: border, color: textFaint }}>user@email.com</div>
          <div className="text-[7px]" style={{ color: text }}>密码</div>
          <div className="h-4 rounded-[4px] border px-1.5 flex items-center text-[7px]" style={{ borderColor: border, color: textFaint }}>••••••</div>
          <div className="h-4 rounded-[4px] flex items-center justify-center text-[7px] font-medium text-white" style={{ backgroundColor: accent }}>提交</div>
        </div>
      </div>
    );

    case "placeholder": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="space-y-1.5">
          <div className="h-5 w-28 rounded-[4px] border px-1.5 flex items-center text-[7px]" style={{ borderColor: border }}>
            <span style={{ color: textFaint }}>请输入邮箱...</span>
          </div>
          <div className="h-5 w-28 rounded-[4px] border px-1.5 flex items-center text-[7px]" style={{ borderColor: border }}>
            <span style={{ color: text }}>user@mail.com</span>
          </div>
          <div className="text-[6px] font-mono" style={{ color: textFaint }}>placeholder="提示文字"</div>
        </div>
      </div>
    );

    case "icon": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-7 h-7 rounded-[5px] flex items-center justify-center text-[11px]" style={{ backgroundColor: accentBg }}>🔍</div>
          <span className="text-[6px]" style={{ color: textFaint }}>搜索</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-7 h-7 rounded-[5px] flex items-center justify-center text-[11px]" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)" }}>⚙️</div>
          <span className="text-[6px]" style={{ color: textFaint }}>设置</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-7 h-7 rounded-[5px] flex items-center justify-center text-[11px]" style={{ backgroundColor: isDark ? "rgba(123,163,201,0.08)" : "rgba(74,127,165,0.06)" }}>🏠</div>
          <span className="text-[6px]" style={{ color: textFaint }}>首页</span>
        </div>
      </div>
    );

    case "favicon": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="w-[90px] rounded-[5px] border overflow-hidden" style={{ borderColor: border }}>
          <div className="h-4 flex items-center px-1.5 gap-1.5 border-b" style={{ borderColor: border }}>
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
            <div className="text-[6px]" style={{ color: textFaint }}>我的网站</div>
          </div>
          <div className="h-9 flex items-center justify-center text-[7px]" style={{ color: text }}>🌐 网页内容区域</div>
        </div>
      </div>
    );

    case "seo": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 space-y-1.5 overflow-hidden" style={box}>
        <div className="text-[7px] font-bold" style={{ color: accent }}>搜索结果排名</div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5"><span className="text-[8px] font-bold" style={{ color: yellow }}>1</span><span className="text-[7px]" style={{ color: text }}>我的网站 - 最佳选择</span></div>
          <div className="flex items-center gap-1.5"><span className="text-[8px] font-bold" style={{ color: textFaint }}>2</span><span className="text-[7px]" style={{ color: textFaint }}>另一个网站...</span></div>
          <div className="flex items-center gap-1.5"><span className="text-[8px] font-bold" style={{ color: textFaint }}>3</span><span className="text-[7px]" style={{ color: textFaint }}>其他结果...</span></div>
        </div>
      </div>
    );

    case "breadcrumb": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="flex items-center gap-1 text-[8px]">
          <span style={{ color: accent }}>🏠 首页</span>
          <span style={{ color: textFaint }}>&gt;</span>
          <span style={{ color: accent }}>博客</span>
          <span style={{ color: textFaint }}>&gt;</span>
          <span style={{ color: text }}>技术文章</span>
        </div>
      </div>
    );

    case "pagination": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
        <div className="px-1.5 py-0.5 rounded-[3px] text-[7px]" style={{ color: textFaint }}>&lt;</div>
        {[1, 2, 3].map(p => (
          <div key={p} className="w-5 h-5 rounded-[4px] flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: p === 2 ? accentBg : "transparent", color: p === 2 ? accent : textFaint, border: `1px solid ${p === 2 ? accent + "30" : "transparent"}` }}>{p}</div>
        ))}
        <div className="px-1.5 py-0.5 rounded-[3px] text-[7px]" style={{ color: textFaint }}>&gt;</div>
      </div>
    );

    case "lazy-load": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex flex-col gap-1.5 overflow-hidden" style={box}>
        <div className="flex gap-1.5">
          <div className="w-7 h-7 rounded-[3px] flex items-center justify-center text-[6px]" style={{ backgroundColor: accentBg, color: accent }}>🖼️</div>
          <div className="w-7 h-7 rounded-[3px] flex items-center justify-center text-[6px]" style={{ backgroundColor: accentBg, color: accent }}>🖼️</div>
          <div className="w-7 h-7 rounded-[3px] border flex items-center justify-center text-[6px]" style={{ borderColor: border, color: textFaint }}>...</div>
        </div>
        <div className="text-[6px] font-mono" style={{ color: textFaint }}>loading="lazy" → 滚到才加载</div>
      </div>
    );

    case "typescript": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-1 overflow-hidden" style={{ ...box, color: text }}>
        <div><span style={{ color: accent }}>interface</span> <span style={{ color: blue }}>User</span> {"{"}</div>
        <div className="pl-3"><span style={{ color: text }}>name</span>: <span style={{ color: green }}>string</span></div>
        <div className="pl-3"><span style={{ color: text }}>age</span>: <span style={{ color: green }}>number</span></div>
        <div className="pl-3"><span style={{ color: text }}>admin?</span>: <span style={{ color: green }}>boolean</span></div>
        <div>{"}"}</div>
      </div>
    );

    case "nextjs": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="grid grid-cols-2 gap-1">
          {["SSR", "SSG", "API", "Img"].map((f, i) => (
            <div key={i} className="px-1.5 py-1 rounded-[3px] text-[7px] font-mono text-center" style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}30` }}>{f}</div>
          ))}
        </div>
        <div className="text-[8px] text-center" style={{ color: textFaint }}>全栈框架<br/>开箱即用</div>
      </div>
    );

    case "npm": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-1.5" style={box}>
        <div style={{ color: textFaint }}>$ npm install</div>
        <div className="flex items-center gap-1.5 pl-2">
          <span className="px-1 py-0.5 rounded-[3px] text-[6px]" style={{ backgroundColor: accentBg, color: accent }}>react</span>
          <span className="px-1 py-0.5 rounded-[3px] text-[6px]" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green }}>lodash</span>
          <span className="px-1 py-0.5 rounded-[3px] text-[6px]" style={{ backgroundColor: isDark ? "rgba(123,163,201,0.08)" : "rgba(74,127,165,0.06)", color: blue }}>axios</span>
        </div>
        <div style={{ color: textFaint }}>📦 package.json</div>
      </div>
    );

    case "props": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono text-center" style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}30` }}>父组件</div>
        <div className="flex flex-col items-center">
          <span className="text-[9px]" style={{ color: accent }}>↓</span>
          <span className="text-[6px] font-mono" style={{ color: textFaint }}>props</span>
        </div>
        <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono text-center" style={{ backgroundColor: surface, color: text, border: `1px solid ${border}` }}>子组件</div>
      </div>
    );

    case "hooks": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-1 overflow-hidden" style={{ ...box, color: text }}>
        <div><span style={{ color: accent }}>const</span> [count, setCount] = <span style={{ color: blue }}>useState</span>(<span style={{ color: yellow }}>0</span>)</div>
        <div><span style={{ color: accent }}>const</span> [user, setUser] = <span style={{ color: blue }}>useState</span>(<span style={{ color: green }}>null</span>)</div>
        <div><span style={{ color: blue }}>useEffect</span>(() =&gt; {"{"} <span style={{ color: textFaint }}>fetchData</span>() {"}"}, [])</div>
      </div>
    );

    case "virtual-dom": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="space-y-1">
          <div className="px-2 py-1 rounded-[4px] border text-[7px] font-mono" style={{ borderColor: border, color: textFaint }}>旧 VDOM</div>
          <div className="px-2 py-1 rounded-[4px] border text-[7px] font-mono" style={{ borderColor: accent + "40", color: accent }}>新 VDOM</div>
        </div>
        <div className="text-center">
          <span className="text-[10px]" style={{ color: accent }}>⚡</span>
          <div className="text-[6px] font-mono" style={{ color: textFaint }}>Diff</div>
        </div>
        <div className="px-2 py-1 rounded-[4px] border text-[7px] font-mono" style={{ borderColor: green + "30", color: green }}>&lt;div&gt;更新&lt;/div&gt;</div>
      </div>
    );

    case "csr": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-1" style={box}>
        {["空HTML", "下载JS", "解析JS", "渲染"].map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="px-1.5 py-1 rounded-[4px] text-[7px] font-mono text-center" style={{ backgroundColor: i < 3 ? surface : accentBg, color: i < 3 ? textFaint : accent, border: `1px solid ${i < 3 ? border : accent + "30"}` }}>{s}</div>
            {i < 3 && <span className="text-[7px]" style={{ color: textFaint }}>→</span>}
          </div>
        ))}
      </div>
    );

    case "vite": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3" style={box}>
        <div className="text-center">
          <div className="text-[18px]">⚡</div>
          <div className="text-[6px] font-mono" style={{ color: accent }}>Vite</div>
        </div>
        <div className="space-y-1 text-[7px] font-mono">
          <div style={{ color: green }}>✓ 启动 300ms</div>
          <div style={{ color: green }}>✓ HMR 即时</div>
          <div style={{ color: textFaint }}>✗ Webpack 30s+</div>
        </div>
      </div>
    );

case "merge": return (
  <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
    <svg width="110" height="50" viewBox="0 0 110 50">
      <line x1="10" y1="30" x2="60" y2="30" stroke={text} strokeWidth="1.5" />
      <line x1="55" y1="30" x2="100" y2="30" stroke={text} strokeWidth="1.5" />
      <line x1="35" y1="30" x2="50" y2="8" stroke={accent} strokeWidth="1.5" />
      <line x1="50" y1="8" x2="65" y2="30" stroke={green} strokeWidth="1.5" />
      <circle cx="60" cy="30" r="3" fill={text} />
      <text x="62" y="34" fill={textFaint} fontSize="6">main</text>
    </svg>
  </div>
);

case "conflict": return (
  <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[7px] space-y-1 overflow-hidden" style={{ ...box, color: text }}>
    <div><span style={{ color: accent }}>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</span> <span style={{ color: textFaint }}>HEAD</span></div>
    <div className="pl-1"><span style={{ color: text }}>color: red;</span></div>
    <div><span style={{ color: yellow }}>=======</span> <span style={{ color: textFaint }}>⚡冲突</span></div>
    <div className="pl-1"><span style={{ color: text }}>color: blue;</span></div>
    <div><span style={{ color: green }}>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</span> <span style={{ color: textFaint }}>main</span></div>
  </div>
);

case "clone": return (
  <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
    <div className="flex flex-col items-center gap-0.5">
      <div className="text-[12px]">☁️</div>
      <div className="text-[6px]" style={{ color: textFaint }}>remote</div>
    </div>
    <div className="flex flex-col items-center gap-0.5" style={{ color: textFaint }}>
      <span className="text-[10px]">↓</span>
      <span className="text-[6px]">clone</span>
    </div>
    <div className="flex flex-col items-center gap-0.5">
      <div className="text-[12px]">📁</div>
      <div className="text-[6px]" style={{ color: accent }}>local</div>
    </div>
  </div>
);

case "push-pull": return (
  <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3" style={box}>
    <div className="px-2 py-1 rounded-[5px] text-[7px] font-mono" style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}40` }}>
      📁 local
    </div>
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[8px]" style={{ color: accent }}>push →</span>
      <span className="text-[8px]" style={{ color: green }}>← pull</span>
    </div>
    <div className="px-2 py-1 rounded-[5px] text-[7px] font-mono" style={{ backgroundColor: surface, color: text, border: `1px solid ${border}` }}>
      ☁️ remote
    </div>
  </div>
);

case "repository": return (
  <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
    <div className="flex flex-col items-center">
      <div className="text-[16px]">📁</div>
      <div className="text-[7px] font-mono mt-0.5" style={{ color: accent }}>my-project</div>
    </div>
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} /><span className="text-[6px]" style={{ color: textFaint }}>main</span></div>
      <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: green }} /><span className="text-[6px]" style={{ color: textFaint }}>feat/api</span></div>
      <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: yellow }} /><span className="text-[6px]" style={{ color: textFaint }}>fix/bug</span></div>
    </div>
  </div>
);

case "remote": return (
  <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
    <div className="text-[14px]">☁️</div>
    <div className="space-y-0.5 font-mono text-[7px]">
      <div style={{ color: accent }}>origin</div>
      <div style={{ color: textFaint }}>github.com</div>
      <div style={{ color: textFaint }}>/user/repo.git</div>
    </div>
  </div>
);

case "tag": return (
  <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-10 h-8 rounded-[4px] flex items-center justify-center" style={{ backgroundColor: accentBg, border: `1.5px solid ${accent}50` }}>
          <span className="text-[8px] font-bold font-mono" style={{ color: accent }}>v1.0</span>
        </div>
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
      </div>
      <div className="text-[7px] font-mono space-y-0.5" style={{ color: textFaint }}>
        <div>🔖 发布标签</div>
        <div style={{ color: text }}>git tag v1.0</div>
      </div>
    </div>
  </div>
);

case "stash": return (
  <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3" style={box}>
    <div className="relative">
      <div className="w-10 h-8 rounded-[4px] border flex flex-col justify-center items-center gap-0.5" style={{ borderColor: border, backgroundColor: surface }}>
        <div className="w-7 h-1 rounded-full" style={{ backgroundColor: accentBg }} />
        <div className="w-5 h-1 rounded-full" style={{ backgroundColor: accentBg }} />
        <div className="w-7 h-1 rounded-full" style={{ backgroundColor: accentBg }} />
      </div>
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[8px]">🗄️</div>
    </div>
    <div className="text-[7px] space-y-0.5" style={{ color: textFaint }}>
      <div>WIP: 重构中</div>
      <div style={{ color: accent }}>git stash pop</div>
    </div>
  </div>
);

case "gitignore": return (
  <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[7px] space-y-0.5 overflow-hidden" style={{ ...box, color: text }}>
    <div style={{ color: accent }}>.gitignore</div>
    <div className="line-through" style={{ color: textFaint }}>node_modules/</div>
    <div className="line-through" style={{ color: textFaint }}>.env</div>
    <div className="line-through" style={{ color: textFaint }}>*.log</div>
    <div className="line-through" style={{ color: textFaint }}>dist/</div>
  </div>
);

case "rebase": return (
  <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
    <svg width="110" height="40" viewBox="0 0 110 40">
      <line x1="10" y1="20" x2="95" y2="20" stroke={text} strokeWidth="1.5" />
      <circle cx="20" cy="20" r="3" fill={text} />
      <circle cx="45" cy="20" r="3" fill={text} />
      <circle cx="75" cy="20" r="3" fill={accent} />
      <circle cx="85" cy="20" r="3" fill={green} />
      <line x1="55" y1="8" x2="70" y2="20" stroke={accent} strokeWidth="1" strokeDasharray="2 1" />
      <circle cx="55" cy="8" r="2.5" fill={accent} />
      <text x="77" y="13" fill={accent} fontSize="5">嫁接</text>
    </svg>
  </div>
);

case "commit-msg": return (
  <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px] space-y-1.5 overflow-hidden" style={{ ...box }}>
    <div className="flex items-center gap-1.5"><span className="px-1 py-0.5 rounded text-[7px]" style={{ backgroundColor: accentBg, color: accent }}>feat:</span><span style={{ color: text }}>add login page</span></div>
    <div className="flex items-center gap-1.5"><span className="px-1 py-0.5 rounded text-[7px]" style={{ backgroundColor: isDark ? "rgba(143,184,154,0.12)" : "rgba(95,138,107,0.1)", color: green }}>fix:</span><span style={{ color: text }}>resolve CORS</span></div>
    <div className="flex items-center gap-1.5"><span className="px-1 py-0.5 rounded text-[7px]" style={{ backgroundColor: isDark ? "rgba(232,196,122,0.12)" : "rgba(201,154,60,0.1)", color: yellow }}>docs:</span><span style={{ color: text }}>update README</span></div>
  </div>
);

case "fork": return (
  <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
    <div className="flex flex-col items-center gap-0.5">
      <div className="text-[10px]">📦</div>
      <div className="text-[6px] font-mono" style={{ color: text }}>原仓库</div>
      <div className="text-[5px]" style={{ color: textFaint }}>facebook/react</div>
    </div>
    <div className="flex flex-col items-center gap-0.5" style={{ color: accent }}>
      <span className="text-[8px]">fork</span>
      <span className="text-[10px]">→</span>
    </div>
    <div className="flex flex-col items-center gap-0.5">
      <div className="text-[10px]">📦</div>
      <div className="text-[6px] font-mono" style={{ color: accent }}>我的副本</div>
      <div className="text-[5px]" style={{ color: textFaint }}>me/react</div>
    </div>
  </div>
);

case "github": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center gap-2 overflow-hidden" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-8 h-8 rounded-[6px] border flex items-center justify-center" style={{ borderColor: border }}>
            <span className="text-[7px] font-mono" style={{ color: text }}>{"</>"}</span>
          </div>
          <span className="text-[6px]" style={{ color: textFaint }}>⭐ 42</span>
        </div>
        <div className="flex flex-col gap-1 font-mono text-[7px]">
          <div className="flex items-center gap-1"><span style={{ color: accent }}>●</span><span style={{ color: text }}>main</span></div>
          <div className="flex items-center gap-1 pl-2"><span style={{ color: green }}>●</span><span style={{ color: textFaint }}>feat/api</span></div>
          <div className="flex items-center gap-1 pl-2"><span style={{ color: yellow }}>●</span><span style={{ color: textFaint }}>fix/42</span></div>
        </div>
      </div>
    );

    case "cloudflare": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2 overflow-hidden" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-7 h-7 rounded-full border flex items-center justify-center text-[9px]" style={{ borderColor: accent + "30", backgroundColor: accentBg }}>🛡️</div>
          <span className="text-[6px] font-mono" style={{ color: accent }}>CDN</span>
        </div>
        <div className="flex flex-wrap gap-1 justify-center w-16">
          {["🌍","🌎","🌏","🌍","🌎"].map((c,i) => (
            <div key={i} className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[6px]" style={{ border: `1px solid ${blue}30`, backgroundColor: isDark ? "rgba(123,163,201,0.06)" : "rgba(74,127,165,0.04)" }}>{c}</div>
          ))}
        </div>
      </div>
    );

    case "vercel": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2 overflow-hidden" style={box}>
        <div className="flex flex-col items-center gap-1">
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent" style={{ borderBottomColor: text }} />
          <span className="text-[6px] font-mono" style={{ color: accent }}>▲ deploy</span>
        </div>
        <div className="flex flex-wrap gap-0.5 w-12 justify-center">
          {[...Array(6)].map((_,i) => (
            <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: i < 2 ? green : accent + "30", opacity: 1 - i * 0.1 }} />
          ))}
        </div>
      </div>
    );

    case "resend": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3 overflow-hidden" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-[18px]">✉️</div>
          <span className="text-[6px] font-mono" style={{ color: accent }}>RESEND</span>
        </div>
        <div className="flex flex-col gap-1 text-[7px] font-mono">
          <div className="flex items-center gap-1"><span style={{ color: green }}>→</span><span style={{ color: text }}>verify@</span></div>
          <div className="flex items-center gap-1"><span style={{ color: yellow }}>→</span><span style={{ color: textFaint }}>notify@</span></div>
          <div className="px-1.5 py-0.5 rounded-[3px] text-[6px] text-center" style={{ backgroundColor: accentBg, color: accent }}>API Send</div>
        </div>
      </div>
    );

    case "aliyun": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2 overflow-hidden" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-[16px]">☁️</div>
          <span className="text-[6px] font-mono" style={{ color: accent }}>ECS</span>
        </div>
        <div className="flex flex-col gap-1">
          {["OSS","RDS","CDN"].map((s,i) => (
            <div key={i} className="px-1.5 py-0.5 rounded-[3px] border text-[6px] font-mono flex items-center gap-1" style={{ borderColor: border, color: i === 0 ? accent : textFaint, backgroundColor: i === 0 ? accentBg : surface }}>
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: i === 0 ? accent : textFaint }} />{s}
            </div>
          ))}
        </div>
      </div>
    );

    case "tencent-cloud": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2 overflow-hidden" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-[16px]">🐧</div>
          <span className="text-[6px] font-mono" style={{ color: accent }}>CVM</span>
        </div>
        <div className="flex flex-col gap-1">
          {["COS","CDB","CDN"].map((s,i) => (
            <div key={i} className="px-1.5 py-0.5 rounded-[3px] border text-[6px] font-mono flex items-center gap-1" style={{ borderColor: border, color: i === 0 ? blue : textFaint, backgroundColor: i === 0 ? "rgba(74,127,165,0.06)" : surface }}>
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: i === 0 ? blue : textFaint }} />{s}
            </div>
          ))}
        </div>
      </div>
    );

    case "vscode": return (
      <div className="h-[88px] rounded-[10px] border overflow-hidden flex flex-col" style={box}>
        <div className="h-3.5 flex items-center px-2 gap-1 border-b" style={{ borderColor: border }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isDark ? "#d4836f" : "#b85c4a" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: yellow }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: green }} />
          <span className="text-[6px] ml-1 font-mono" style={{ color: textFaint }}>index.tsx — VS Code</span>
        </div>
        <div className="flex-1 flex">
          <div className="w-7 border-r p-1 space-y-0.5" style={{ borderColor: border }}>
            {[accentBg, surface, surface, surface].map((c, i) => <div key={i} className="h-1 rounded-full" style={{ backgroundColor: c }} />)}
          </div>
          <div className="flex-1 p-1 font-mono text-[7px] space-y-0.5">
            <div><span style={{ color: accent }}>const</span> <span style={{ color: text }}>x</span> = <span style={{ color: yellow }}>42</span></div>
            <div style={{ color: textFaint }}>  // AI assisted</div>
          </div>
        </div>
      </div>
    );

    case "postman": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[7px] space-y-1 overflow-hidden" style={box}>
        <div className="flex items-center gap-1.5">
          <span className="px-1 py-0.5 rounded text-[6px] font-bold" style={{ backgroundColor: "rgba(95,138,107,0.15)", color: green }}>GET</span>
          <span style={{ color: text }}>/api/users</span>
          <span className="ml-auto text-[6px]" style={{ color: green }}>200 OK</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="px-1 py-0.5 rounded text-[6px] font-bold" style={{ backgroundColor: accentBg, color: accent }}>POST</span>
          <span style={{ color: text }}>/api/auth</span>
          <span className="ml-auto text-[6px]" style={{ color: yellow }}>401</span>
        </div>
        <div className="flex items-center justify-center mt-1">
          <div className="px-3 py-0.5 rounded-[4px] text-[7px] font-bold" style={{ backgroundColor: accent, color: "#fff" }}>Send</div>
        </div>
      </div>
    );

    case "figma": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center gap-2 overflow-hidden" style={box}>
        <div className="relative w-10 h-12 rounded-[4px] border flex flex-col" style={{ borderColor: border }}>
          {[accentBg, surface, "rgba(143,184,154,0.08)", accentBg].map((c, i) => (
            <div key={i} className="flex-1 border-b last:border-0" style={{ backgroundColor: c, borderColor: border }} />
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-[6px] font-mono"><span style={{ color: accent }}>◆</span><span style={{ color: text }}>Frame 1</span></div>
          <div className="flex items-center gap-1 text-[6px] font-mono"><span style={{ color: green }}>◆</span><span style={{ color: textFaint }}>Button</span></div>
          <div className="flex items-center gap-1 text-[6px] font-mono"><span style={{ color: blue }}>◆</span><span style={{ color: textFaint }}>Text</span></div>
        </div>
      </div>
    );

    case "notion": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 space-y-1 overflow-hidden" style={box}>
        <div className="flex items-center gap-1 text-[8px] font-medium" style={{ color: text }}>📄 项目文档</div>
        <div className="flex gap-1">
          {["📋","📊","📅"].map((ico, i) => (
            <div key={i} className="px-1.5 py-0.5 rounded-[3px] border text-[6px] flex items-center gap-0.5" style={{ borderColor: border, color: i === 0 ? accent : textFaint, backgroundColor: i === 0 ? accentBg : surface }}>{ico}</div>
          ))}
        </div>
        <div className="space-y-0.5">
          <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: surface }} />
          <div className="h-1.5 w-3/4 rounded-full" style={{ backgroundColor: surface }} />
        </div>
      </div>
    );

    case "sentry": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[7px] space-y-1 overflow-hidden" style={box}>
        <div className="flex items-center gap-1">
          <span style={{ color: isDark ? "#d4836f" : "#b85c4a" }}>❌</span>
          <span style={{ color: text }}>TypeError</span>
          <span className="ml-auto px-1 py-0.5 rounded-[3px] text-[6px] font-bold" style={{ backgroundColor: isDark ? "rgba(212,131,111,0.15)" : "rgba(184,92,74,0.12)", color: isDark ? "#d4836f" : "#b85c4a" }}>🔴 3</span>
        </div>
        <div style={{ color: textFaint }}>  at processLogin (auth.ts:42)</div>
        <div className="flex items-center gap-1 mt-1">
          <span className="px-1 py-0.5 rounded-[3px] text-[6px]" style={{ backgroundColor: accentBg, color: accent }}>⚠ triggered</span>
          <span style={{ color: textFaint }}>→ Slack/Discord</span>
        </div>
      </div>
    );

    case "analytics": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2 overflow-hidden" style={box}>
        <div className="flex items-end gap-0.5 h-12">
          {[30,50,35,60,45,70,55].map((h, i) => (
            <div key={i} className="w-2 rounded-t-[2px]" style={{ height: h + "%", backgroundColor: i === 6 ? accent : accentBg }} />
          ))}
        </div>
        <div className="flex flex-col gap-1 text-[6px] font-mono">
          <div style={{ color: accent }}>PV 12.8k</div>
          <div style={{ color: green }}>↑ 23%</div>
          <div style={{ color: textFaint }}>UV 3.2k</div>
        </div>
      </div>
    );

    case "stripe": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3 overflow-hidden" style={box}>
        <div className="w-10 h-14 rounded-[5px] border flex flex-col p-1 gap-0.5" style={{ borderColor: border, backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)" }}>
          <div className="h-1.5 w-6 rounded-full" style={{ backgroundColor: accent }} />
          <div className="h-1 w-4 rounded-full" style={{ backgroundColor: surface }} />
          <div className="h-1.5 w-7 rounded-full mt-auto" style={{ backgroundColor: surface }} />
        </div>
        <div className="flex flex-col gap-1 text-[7px] font-mono">
          <div style={{ color: text }}>💳 ****4242</div>
          <div style={{ color: textFaint }}>$99.00/月</div>
          <div className="px-1.5 py-0.5 rounded-[3px] text-[6px] text-center" style={{ backgroundColor: accentBg, color: accent }}>Pay</div>
        </div>
      </div>
    );

    case "supabase": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2 overflow-hidden" style={box}>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <div className="w-7 h-7 rounded-[4px] border flex items-center justify-center text-[7px] font-mono" style={{ borderColor: green + "30", backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green }}>DB</div>
            <div className="w-7 h-7 rounded-[4px] border flex items-center justify-center text-[7px] font-mono" style={{ borderColor: accent + "30", backgroundColor: accentBg, color: accent }}>Auth</div>
          </div>
          <div className="w-14 h-3 rounded-[3px] border flex items-center justify-center text-[6px] font-mono" style={{ borderColor: border, color: textFaint }}>📦 Storage</div>
        </div>
        <div className="text-[6px] font-mono" style={{ color: textFaint }}>PostgreSQL<br/>+ RLS</div>
      </div>
    );

    case "neon": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2 overflow-hidden" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex flex-col items-center">
            <div className="w-8 h-5 rounded-[3px] border flex items-center justify-center text-[8px]" style={{ borderColor: accent + "30", backgroundColor: accentBg }}>🐘</div>
            <div className="flex gap-3 mt-0.5">
              <div className="w-4 h-3 rounded-b-[3px] border-t-0 border flex items-center justify-center text-[5px]" style={{ borderColor: green + "30", color: green }}>dev</div>
              <div className="w-4 h-3 rounded-b-[3px] border-t-0 border flex items-center justify-center text-[5px]" style={{ borderColor: accent + "30", color: accent }}>feat</div>
            </div>
          </div>
        </div>
        <div className="text-[6px] font-mono text-center" style={{ color: textFaint }}>branch DB<br/>auto-sleep</div>
      </div>
    );

    case "railway": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2 overflow-hidden" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-0.5 text-[10px]">
            <span>🚂</span>
            <div className="flex gap-0.5">
              {[accent, green, blue].map((c,i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
          <div className="flex gap-0.5">
            {["─","─","─"].map((_,i) => (
              <div key={i} className="w-3 h-0.5 rounded-full" style={{ backgroundColor: i === 1 ? accent : textFaint }} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 text-[6px] font-mono">
          <div className="px-1.5 py-0.5 rounded-[3px] text-center" style={{ backgroundColor: accentBg, color: accent }}>push → deploy</div>
          <div style={{ color: textFaint }}>Node.js + PG + Redis</div>
        </div>
      </div>
    );

case "prompt-engineering": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[7px] space-y-1 flex flex-col justify-center" style={box}>
        <div style={{ color: textFaint }}>❌ "做个登录"</div>
        <div className="flex items-center gap-1"><span style={{ color: textFaint }}>→</span><span style={{ color: text }}>一般结果</span></div>
        <div style={{ color: accent }}>✅ "你是资深后端，用 JWT + bcrypt 实现登录 API，分三步给出方案"</div>
        <div className="flex items-center gap-1"><span style={{ color: green }}>→</span><span style={{ color: text }}>精准结果</span></div>
      </div>
    );

    case "refactor": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center gap-2" style={box}>
        <div className="flex-1 font-mono text-[7px] space-y-0.5" style={{ color: textFaint }}>
          <div className="flex gap-0.5 flex-wrap"><span style={{ color: yellow }}>❌</span>fn a(x){'{'}return x*2{'}'} fn b(){}</div>
          <div className="h-0.5 rounded-full w-3/4" style={{ backgroundColor: surface }} />
          <div className="h-0.5 rounded-full" style={{ backgroundColor: surface }} />
        </div>
        <span style={{ color: accent }}>→</span>
        <div className="flex-1 font-mono text-[7px] space-y-0.5" style={{ color: text }}>
          <div className="flex gap-0.5 flex-wrap"><span style={{ color: green }}>✓</span>fn double(x){'{'}x*2{'}'}</div>
          <div className="flex gap-0.5 flex-wrap"><span style={{ color: green }}>✓</span>fn init(){}</div>
          <div className="h-0.5 rounded-full w-2/3" style={{ backgroundColor: accentBg }} />
        </div>
      </div>
    );

    case "boilerplate": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex gap-1 overflow-hidden" style={box}>
        {[1,2,3,4].map(i => (
          <div key={i} className="flex-1 rounded-[4px] border p-1 font-mono text-[6px] space-y-0.5 flex flex-col items-center justify-center" style={{ borderColor: border }}>
            <div className="w-3 h-3 rounded-full flex items-center justify-center text-[7px]" style={{ backgroundColor: accentBg, color: accent }}>{i}</div>
            <div className="h-0.5 w-3/4 rounded-full" style={{ backgroundColor: surface }} />
            <div className="h-0.5 w-2/3 rounded-full" style={{ backgroundColor: surface }} />
            <div className="h-0.5 w-3/4 rounded-full" style={{ backgroundColor: surface }} />
          </div>
        ))}
      </div>
    );

    case "stack": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex flex-col justify-center items-center gap-1" style={box}>
        {["React", "Next.js", "Tailwind", "Prisma", "SQLite"].map((s, i) => (
          <div key={i} className="px-2 py-0.5 rounded-[3px] text-[7px] font-mono font-medium" style={{ backgroundColor: i === 0 ? accentBg : surface, color: i === 0 ? accent : textFaint, width: i === 0 ? "56px" : `${56 - i * 4}px`, textAlign: "center" }}>{s}</div>
        ))}
      </div>
    );

    case "framework": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="w-16 h-14 rounded-[6px] border-2 flex flex-col p-1 gap-0.5" style={{ borderColor: accent, borderStyle: "dashed" }}>
          <div className="text-[6px] font-bold" style={{ color: accent }}>骨架(框架)</div>
          <div className="h-1 rounded-full" style={{ backgroundColor: accentBg }} />
          <div className="h-1 rounded-full w-3/4" style={{ backgroundColor: accentBg }} />
          <div className="flex items-center gap-0.5"><div className="w-2 h-2 rounded-full flex items-center justify-center text-[5px]" style={{ backgroundColor: green + "30", color: green }}>+</div><div className="text-[5px]" style={{ color: textFaint }}>业务逻辑</div></div>
        </div>
        <span style={{ color: textFaint, fontSize: "12px" }}>→</span>
        <div className="w-16 h-14 rounded-[6px] border flex flex-col p-1 gap-0.5" style={{ borderColor: green }}>
          <div className="text-[6px] font-bold" style={{ color: green }}>完整App</div>
          <div className="h-1 rounded-full" style={{ backgroundColor: accentBg }} />
          <div className="h-1 rounded-full w-3/4" style={{ backgroundColor: green + "30" }} />
          <div className="h-1 rounded-full w-2/3" style={{ backgroundColor: green + "30" }} />
        </div>
      </div>
    );

    case "dependency": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-[10px]" style={{ borderColor: accent, color: accent }}>📦</div>
          <div className="text-[6px] mt-1 font-mono" style={{ color: accent }}>my-app</div>
        </div>
        <div className="flex flex-col gap-0.5 ml-1">
          {[["react", green], ["tailwind", accent], ["prisma", blue], ["lodash", yellow]].map(([n, c]) => (
            <div key={n as string} className="flex items-center gap-1">
              <div className="w-3 h-[1px]" style={{ backgroundColor: border }} />
              <div className="px-1 py-0.5 rounded-[2px] text-[6px] font-mono" style={{ backgroundColor: (c as string) + "15", color: c as string }}>{n}</div>
            </div>
          ))}
        </div>
      </div>
    );

    case "hot-reload": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono border" style={{ borderColor: border, color: text }}>&lt;h1&gt;Hello&lt;/h1&gt;</div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[16px]">⚡</span>
          <span className="text-[6px] font-mono" style={{ color: accent }}>HMR</span>
        </div>
        <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono border flex items-center gap-1" style={{ borderColor: green + "40", backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)", color: green }}>&lt;h1&gt;Hi!&lt;/h1&gt;<span className="text-[10px]">🔄</span></div>
      </div>
    );

    case "rules-file": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[7px] space-y-0.5 overflow-hidden" style={{ ...box, color: text }}>
        <div className="flex items-center gap-1"><span className="text-[9px]">📋</span><span style={{ color: accent }}>AGENTS.md</span></div>
        <div className="pl-3"><span style={{ color: textFaint }}>1.</span> 用 <span style={{ color: accent }}>pnpm</span> 不用 npm</div>
        <div className="pl-3"><span style={{ color: textFaint }}>2.</span> 组件用 <span style={{ color: green }}>函数式</span>写法</div>
        <div className="pl-3"><span style={{ color: textFaint }}>3.</span> 禁用 <span style={{ color: yellow }}>any</span> 类型</div>
        <div className="pl-3"><span style={{ color: textFaint }}>4.</span> 提交前跑 <span style={{ color: blue }}>lint</span></div>
      </div>
    );

    case "code-review": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex flex-col gap-1.5 justify-center" style={box}>
        <div className="flex items-start gap-1.5">
          <span className="text-[8px] mt-0.5" style={{ color: green }}>✓</span>
          <div className="flex-1"><div className="text-[8px]" style={{ color: text }}>命名清晰，逻辑流畅</div><div className="text-[6px]" style={{ color: textFaint }}>Line 12-18</div></div>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="text-[8px] mt-0.5" style={{ color: accent }}>✗</span>
          <div className="flex-1"><div className="text-[8px]" style={{ color: text }}>缺少空值检查，可能崩溃</div><div className="text-[6px]" style={{ color: textFaint }}>Line 24</div></div>
        </div>
      </div>
    );

    case "testing": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[7px] space-y-1" style={box}>
        <div className="flex items-center gap-1"><span style={{ color: green }}>✓</span><span style={{ color: text }}>it("正常登录", ...)</span><span className="ml-auto text-[6px] px-1 rounded" style={{ backgroundColor: green + "20", color: green }}>PASS</span></div>
        <div className="flex items-center gap-1"><span style={{ color: green }}>✓</span><span style={{ color: text }}>it("密码错误", ...)</span><span className="ml-auto text-[6px] px-1 rounded" style={{ backgroundColor: green + "20", color: green }}>PASS</span></div>
        <div className="flex items-center gap-1"><span style={{ color: accent }}>✗</span><span style={{ color: text }}>it("账号不存在", ...)</span><span className="ml-auto text-[6px] px-1 rounded" style={{ backgroundColor: accentBg, color: accent }}>FAIL</span></div>
      </div>
    );

    case "documentation": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="w-20 h-14 rounded-[4px] border p-1.5 space-y-1" style={{ borderColor: border }}>
          <div className="text-[8px] font-bold" style={{ color: accent }}>README.md</div>
          <div className="h-1 rounded-full" style={{ backgroundColor: surface }} />
          <div className="h-1 rounded-full w-5/6" style={{ backgroundColor: surface }} />
          <div className="flex gap-0.5 mt-0.5">
            <div className="px-1 py-0.5 rounded-[2px] text-[5px]" style={{ backgroundColor: accentBg, color: accent }}>安装</div>
            <div className="px-1 py-0.5 rounded-[2px] text-[5px]" style={{ backgroundColor: green + "15", color: green }}>使用</div>
            <div className="px-1 py-0.5 rounded-[2px] text-[5px]" style={{ backgroundColor: blue + "15", color: blue }}>API</div>
          </div>
        </div>
      </div>
    );

    case "ai-coding-assistant": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex" style={box}>
        <div className="flex-1 font-mono text-[7px] space-y-0.5">
          <div style={{ color: text }}>fn <span style={{ color: accent }}>handleSubmit</span>() {"{"}</div>
          <div className="pl-2" style={{ color: textFaint }}>const data = ...</div>
          <div className="pl-2" style={{ color: textFaint }}>const res = ...</div>
          <div className="pl-2"><span style={{ color: textFaint, backgroundColor: accentBg }}>await api.post(</span></div>
          <div className="pl-2" style={{ color: textFaint }}>  data</div>
          <div className="pl-2" style={{ color: textFaint }}>)</div>
          <div style={{ color: text }}>{"}"}</div>
        </div>
        <div className="ml-1 px-1 flex items-center"><span className="text-[9px]" style={{ color: accent }}>🤖</span></div>
      </div>
    );

    case "decompose": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center" style={box}>
        <div className="flex flex-col items-center gap-0.5">
          <div className="px-3 py-1 rounded-[5px] text-[7px] font-bold" style={{ backgroundColor: accentBg, color: accent }}>用户系统</div>
          <span className="text-[8px]" style={{ color: textFaint }}>▼ 拆解 ▼</span>
          <div className="flex gap-1">
            {["注册", "登录", "权限", "资料"].map((t, i) => (
              <div key={i} className="px-1.5 py-0.5 rounded-[3px] text-[6px]" style={{ backgroundColor: surface, color: text, border: `1px solid ${border}` }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
    );

    case "accept-reject": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-3" style={box}>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-bold" style={{ backgroundColor: green + "20", color: green }}>✓</div>
          <div className="text-[7px] font-medium" style={{ color: green }}>接受</div>
        </div>
        <div className="w-[1px] h-8" style={{ backgroundColor: border }} />
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-bold" style={{ backgroundColor: accentBg, color: accent }}>✗</div>
          <div className="text-[7px] font-medium" style={{ color: accent }}>拒绝</div>
        </div>
      </div>
    );

    case "dom": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 font-mono text-[8px]" style={box}>
        <div style={{ color: accent }}>html</div>
        <div className="pl-3" style={{ color: text }}>└─ <span style={{ color: blue }}>body</span></div>
        <div className="pl-6" style={{ color: text }}>├─ <span style={{ color: blue }}>header</span></div>
        <div className="pl-6" style={{ color: text }}>└─ <span style={{ color: blue }}>main</span></div>
        <div className="pl-9" style={{ color: textFaint }}>└─ <span style={{ color: blue }}>button</span> ← JS 可操作</div>
      </div>
    );

    case "webhook": return (
      <div className="h-[88px] rounded-[10px] border p-2.5 flex items-center justify-center gap-2" style={box}>
        <div className="text-center"><div className="w-8 h-8 rounded-[5px] border flex items-center justify-center text-[8px]" style={{ borderColor: border, color: text }}>事件</div><div className="text-[6px] mt-0.5" style={{ color: textFaint }}>支付完成</div></div>
        <span className="text-[9px]" style={{ color: textFaint }}>→</span>
        <div className="px-2 py-1 rounded-[4px] text-[7px] font-mono" style={{ backgroundColor: accentBg, color: accent }}>POST /webhook</div>
        <span className="text-[9px]" style={{ color: textFaint }}>→</span>
        <div className="text-center"><div className="w-8 h-8 rounded-[5px] border flex items-center justify-center text-[8px]" style={{ borderColor: green + "40", color: green, backgroundColor: isDark ? "rgba(143,184,154,0.08)" : "rgba(95,138,107,0.06)" }}>你的服务器</div><div className="text-[6px] mt-0.5" style={{ color: textFaint }}>自动收到</div></div>
      </div>
    );

    // No unique preview for this term
    default: return null;
  }
}
