"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePalette, CodeToggle, MiniBtn, Tag, Arrow, Box } from "./demo-shared";

export function LlmDemo() {
  const p = usePalette();
  const [input, setInput] = useState("你好");
  const [output, setOutput] = useState("");
  const generate = () => { setOutput(""); const text = `我是AI助手，你说了「${input}」。`; let i = 0; const t = setInterval(() => { if (i < text.length) { setOutput(text.slice(0, i + 1)); i++; } else clearInterval(t); }, 50); };
  return (<CodeToggle code={`// LLM 大语言模型\n// 输入: prompt (文本)\n// 输出: 逐 token 生成文本\n// 原理: 预测下一个最可能的 token\n// 模型: GPT-4, Claude, Llama, Qwen`}>
    <div className="flex gap-1 mb-2"><input value={input} onChange={e => setInput(e.target.value)} className="flex-1 h-7 px-2 rounded-[5px] text-[10px] border outline-none" style={{ borderColor: p.border, backgroundColor: p.surface, color: p.text }} /><MiniBtn onClick={generate} p={p}>生成</MiniBtn></div>
    <div className="rounded-[6px] border p-2 min-h-[30px] text-[10px]" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}>{output || <span style={{ color: p.textFaint }}>点击生成...</span>}<span className="animate-pulse">|</span></div>
  </CodeToggle>);
}

export function PromptDemo() {
  const p = usePalette();
  const [role, setRole] = useState("前端开发者");
  return (<CodeToggle code={`// 提示词结构\n// 角色: 你是谁\n// 任务: 做什么\n// 上下文: 背景信息\n// 格式: 输出要求\n// 好的 prompt = 清晰 + 具体 + 有约束`}>
    <div className="space-y-1.5 text-[9px]">
      <div className="flex items-center gap-1"><Tag p={p}>角色</Tag><span style={{ color: p.textMuted }}>你是一个{role}</span></div>
      <div className="flex items-center gap-1"><Tag p={p}>任务</Tag><span style={{ color: p.textMuted }}>帮我写一个登录页面</span></div>
      <div className="flex items-center gap-1"><Tag p={p}>格式</Tag><span style={{ color: p.textMuted }}>React + Tailwind，带注释</span></div>
    </div>
    <div className="flex gap-1 mt-2 flex-wrap">{["前端开发者", "UI设计师", "产品经理"].map(r => <MiniBtn key={r} active={role === r} onClick={() => setRole(r)} p={p}>{r}</MiniBtn>)}</div>
  </CodeToggle>);
}

export function ContextWindowDemo() {
  const p = usePalette();
  const [tokens, setTokens] = useState(4000);
  const max = 8000;
  return (<CodeToggle code={`// 上下文窗口 = 模型一次能「看到」的文本量\n// GPT-4: 128K tokens\n// Claude: 200K tokens\n// 超出窗口的内容会被「遗忘」\n// 1 token ≈ 0.7 个中文字`}>
    <input type="range" min={0} max={max} value={tokens} onChange={e => setTokens(+e.target.value)} className="w-full mb-1" />
    <div className="flex justify-between text-[9px] font-mono" style={{ color: p.textFaint }}><span>0</span><span style={{ color: tokens > max * 0.8 ? "#b85c4a" : p.accent }}>{tokens} / {max} tokens</span><span>{max}</span></div>
    <div className="mt-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: p.surface }}><div className="h-full rounded-full transition-all" style={{ width: `${(tokens / max) * 100}%`, backgroundColor: tokens > max * 0.8 ? "#b85c4a" : tokens > max * 0.5 ? "#d4a03c" : "#5f8a6b" }} /></div>
  </CodeToggle>);
}

export function TemperatureDemo() {
  const p = usePalette();
  const [temp, setTemp] = useState(0.7);
  const outputs = temp < 0.3 ? ["猫", "猫", "猫", "猫", "猫"] : temp < 0.7 ? ["猫", "猫咪", "小猫", "猫", "咪咪"] : ["猫", "毛球", "主子", "喵星人", "四脚兽"];
  return (<CodeToggle code={`// Temperature 温度参数\n// 0 = 确定性输出 (每次相同)\n// 1 = 随机性最大 (创意发散)\n// 代码生成: 0-0.3 (精确)\n// 创意写作: 0.7-1.0 (多样)`}>
    <input type="range" min={0} max={100} value={temp * 100} onChange={e => setTemp(+e.target.value / 100)} className="w-full mb-1" />
    <div className="text-[9px] text-center mb-2 font-mono" style={{ color: p.accent }}>temp = {temp.toFixed(1)}</div>
    <div className="flex gap-1 flex-wrap justify-center">{outputs.map((o, i) => <span key={i} className="px-1.5 py-0.5 rounded-[4px] text-[9px]" style={{ backgroundColor: p.surface, color: p.textMuted }}>{o}</span>)}</div>
    <div className="text-[8px] text-center mt-1" style={{ color: p.textFaint }}>5次回答「猫的同义词」</div>
  </CodeToggle>);
}

export function HallucinationDemo() {
  const p = usePalette();
  const [show, setShow] = useState(false);
  return (<CodeToggle code={`// 幻觉 = AI 编造不存在的事实\n// 表现: 假引用、假API、假历史事件\n// 应对: 验证关键信息、要求引用来源\n// RAG 可减少幻觉`}>
    <div className="rounded-[6px] border p-2 text-[10px] space-y-1" style={{ borderColor: p.border, backgroundColor: p.surface }}>
      <div style={{ color: p.textMuted }}>AI: React 19 于 2020 年发布，作者是 Dan Abramov 在 Google 工作时创建的。</div>
      <button onClick={() => setShow(!show)} className="text-[9px] cursor-pointer border-0 bg-transparent" style={{ color: p.accent }}>{show ? "隐藏" : "显示"}事实核查</button>
      {show && <div className="space-y-0.5 text-[9px]"><div style={{ color: "#b85c4a" }}>✗ React 19 发布于 2024 年，非 2020</div><div style={{ color: "#b85c4a" }}>✗ Dan Abramov 在 Meta(Facebook) 工作，非 Google</div></div>}
    </div>
  </CodeToggle>);
}

export function RagDemo() {
  const p = usePalette();
  const [step, setStep] = useState(0);
  const steps = ["用户提问", "检索知识库", "拼接上下文", "LLM 生成回答"];
  useEffect(() => { if (step > 0 && step < steps.length) { const t = setTimeout(() => setStep(s => s + 1), 800); return () => clearTimeout(t); } }, [step]);
  return (<CodeToggle code={`// RAG = Retrieval Augmented Generation\n// 1. 用户提问\n// 2. 从知识库检索相关文档\n// 3. 把文档 + 问题一起给 LLM\n// 4. LLM 基于真实文档回答 (减少幻觉)`}>
    <button onClick={() => setStep(1)} className="mb-2 px-3 py-1 rounded-[5px] text-[10px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>开始 RAG 流程</button>
    <div className="flex items-center gap-0.5 flex-wrap">{steps.map((s, i) => <span key={i} className="flex items-center"><span className="px-1.5 py-1 rounded-[4px] text-[8px] transition-all" style={{ backgroundColor: i < step ? p.accent : p.surface, color: i < step ? "#fff" : p.textFaint }}>{s}</span>{i < steps.length - 1 && <Arrow p={p}/>}</span>)}</div>
  </CodeToggle>);
}

export function EmbeddingDemo() {
  const p = usePalette();
  const points = [{ x: 20, y: 30, label: "猫" }, { x: 25, y: 35, label: "狗" }, { x: 70, y: 70, label: "汽车" }, { x: 75, y: 65, label: "卡车" }, { x: 50, y: 50, label: "?" }];
  return (<CodeToggle code={`// Embedding 向量嵌入\n// 把文本转成高维数字向量\n// 语义相近 → 向量距离近\n// 用途: 语义搜索、相似度匹配、RAG`}>
    <div className="relative h-[80px] rounded-[8px] border" style={{ borderColor: p.border, backgroundColor: p.surface }}>
      {points.map((pt, i) => <div key={i} className="absolute w-3 h-3 rounded-full flex items-center justify-center text-[6px]" style={{ left: `${pt.x}%`, top: `${pt.y}%`, backgroundColor: i === 4 ? p.accent : i < 2 ? "#5f8a6b" : "#4a7fb5", color: "#fff", transform: "translate(-50%,-50%)" }} title={pt.label}><span className="absolute -top-3 text-[7px]" style={{ color: p.textFaint }}>{pt.label}</span></div>)}
    </div>
    <div className="mt-1 text-[8px] text-center" style={{ color: p.textFaint }}>相近语义在向量空间中距离更近</div>
  </CodeToggle>);
}

export function FineTuningDemo() {
  const p = usePalette();
  const [epoch, setEpoch] = useState(0);
  const loss = Math.max(0.1, 2.5 * Math.exp(-epoch * 0.5));
  return (<CodeToggle code={`// 微调 Fine-tuning\n// 在预训练模型上用特定数据继续训练\n// 让模型学会特定风格/领域知识\n// 比 RAG 更深度，但成本更高\n// LoRA: 低成本微调方法`}>
    <input type="range" min={0} max={10} value={epoch} onChange={e => setEpoch(+e.target.value)} className="w-full mb-1" />
    <div className="flex justify-between text-[9px]"><span style={{ color: p.textFaint }}>Epoch: {epoch}</span><span style={{ color: p.accent }}>Loss: {loss.toFixed(3)}</span></div>
    <div className="mt-1 h-10 rounded-[6px] border relative overflow-hidden" style={{ borderColor: p.border }}><div className="absolute bottom-0 left-0 right-0 transition-all rounded-b-[6px]" style={{ height: `${(1 - loss / 2.5) * 100}%`, backgroundColor: p.accentBg }} /></div>
  </CodeToggle>);
}

export function MultimodalDemo() {
  const p = usePalette();
  const [mode, setMode] = useState<"text" | "image" | "both">("text");
  return (<CodeToggle code={`// 多模态 = 处理多种输入类型\n// 文本 + 图片 + 音频 + 视频\n// GPT-4V: 能看图\n// Gemini: 文本+图+音+视频\n// 应用: 图片描述、OCR、视频理解`}>
    <div className="flex gap-1 mb-2">{(["text", "image", "both"] as const).map(m => <MiniBtn key={m} active={mode === m} onClick={() => setMode(m)} p={p}>{m === "text" ? "📝" : m === "image" ? "🖼️" : "📝+️"}</MiniBtn>)}</div>
    <div className="flex gap-2 items-center justify-center">
      {mode !== "text" && <div className="w-10 h-10 rounded-[6px] border flex items-center justify-center text-[14px]" style={{ borderColor: p.border, backgroundColor: p.surface }}>🏔️</div>}
      <Arrow p={p} />
      <Box highlight p={p}>🧠 AI</Box>
      <Arrow p={p} />
      <div className="text-[9px] max-w-[100px]" style={{ color: p.textMuted }}>{mode === "text" ? "纯文本回答" : mode === "image" ? "这是一座雪山..." : "结合图文分析..."}</div>
    </div>
  </CodeToggle>);
}

export function StreamingDemo() {
  const p = usePalette();
  const [text, setText] = useState("");
  const [streaming, setStreaming] = useState(false);
  const start = () => { setStreaming(true); setText(""); const full = "流式输出让用户无需等待完整回答，逐字显示提升体验。"; let i = 0; const t = setInterval(() => { if (i < full.length) { setText(full.slice(0, i + 1)); i++; } else { clearInterval(t); setStreaming(false); } }, 60); };
  return (<CodeToggle code={`// 流式输出 Streaming\n// 不等全部生成完再返回\n// 每生成一个 token 就发给前端\n// SSE / WebSocket 实现\n// 用户体验: 即时反馈，减少等待焦虑`}>
    <button onClick={start} disabled={streaming} className="mb-2 px-3 py-1 rounded-[5px] text-[10px] border cursor-pointer disabled:opacity-40" style={{ borderColor: p.accentBorder, color: p.accent }}>{streaming ? "生成中..." : "开始流式输出"}</button>
    <div className="rounded-[6px] border p-2 text-[10px] min-h-[30px]" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}>{text}{streaming && <span className="animate-pulse">▊</span>}</div>
  </CodeToggle>);
}

export function ContextEngineeringDemo() {
  const p = usePalette();
  const parts = [{ label: "系统提示", size: 20 }, { label: "历史对话", size: 30 }, { label: "RAG 文档", size: 25 }, { label: "用户问题", size: 10 }];
  return (<CodeToggle code={`// 上下文工程\n// 精心设计送入模型的信息\n// 包括: 系统提示 + 历史 + 检索文档 + 问题\n// 目标: 在有限窗口内放最有用的信息\n// 技巧: 压缩、摘要、优先级排序`}>
    <div className="flex h-8 rounded-[6px] overflow-hidden border" style={{ borderColor: p.border }}>
      {parts.map((pt, i) => <div key={i} className="flex items-center justify-center text-[7px] transition-all" style={{ width: `${pt.size}%`, backgroundColor: i === 3 ? p.accent : p.surface, color: i === 3 ? "#fff" : p.textFaint, borderRight: i < parts.length - 1 ? `1px solid ${p.border}` : "none" }}>{pt.label}</div>)}
    </div>
    <div className="mt-1 text-[8px] text-center" style={{ color: p.textFaint }}>上下文窗口分配策略</div>
  </CodeToggle>);
}

export function McpDemo() {
  const p = usePalette();
  const tools = ["read_file", "write_file", "search", "run_cmd"];
  const [active, setActive] = useState(0);
  return (<CodeToggle code={`// MCP = Model Context Protocol\n// 标准化 AI 与外部工具的连接\n// AI Agent 通过 MCP 调用:\n// - 文件系统\n// - 数据库\n// - API 服务\n// 类似 USB 统一接口`}>
    <div className="flex items-center gap-1 text-[9px]"><Box highlight p={p}>🧠 AI</Box><Arrow p={p}/><Box p={p}>🔌 MCP</Box><Arrow p={p}/><div className="space-y-0.5">{tools.map((t, i) => <div key={i} onClick={() => setActive(i)} className="px-1.5 py-0.5 rounded-[3px] text-[8px] cursor-pointer transition-all" style={{ backgroundColor: i === active ? p.accentBg : "transparent", color: i === active ? p.accent : p.textFaint }}>{t}()</div>)}</div></div>
  </CodeToggle>);
}

export function KnowledgeBaseDemo() {
  const p = usePalette();
  const [query, setQuery] = useState("");
  const docs = ["React 使用虚拟 DOM", "Vue 使用响应式系统", "Angular 使用依赖注入"];
  const results = query ? docs.filter(d => d.toLowerCase().includes(query.toLowerCase())) : [];
  return (<CodeToggle code={`// 知识库 = AI 的参考资料库\n// 存储: 文档、FAQ、产品手册\n// 检索: 语义搜索 (embedding 相似度)\n// 用途: RAG 的数据源\n// 工具: Pinecone, Weaviate, ChromaDB`}>
    <input value={query} onChange={e => setQuery(e.target.value)} placeholder="搜索知识库..." className="w-full h-7 px-2 rounded-[5px] text-[10px] border outline-none mb-2" style={{ borderColor: p.border, backgroundColor: p.surface, color: p.text }} />
    <div className="space-y-1">{(query ? results : docs).map((d, i) => <div key={i} className="px-2 py-1 rounded-[4px] text-[9px] border" style={{ borderColor: p.border, backgroundColor: p.surface, color: p.textMuted }}>📄 {d}</div>)}</div>
  </CodeToggle>);
}

export function InferenceDemo() {
  const p = usePalette();
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const run = () => { setRunning(true); setProgress(0); const t = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(t); setRunning(false); return 100; } return p + 10; }), 100); };
  return (<CodeToggle code={`// 推理 Inference = 模型使用阶段\n// 训练好的模型接收输入 → 产出输出\n// 关注: 延迟、吞吐、成本\n// 优化: 量化、蒸馏、批处理\n// 部署: vLLM, TGI, ONNX`}>
    <button onClick={run} disabled={running} className="mb-2 px-3 py-1 rounded-[5px] text-[10px] border cursor-pointer disabled:opacity-40" style={{ borderColor: p.accentBorder, color: p.accent }}>运行推理</button>
    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: p.surface }}><div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: p.accent }} /></div>
    <div className="mt-1 text-[9px] text-center" style={{ color: p.textFaint }}>{running ? `推理中... ${progress}%` : progress === 100 ? "✓ 推理完成 (23ms)" : "等待输入"}</div>
  </CodeToggle>);
}

export function TrainingDemo() {
  const p = usePalette();
  const [epoch, setEpoch] = useState(0);
  return (<CodeToggle code={`// 训练 Training\n// 给模型大量数据学习模式\n// 过程: 前向传播 → 计算损失 → 反向传播 → 更新权重\n// 需要: GPU 集群、大量数据、数周时间\n// 预训练 → 微调 → RLHF`}>
    <div className="flex gap-1 mb-2">{[0, 1, 2, 3, 4].map(e => <MiniBtn key={e} active={epoch === e} onClick={() => setEpoch(e)} p={p}>E{e}</MiniBtn>)}</div>
    <div className="flex items-end gap-0.5 h-10">{[2.5, 1.8, 1.2, 0.7, 0.3].map((l, i) => <div key={i} className="flex-1 rounded-t-[2px] transition-all" style={{ height: `${(l / 2.5) * 100}%`, backgroundColor: i <= epoch ? p.accent : p.surface }} />)}</div>
    <div className="text-[8px] text-center mt-1" style={{ color: p.textFaint }}>Loss 随 epoch 下降</div>
  </CodeToggle>);
}

export function OpenSourceModelDemo() {
  const p = usePalette();
  const models = [{ name: "Llama 3", size: "70B", license: "开源" }, { name: "Qwen 2", size: "72B", license: "开源" }, { name: "Mistral", size: "7B", license: "Apache" }];
  return (<CodeToggle code={`// 开源模型\n// 权重公开，可自行部署\n// 优势: 隐私、定制、无 API 费用\n// 劣势: 需要 GPU、维护成本\n// 代表: Llama, Qwen, Mistral, DeepSeek`}>
    <div className="space-y-1">{models.map((m, i) => <div key={i} className="flex items-center justify-between px-2 py-1.5 rounded-[6px] border text-[9px]" style={{ borderColor: p.border, backgroundColor: p.surface }}><span style={{ color: p.text }}>{m.name}</span><span style={{ color: p.textFaint }}>{m.size} · {m.license}</span></div>)}</div>
  </CodeToggle>);
}

export function ApiKeyDemo() {
  const p = usePalette();
  const [show, setShow] = useState(false);
  const key = "sk-proj-abc123...xyz789";
  return (<CodeToggle code={`// API Key = 访问 AI 服务的凭证\n// 类似密码，不要泄露！\n// 存放在 .env 文件中\n// 轮换: 定期更换 key\n// 限额: 设置用量上限`}>
    <div className="flex items-center gap-2 rounded-[6px] border p-2 font-mono text-[9px]" style={{ borderColor: p.border, backgroundColor: p.codeBg }}>
      <span style={{ color: p.textMuted }}>{show ? key : "sk-proj-••••••••••••"}</span>
      <button onClick={() => setShow(!show)} className="text-[8px] cursor-pointer border-0 bg-transparent" style={{ color: p.accent }}>{show ? "隐藏" : "显示"}</button>
    </div>
    <div className="mt-1 text-[8px]" style={{ color: "#b85c4a" }}>⚠️ 不要提交到 Git！用 .env + .gitignore</div>
  </CodeToggle>);
}

export function ParametersDemo() {
  const p = usePalette();
  const [params, setParams] = useState({ temp: 0.7, topP: 0.9, maxTokens: 2048 });
  return (<CodeToggle code={`// 模型参数\n// temperature: 随机性 (0-2)\n// top_p: 核采样 (0-1)\n// max_tokens: 最大输出长度\n// frequency_penalty: 减少重复`}>
    <div className="space-y-2">
      {Object.entries(params).map(([k, v]) => <div key={k} className="flex items-center gap-2"><span className="text-[9px] w-16 font-mono" style={{ color: p.textMuted }}>{k}</span><input type="range" min={0} max={k === "maxTokens" ? 4096 : 100} value={k === "maxTokens" ? v : v * 100} onChange={e => setParams(p => ({ ...p, [k]: k === "maxTokens" ? +e.target.value : +e.target.value / 100 }))} className="flex-1" /><span className="text-[9px] font-mono w-10 text-right" style={{ color: p.accent }}>{k === "maxTokens" ? v : v.toFixed(1)}</span></div>)}
    </div>
  </CodeToggle>);
}

export function AgentDemo() {
  const p = usePalette();
  const [step, setStep] = useState(0);
  const steps = [" 思考: 需要查天气", "🔧 行动: 调用天气API", "👁️ 观察: 北京 25°C", "🧠 思考: 可以回答了", "💬 回复: 北京今天25°C"];
  useEffect(() => { if (step > 0 && step < steps.length) { const t = setTimeout(() => setStep(s => s + 1), 700); return () => clearTimeout(t); } }, [step]);
  return (<CodeToggle code={`// AI Agent 智能体\n// 循环: Think → Act → Observe\n// 能自主使用工具完成任务\n// 不只是回答问题，而是「做事」\n// 框架: LangChain, AutoGen, CrewAI`}>
    <button onClick={() => setStep(1)} className="mb-2 px-3 py-1 rounded-[5px] text-[10px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>启动 Agent</button>
    <div className="space-y-1">{steps.map((s, i) => <div key={i} className="text-[9px] transition-all flex items-center gap-1" style={{ color: i < step ? p.text : p.textFaint, opacity: i < step ? 1 : 0.3 }}>{i < step - 1 ? "✓" : i === step - 1 ? "▶" : "○"} {s}</div>)}</div>
  </CodeToggle>);
}

export function ToolCallingDemo() {
  const p = usePalette();
  const tools = [{ name: "get_weather", desc: "查天气" }, { name: "search_web", desc: "搜索" }, { name: "send_email", desc: "发邮件" }];
  const [called, setCalled] = useState<number | null>(null);
  return (<CodeToggle code={`// Tool Calling 工具调用\n// AI 决定调用哪个外部函数\n// 格式: { name: "get_weather", args: {city: "北京"} }\n// AI 不直接执行，而是告诉系统「我要调这个」`}>
    <div className="space-y-1">{tools.map((t, i) => <div key={i} onClick={() => setCalled(i)} className="flex items-center gap-2 px-2 py-1.5 rounded-[6px] border cursor-pointer transition-all" style={{ borderColor: called === i ? p.accent : p.border, backgroundColor: called === i ? p.accentBg : p.surface }}><span className="text-[9px] font-mono" style={{ color: called === i ? p.accent : p.textMuted }}>{t.name}()</span><span className="text-[8px]" style={{ color: p.textFaint }}>{t.desc}</span>{called === i && <span className="ml-auto text-[8px]" style={{ color: "#5f8a6b" }}>✓ 已调用</span>}</div>)}</div>
  </CodeToggle>);
}

export function WorkflowDemo() {
  const p = usePalette();
  const nodes = ["输入", "分类", "处理", "输出"];
  const [active, setActive] = useState(-1);
  const run = () => { setActive(0); nodes.forEach((_, i) => setTimeout(() => setActive(i), i * 500)); };
  return (<CodeToggle code={`// Workflow 工作流\n// 多步骤自动化流程\n// 节点 + 边 = 有向图 (DAG)\n// 可并行、可条件分支\n// 工具: n8n, Temporal, LangGraph`}>
    <button onClick={run} className="mb-2 px-3 py-1 rounded-[5px] text-[10px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>执行工作流</button>
    <div className="flex items-center gap-0.5">{nodes.map((n, i) => <span key={i} className="flex items-center"><span className="px-1.5 py-1 rounded-[4px] text-[8px] transition-all" style={{ backgroundColor: i <= active ? p.accent : p.surface, color: i <= active ? "#fff" : p.textFaint }}>{n}</span>{i < nodes.length - 1 && <Arrow p={p}/>}</span>)}</div>
  </CodeToggle>);
}

export function ChainOfThoughtDemo() {
  const p = usePalette();
  const [show, setShow] = useState(false);
  return (<CodeToggle code={`// Chain of Thought 思维链\n// 让 AI 展示推理步骤\n// "Let's think step by step"\n// 复杂问题准确率提升 40%+\n// 变体: Tree of Thought, Graph of Thought`}>
    <div className="text-[10px] mb-2" style={{ color: p.textMuted }}>问: 如果 3 只猫 3 分钟抓 3 只老鼠，100 只猫抓 100 只老鼠要几分钟？</div>
    <button onClick={() => setShow(!show)} className="mb-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>{show ? "隐藏" : "显示"}推理过程</button>
    {show && <div className="space-y-1 text-[9px] pl-2 border-l-2" style={{ borderColor: p.accent, color: p.textMuted }}><div>1. 3猫3分钟抓3鼠 → 1猫3分钟抓1鼠</div><div>2. 所以1猫抓1鼠需要3分钟</div><div>3. 100猫同时工作，各抓1鼠</div><div>4. 答案: <span style={{ color: p.accent, fontWeight: 600 }}>3分钟</span></div></div>}
  </CodeToggle>);
}

export function MemoryDemo() {
  const p = usePalette();
  const [memories, setMemories] = useState(["用户喜欢 React", "项目用 TypeScript"]);
  const add = () => setMemories(m => [...m, `记忆 #${m.length + 1}`]);
  return (<CodeToggle code={`// AI 记忆系统\n// 短期: 当前对话上下文\n// 长期: 跨会话持久化\n// 实现: 向量数据库存储 + 检索\n// 让 AI 「记住」用户偏好`}>
    <button onClick={add} className="mb-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>+ 存储记忆</button>
    <div className="space-y-1">{memories.map((m, i) => <div key={i} className="flex items-center gap-1 text-[9px] px-1.5 py-1 rounded-[4px]" style={{ backgroundColor: p.surface, color: p.textMuted }}>🧠 {m}</div>)}</div>
  </CodeToggle>);
}

export function MultiAgentDemo() {
  const p = usePalette();
  const agents = ["🔍 研究员", "✍️ 写手", "🔎 审核员"];
  const [msg, setMsg] = useState(0);
  return (<CodeToggle code={`// 多智能体协作\n// 多个 AI Agent 各司其职\n// 研究员 → 写手 → 审核员\n// 框架: AutoGen, CrewAI, MetaGPT\n// 优势: 分工明确，质量更高`}>
    <button onClick={() => setMsg(m => (m + 1) % 4)} className="mb-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>下一步</button>
    <div className="flex items-center gap-1 justify-center">{agents.map((a, i) => <span key={i} className="flex items-center"><span className="px-1.5 py-1 rounded-[4px] text-[8px] transition-all" style={{ backgroundColor: i === msg % 3 ? p.accentBg : p.surface, color: i === msg % 3 ? p.accent : p.textFaint, borderColor: i === msg % 3 ? p.accent : p.border, border: "1px solid" }}>{a}</span>{i < 2 && <Arrow p={p}/>}</span>)}</div>
  </CodeToggle>);
}

export function OrchestrationDemo() {
  const p = usePalette();
  return (<CodeToggle code={`// 编排 Orchestration\n// 协调多个服务/Agent 的执行顺序\n// 模式: 顺序、并行、条件、循环\n// 工具: LangGraph, Temporal, Airflow\n// 处理: 错误重试、超时、回滚`}>
    <div className="flex flex-col items-center gap-1 text-[9px]">
      <Box highlight p={p}>开始</Box><Arrow p={p} />
      <div className="flex gap-2"><Box p={p}>任务A</Box><Box p={p}>任务B</Box></div>
      <span style={{ color: p.textFaint }}>↓ 并行执行 ↓</span>
      <Box highlight p={p}>合并结果</Box>
    </div>
  </CodeToggle>);
}

export function GroundingDemo() {
  const p = usePalette();
  const [grounded, setGrounded] = useState(true);
  return (<CodeToggle code={`// Grounding 接地\n// 让 AI 回答基于真实数据\n// 而非凭空生成\n// 方法: RAG、搜索、数据库查询\n// 减少幻觉的核心手段`}>
    <div className="flex gap-1 mb-2"><MiniBtn active={grounded} onClick={() => setGrounded(true)} p={p}>✓ 接地</MiniBtn><MiniBtn active={!grounded} onClick={() => setGrounded(false)} p={p}>✗ 无接地</MiniBtn></div>
    <div className="rounded-[6px] border p-2 text-[9px]" style={{ borderColor: p.border, backgroundColor: p.surface }}>
      <div style={{ color: p.textMuted }}>AI 回答: "React 最新版本是 19.1"</div>
      <div className="mt-1" style={{ color: grounded ? "#5f8a6b" : "#b85c4a" }}>{grounded ? "✓ 来源: npm registry (2024-12)" : "✗ 无来源，可能是幻觉"}</div>
    </div>
  </CodeToggle>);
}

export function SandboxDemo() {
  const p = usePalette();
  const [running, setRunning] = useState(false);
  return (<CodeToggle code={`// 沙箱 Sandbox\n// 隔离的执行环境\n// AI 生成的代码在沙箱中运行\n// 不影响宿主系统\n// 工具: Docker, Firecracker, WASM`}>
    <button onClick={() => { setRunning(true); setTimeout(() => setRunning(false), 1500); }} className="mb-2 px-3 py-1 rounded-[5px] text-[10px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>在沙箱中执行代码</button>
    <div className="rounded-[6px] border p-2 font-mono text-[9px] border-dashed" style={{ borderColor: p.accent + "40", backgroundColor: p.codeBg, color: p.textMuted }}>
      <div style={{ color: p.textFaint }}>┌─── sandbox ───┐</div>
      <div>{running ? "▶ console.log('safe!')" : "  (idle)"}</div>
      <div style={{ color: running ? "#5f8a6b" : p.textFaint }}>{running ? "  → safe!" : "└───────────────┘"}</div>
      {!running && <div style={{ color: p.textFaint }}>└───────────────┘</div>}
    </div>
  </CodeToggle>);
}

export function GuardrailsDemo() {
  const p = usePalette();
  const [input, setInput] = useState("正常问题");
  const blocked = input.includes("hack") || input.includes("攻击");
  return (<CodeToggle code={`// Guardrails 护栏\n// 过滤不安全/不合规的输入输出\n// 输入检查: 注入攻击、敏感词\n// 输出检查: 有害内容、隐私泄露\n// 工具: NeMo Guardrails, Guardrails AI`}>
    <div className="flex gap-1 mb-2">{["正常问题", "hack系统", "帮我写代码"].map(t => <MiniBtn key={t} onClick={() => setInput(t)} p={p}>{t}</MiniBtn>)}</div>
    <div className="flex items-center gap-1 text-[9px]"><Box p={p}>用户: {input}</Box><Arrow p={p}/><span style={{ color: blocked ? "#b85c4a" : "#5f8a6b" }}>{blocked ? "🚫 拦截" : "✓ 通过"}</span><Arrow p={p}/><Box highlight={!blocked} p={p}>AI</Box></div>
  </CodeToggle>);
}

export function PlanningDemo() {
  const p = usePalette();
  const tasks = ["分析需求", "设计方案", "编写代码", "测试验证"];
  const [done, setDone] = useState(0);
  return (<CodeToggle code={`// Planning 规划\n// Agent 先制定计划再执行\n// 分解复杂任务为子步骤\n// 可动态调整计划\n// ReAct: Reasoning + Acting 交替`}>
    <button onClick={() => setDone(d => d < tasks.length ? d + 1 : 0)} className="mb-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>执行下一步</button>
    <div className="space-y-1">{tasks.map((t, i) => <div key={i} className="flex items-center gap-2 text-[9px]" style={{ color: i < done ? p.text : p.textFaint }}><span>{i < done ? "✅" : i === done ? "⏳" : "⬜"}</span>{t}</div>)}</div>
  </CodeToggle>);
}

export function ReflectionDemo() {
  const p = usePalette();
  const [round, setRound] = useState(0);
  const outputs = ["初稿: 有3个bug", "反思: 发现边界情况", "修正: 修复完成 ✓"];
  return (<CodeToggle code={`// Reflection 反思\n// Agent 自我审查输出质量\n// 循环: 生成 → 检查 → 改进\n// 类似人类「写完检查一遍」\n// 提升: 代码正确率 +30%`}>
    <button onClick={() => setRound(r => r < 2 ? r + 1 : 0)} className="mb-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>下一轮</button>
    <div className="space-y-1">{outputs.slice(0, round + 1).map((o, i) => <div key={i} className="text-[9px] px-1.5 py-1 rounded-[4px]" style={{ backgroundColor: i === round ? p.accentBg : p.surface, color: i === round ? p.accent : p.textMuted }}>Round {i + 1}: {o}</div>)}</div>
  </CodeToggle>);
}

export function HumanInLoopDemo() {
  const p = usePalette();
  const [approved, setApproved] = useState<boolean | null>(null);
  return (<CodeToggle code={`// Human-in-the-Loop 人机协作\n// AI 做初稿，人类审批\n// 关键操作需要人工确认\n// 平衡: 效率 vs 安全\n// 适用: 代码合并、邮件发送、付款`}>
    <div className="rounded-[6px] border p-2 space-y-2" style={{ borderColor: p.border }}>
      <div className="text-[9px]" style={{ color: p.textMuted }}>AI 建议: 删除 utils.ts 中未使用的函数</div>
      {approved === null ? <div className="flex gap-1"><button onClick={() => setApproved(true)} className="px-2 py-1 rounded-[4px] text-[9px] cursor-pointer" style={{ backgroundColor: "#5f8a6b", color: "#fff" }}>✓ 批准</button><button onClick={() => setApproved(false)} className="px-2 py-1 rounded-[4px] text-[9px] cursor-pointer" style={{ backgroundColor: "#b85c4a", color: "#fff" }}>✗ 拒绝</button></div> : <div className="text-[9px]" style={{ color: approved ? "#5f8a6b" : "#b85c4a" }}>{approved ? "✓ 已批准执行" : "✗ 已拒绝，AI 将重新规划"}</div>}
    </div>
  </CodeToggle>);
}

export function AutonomyDemo() {
  const p = usePalette();
  const [level, setLevel] = useState(2);
  const levels = ["仅建议", "需确认", "半自主", "全自主"];
  return (<CodeToggle code={`// 自主性 Autonomy\n// Level 0: AI 只建议，人操作\n// Level 1: AI 执行需确认\n// Level 2: AI 自主，异常时问人\n// Level 3: 完全自主 (危险!)`}>
    <input type="range" min={0} max={3} value={level} onChange={e => setLevel(+e.target.value)} className="w-full mb-1" />
    <div className="flex justify-between text-[8px]" style={{ color: p.textFaint }}>{levels.map((l, i) => <span key={i} style={{ color: i === level ? p.accent : p.textFaint }}>{l}</span>)}</div>
    <div className="mt-2 text-[9px] text-center" style={{ color: level >= 3 ? "#b85c4a" : p.textMuted }}>{level >= 3 ? "⚠️ 高风险！建议限制权限" : `当前: ${levels[level]}`}</div>
  </CodeToggle>);
}

export function SubagentDemo() {
  const p = usePalette();
  return (<CodeToggle code={`// 子智能体 Subagent\n// 主 Agent 委派子任务给子 Agent\n// 每个子 Agent 有专门能力\n// 类似: 经理 → 员工\n// 优势: 并行、专业、隔离`}>
    <div className="flex flex-col items-center gap-1 text-[9px]">
      <Box highlight p={p}>🎯 主 Agent</Box>
      <div className="flex gap-2 mt-1"><Box p={p}>📝 写代码</Box><Box p={p}>🧪 跑测试</Box><Box p={p}>📖 查文档</Box></div>
    </div>
  </CodeToggle>);
}

export function LongRunningDemo() {
  const p = usePalette();
  const [progress, setProgress] = useState(0);
  useEffect(() => { if (progress > 0 && progress < 100) { const t = setTimeout(() => setProgress(p => p + 5), 200); return () => clearTimeout(t); } }, [progress]);
  return (<CodeToggle code={`// 长任务 Long-running Task\n// 执行时间 > 几分钟的任务\n// 需要: 进度反馈、断点续传、超时处理\n// 模式: 异步 + 轮询/WebSocket 通知\n// 例: 训练模型、大批量处理`}>
    <button onClick={() => setProgress(1)} disabled={progress > 0 && progress < 100} className="mb-2 px-3 py-1 rounded-[5px] text-[10px] border cursor-pointer disabled:opacity-40" style={{ borderColor: p.accentBorder, color: p.accent }}>{progress === 100 ? "重新运行" : progress > 0 ? "运行中..." : "启动长任务"}</button>
    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: p.surface }}><div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: p.accent }} /></div>
    <div className="mt-1 text-[9px] text-center" style={{ color: p.textFaint }}>{progress}% {progress === 100 ? "✓ 完成" : progress > 0 ? "处理中..." : ""}</div>
  </CodeToggle>);
}

export function AgenticCodingDemo() {
  const p = usePalette();
  const [step, setStep] = useState(0);
  const steps = ["读取文件", "分析代码", "生成修改", "应用 diff", "运行测试"];
  return (<CodeToggle code={`// Agentic Coding\n// AI 像程序员一样工作:\n// 读代码 → 理解 → 修改 → 测试\n// 不只是补全，而是完成整个任务\n// 工具: Cursor, Cline, Aider`}>
    <button onClick={() => setStep(s => s < steps.length ? s + 1 : 0)} className="mb-2 px-2 py-1 rounded-[4px] text-[9px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>下一步</button>
    <div className="space-y-0.5">{steps.map((s, i) => <div key={i} className="flex items-center gap-1.5 text-[9px]" style={{ color: i < step ? p.text : p.textFaint }}><span className="font-mono">{i < step ? "✓" : i === step ? "▶" : " "}</span><span className="font-mono">{s}</span></div>)}</div>
  </CodeToggle>);
}

export function AgentMemoryDemo() {
  const p = usePalette();
  const [mems, setMems] = useState([{ type: "short", text: "当前对话上下文" }, { type: "long", text: "用户偏好: 喜欢简洁代码" }]);
  return (<CodeToggle code={`// Agent 记忆\n// 短期: 当前会话上下文窗口\n// 长期: 持久化到数据库\n// 工作记忆: 当前任务的中间结果\n// 实现: 向量DB + 摘要压缩`}>
    <div className="space-y-1">{mems.map((m, i) => <div key={i} className="flex items-center gap-1.5 text-[9px] px-1.5 py-1 rounded-[4px]" style={{ backgroundColor: m.type === "short" ? p.accentBg : p.surface, color: m.type === "short" ? p.accent : p.textMuted }}><Tag p={p}>{m.type === "short" ? "短期" : "长期"}</Tag>{m.text}</div>)}</div>
  </CodeToggle>);
}

export const aiDemos: Record<string, React.ComponentType> = {
  "llm-demo": LlmDemo, "prompt-demo": PromptDemo, "context-window-demo": ContextWindowDemo,
  "temperature-demo": TemperatureDemo, "hallucination-demo": HallucinationDemo,
  "rag-demo": RagDemo, "embedding-demo": EmbeddingDemo, "fine-tuning-demo": FineTuningDemo,
  "multimodal-demo": MultimodalDemo, "streaming-demo": StreamingDemo,
  "context-engineering-demo": ContextEngineeringDemo, "mcp-demo": McpDemo,
  "knowledge-base-demo": KnowledgeBaseDemo, "inference-demo": InferenceDemo,
  "training-demo": TrainingDemo, "open-source-model-demo": OpenSourceModelDemo,
  "api-key-demo": ApiKeyDemo, "parameters-demo": ParametersDemo,
  "agent-demo": AgentDemo, "tool-calling-demo": ToolCallingDemo,
  "workflow-demo": WorkflowDemo, "chain-of-thought-demo": ChainOfThoughtDemo,
  "memory-demo": MemoryDemo, "multi-agent-demo": MultiAgentDemo,
  "orchestration-demo": OrchestrationDemo, "grounding-demo": GroundingDemo,
  "sandbox-demo": SandboxDemo, "guardrails-demo": GuardrailsDemo,
  "planning-demo": PlanningDemo, "reflection-demo": ReflectionDemo,
  "human-in-loop-demo": HumanInLoopDemo, "autonomy-demo": AutonomyDemo,
  "subagent-demo": SubagentDemo, "long-running-demo": LongRunningDemo,
  "agentic-coding-demo": AgenticCodingDemo, "agent-memory-demo": AgentMemoryDemo,
};
