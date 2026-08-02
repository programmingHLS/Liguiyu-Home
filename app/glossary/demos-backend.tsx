"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePalette, CodeToggle, MiniBtn, Tag, Arrow, Box } from "./demo-shared";

export function ServerDemo() {
  const p = usePalette();
  const [req, setReq] = useState(0);
  return (<CodeToggle code={`// 服务器处理请求\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, {'Content-Type': 'text/html'});\n  res.end('<h1>Hello World</h1>');\n});\nserver.listen(3000);`}>
    <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 发送请求观察服务器响应</p>
    <button onClick={() => setReq(r => r + 1)} className="mb-2 px-3 py-1 rounded-[5px] text-[10px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>发送请求 #{req + 1}</button>
    <div className="flex items-center gap-1 text-[9px]"><Box p={p}>🌐 浏览器</Box><Arrow p={p}/><span style={{ color: p.accent }}>GET /</span><Arrow p={p}/><Box highlight p={p}>🖥️ Server:3000</Box><Arrow p={p}/><span style={{ color: "#5f8a6b" }}>200 OK</span></div>
    <div className="mt-1.5 text-[9px] font-mono" style={{ color: p.textFaint }}>已处理 {req} 个请求</div>
  </CodeToggle>);
}

export function HttpDemo() {
  const p = usePalette();
  const [method, setMethod] = useState("GET");
  const methods = ["GET", "POST", "PUT", "DELETE"];
  const colors: Record<string, string> = { GET: "#5f8a6b", POST: "#4a7fb5", PUT: "#d4a03c", DELETE: "#b85c4a" };
  return (<CodeToggle code={`// HTTP 方法\nGET    /users      → 获取列表\nPOST   /users      → 创建用户\nPUT    /users/1    → 更新用户\nDELETE /users/1    → 删除用户`}>
    <div className="flex gap-1 mb-2">{methods.map(m => <button key={m} onClick={() => setMethod(m)} className="px-2 py-1 rounded-[4px] text-[9px] font-mono font-bold cursor-pointer border transition-all" style={{ borderColor: method === m ? colors[m] : p.border, backgroundColor: method === m ? colors[m] + "20" : "transparent", color: method === m ? colors[m] : p.textFaint }}>{m}</button>)}</div>
    <div className="rounded-[6px] border p-2 font-mono text-[9px]" style={{ borderColor: p.border, backgroundColor: p.codeBg }}><span style={{ color: colors[method] }}>{method}</span> <span style={{ color: p.textMuted }}>/api/users{method !== "GET" ? "/1" : ""}</span></div>
  </CodeToggle>);
}

export function RestDemo() {
  const p = usePalette();
  const endpoints = [{ m: "GET", path: "/users", desc: "列表" }, { m: "GET", path: "/users/:id", desc: "详情" }, { m: "POST", path: "/users", desc: "创建" }, { m: "PUT", path: "/users/:id", desc: "更新" }, { m: "DELETE", path: "/users/:id", desc: "删除" }];
  return (<CodeToggle code={`// RESTful 设计原则\n// 资源用名词，操作用 HTTP 方法\n// /users (集合) vs /users/1 (单个)\n// 无状态、统一接口、分层系统`}>
    <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>RESTful API 端点设计</p>
    <div className="space-y-1">{endpoints.map((e, i) => <div key={i} className="flex items-center gap-2 text-[9px] font-mono"><Tag color={e.m === "GET" ? "#5f8a6b" : e.m === "POST" ? "#4a7fb5" : e.m === "DELETE" ? "#b85c4a" : "#d4a03c"} p={p}>{e.m}</Tag><span style={{ color: p.textMuted }}>{e.path}</span><span style={{ color: p.textFaint }}>— {e.desc}</span></div>)}</div>
  </CodeToggle>);
}

export function JsonDemo() {
  const p = usePalette();
  const [expanded, setExpanded] = useState(true);
  return (<CodeToggle code={`// JSON 格式\n{\n  "name": "张三",\n  "age": 25,\n  "skills": ["JS", "React"],\n  "active": true\n}`}>
    <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 点击展开/折叠 JSON 树</p>
    <div className="rounded-[6px] border p-2 font-mono text-[9px] cursor-pointer" style={{ borderColor: p.border, backgroundColor: p.codeBg }} onClick={() => setExpanded(!expanded)}>
      <div style={{ color: p.textMuted }}>{"{"}</div>
      {expanded && <><div className="pl-3"><span style={{ color: p.accent }}>"name"</span>: <span style={{ color: "#5f8a6b" }}>"张三"</span>,</div><div className="pl-3"><span style={{ color: p.accent }}>"age"</span>: <span style={{ color: "#d4a03c" }}>25</span>,</div><div className="pl-3"><span style={{ color: p.accent }}>"skills"</span>: [<span style={{ color: "#5f8a6b" }}>"JS"</span>, <span style={{ color: "#5f8a6b" }}>"React"</span>],</div><div className="pl-3"><span style={{ color: p.accent }}>"active"</span>: <span style={{ color: "#4a7fb5" }}>true</span></div></>}
      <div style={{ color: p.textMuted }}>{"}"}</div>
    </div>
  </CodeToggle>);
}

export function AuthDemo() {
  const p = usePalette();
  const [step, setStep] = useState(0);
  const steps = ["输入账号密码", "服务器验证", "返回 Token", "后续请求带 Token"];
  return (<CodeToggle code={`// 认证流程\n1. POST /login {user, pass}\n2. Server 验证 → 生成 JWT\n3. Client 存储 Token\n4. 每次请求: Authorization: Bearer <token>`}>
    <div className="space-y-1">{steps.map((s, i) => <div key={i} onClick={() => setStep(i)} className="flex items-center gap-2 text-[9px] cursor-pointer px-1.5 py-1 rounded-[4px] transition-all" style={{ backgroundColor: i === step ? p.accentBg : "transparent", color: i <= step ? p.text : p.textFaint }}><span>{i < step ? "✓" : i === step ? "▶" : "○"}</span>{s}</div>)}</div>
  </CodeToggle>);
}

export function TokenDemo() {
  const p = usePalette();
  const parts = [{ label: "Header", color: "#b85c4a", content: '{"alg":"HS256"}' }, { label: "Payload", color: "#d4a03c", content: '{"userId":1,"exp":...}' }, { label: "Signature", color: "#5f8a6b", content: "HMACSHA256(...)" }];
  const [active, setActive] = useState(0);
  return (<CodeToggle code={`// JWT = Header.Payload.Signature\n// Base64 编码，用 . 连接\n// Header: 算法类型\n// Payload: 用户数据\n// Signature: 防篡改签名`}>
    <div className="flex gap-0.5 mb-2">{parts.map((pt, i) => <button key={i} onClick={() => setActive(i)} className="flex-1 py-1 rounded-[4px] text-[8px] font-mono cursor-pointer transition-all" style={{ backgroundColor: active === i ? pt.color : p.surface, color: active === i ? "#fff" : p.textFaint }}>{pt.label}</button>)}</div>
    <div className="rounded-[6px] border p-2 font-mono text-[9px]" style={{ borderColor: parts[active].color + "40", backgroundColor: p.codeBg, color: p.textMuted }}>{parts[active].content}</div>
  </CodeToggle>);
}

export function CacheDemo() {
  const p = usePalette();
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [cache, setCache] = useState<Record<string, string>>({});
  const query = (key: string) => { if (cache[key]) { setHits(h => h + 1); } else { setCache(c => ({ ...c, [key]: `data_${Date.now()}` })); setMisses(m => m + 1); } };
  return (<CodeToggle code={`// 缓存策略\nconst cache = new Map();\nfunction get(key) {\n  if (cache.has(key)) return cache.get(key); // HIT\n  const data = fetchFromDB(key);             // MISS\n  cache.set(key, data);\n  return data;\n}`}>
    <div className="flex gap-1 mb-2">{["user:1", "user:2", "user:1"].map((k, i) => <MiniBtn key={i} onClick={() => query(k)} p={p}>查 {k}</MiniBtn>)}</div>
    <div className="flex gap-3 text-[9px] font-mono"><span style={{ color: "#5f8a6b" }}>HIT: {hits}</span><span style={{ color: "#b85c4a" }}>MISS: {misses}</span><span style={{ color: p.textFaint }}>缓存: {Object.keys(cache).length} 条</span></div>
  </CodeToggle>);
}

export function MiddlewareDemo() {
  const p = usePalette();
  const [step, setStep] = useState(-1);
  const mws = ["Logger", "Auth", "RateLimit", "Handler"];
  useEffect(() => { if (step >= 0 && step < mws.length) { const t = setTimeout(() => setStep(s => s + 1), 500); return () => clearTimeout(t); } }, [step]);
  return (<CodeToggle code={`// 中间件管道模式\napp.use(logger);      // 记录日志\napp.use(auth);        // 验证身份\napp.use(rateLimit);   // 限流\napp.get('/', handler);// 业务逻辑\n// 请求依次通过每个中间件`}>
    <button onClick={() => setStep(0)} className="mb-2 px-3 py-1 rounded-[5px] text-[10px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>发送请求</button>
    <div className="flex items-center gap-0.5 flex-wrap">{mws.map((m, i) => <span key={i} className="flex items-center"><span className="px-1.5 py-1 rounded-[4px] text-[9px] transition-all" style={{ backgroundColor: i <= step ? p.accent : p.surface, color: i <= step ? "#fff" : p.textFaint }}>{m}</span>{i < mws.length - 1 && <Arrow p={p}/>}</span>)}</div>
  </CodeToggle>);
}

export function WebhookDemo() {
  const p = usePalette();
  const [events, setEvents] = useState<string[]>([]);
  const trigger = (e: string) => setEvents(prev => [...prev.slice(-4), e]);
  return (<CodeToggle code={`// Webhook = 事件驱动的 HTTP 回调\n// 当某事发生时，主动 POST 到你的 URL\n// 例: GitHub push → 触发 CI/CD\n// 例: Stripe 付款 → 通知你的服务器`}>
    <div className="flex gap-1 mb-2">{["push", "payment", "signup"].map(e => <MiniBtn key={e} onClick={() => trigger(e)} p={p}>触发: {e}</MiniBtn>)}</div>
    <div className="space-y-0.5 font-mono text-[9px]">{events.map((e, i) => <div key={i} className="flex items-center gap-1" style={{ color: p.textMuted }}><Tag p={p}>POST</Tag> /webhook → <span style={{ color: "#5f8a6b" }}>{e} ✓</span></div>)}</div>
  </CodeToggle>);
}

export function CorsDemo() {
  const p = usePalette();
  const [allowed, setAllowed] = useState(true);
  return (<CodeToggle code={`// CORS 跨域资源共享\n// 浏览器安全策略：不同域名不能互访\n// 服务器设置 Access-Control-Allow-Origin\n// 允许指定域名访问 API`}>
    <div className="flex gap-1 mb-2"><MiniBtn active={allowed} onClick={() => setAllowed(true)} p={p}>✓ 允许跨域</MiniBtn><MiniBtn active={!allowed} onClick={() => setAllowed(false)} p={p}>✗ 拒绝跨域</MiniBtn></div>
    <div className="flex items-center gap-1 text-[9px]"><Box p={p}>🌐 a.com</Box><Arrow p={p}/><span style={{ color: allowed ? "#5f8a6b" : "#b85c4a" }}>{allowed ? "OPTIONS preflight ✓" : "OPTIONS → 403 ✗"}</span><Arrow p={p}/><Box highlight={allowed} p={p}>🖥️ api.b.com</Box></div>
  </CodeToggle>);
}

export function SqlDemo() {
  const p = usePalette();
  const [query, setQuery] = useState("SELECT * FROM users WHERE age > 20");
  const results = query.includes("WHERE") ? [{ name: "Li", age: 25 }, { name: "Wang", age: 30 }] : [{ name: "Li", age: 25 }, { name: "Wang", age: 30 }, { name: "Zhang", age: 18 }];
  return (<CodeToggle code={`-- SQL 查询语言\nSELECT name, age FROM users\nWHERE age > 20\nORDER BY age DESC\nLIMIT 10;\n\n-- CRUD: INSERT, SELECT, UPDATE, DELETE`}>
    <div className="flex gap-1 mb-2 flex-wrap">{["SELECT *", "WHERE age>20", "ORDER BY"].map(q => <MiniBtn key={q} onClick={() => setQuery(q === "SELECT *" ? "SELECT * FROM users" : query + " " + q)} p={p}>{q}</MiniBtn>)}</div>
    <div className="rounded-[6px] border overflow-hidden text-[9px] font-mono" style={{ borderColor: p.border }}>
      <div className="grid grid-cols-2 px-2 py-1 border-b" style={{ borderColor: p.border, backgroundColor: p.surface, color: p.textMuted }}><span>name</span><span>age</span></div>
      {results.map((r, i) => <div key={i} className="grid grid-cols-2 px-2 py-1 border-b last:border-0" style={{ borderColor: p.border, color: p.textMuted }}><span>{r.name}</span><span>{r.age}</span></div>)}
    </div>
  </CodeToggle>);
}

export function NosqlDemo() {
  const p = usePalette();
  const docs = [{ _id: "1", name: "Li", tags: ["dev"] }, { _id: "2", name: "Wang", tags: ["design", "dev"] }];
  return (<CodeToggle code={`// NoSQL 文档数据库 (MongoDB)\ndb.users.insertOne({\n  name: "Li",\n  tags: ["dev", "react"],\n  profile: { age: 25 }  // 嵌套结构\n})\n// 无需预定义 schema，灵活扩展`}>
    <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>文档型存储——每条记录结构可以不同</p>
    <div className="space-y-1.5">{docs.map((d, i) => <div key={i} className="rounded-[6px] border p-1.5 font-mono text-[9px]" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}>{"{"} _id: "{d._id}", name: "{d.name}", tags: [{d.tags.map(t => `"${t}"`).join(", ")}] {"}"}</div>)}</div>
  </CodeToggle>);
}

export function CookieDemo() {
  const p = usePalette();
  const [cookies, setCookies] = useState<Record<string, string>>({});
  const set = (k: string, v: string) => setCookies(c => ({ ...c, [k]: v }));
  return (<CodeToggle code={`// Cookie 操作\ndocument.cookie = "theme=dark; max-age=86400; path=/";\n// 每次请求自动携带 Cookie\n// 适合存: 偏好设置、登录状态\n// 限制: 4KB, 同域`}>
    <div className="flex gap-1 mb-2 flex-wrap">{[["theme", "dark"], ["lang", "zh"], ["theme", "light"]].map(([k, v], i) => <MiniBtn key={i} onClick={() => set(k, v)} p={p}>set {k}={v}</MiniBtn>)}</div>
    <div className="rounded-[6px] border p-2 font-mono text-[9px] space-y-0.5" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}>{Object.entries(cookies).length === 0 ? "（空）" : Object.entries(cookies).map(([k, v]) => <div key={k}>🍪 {k} = {v}</div>)}</div>
  </CodeToggle>);
}

export function SessionDemo() {
  const p = usePalette();
  const [active, setActive] = useState(true);
  return (<CodeToggle code={`// Session 会话管理\n// 服务器存储用户状态\n// Client 只持有一个 sessionID\n// 比 Cookie 更安全（数据在服务端）`}>
    <div className="flex gap-1 mb-2"><MiniBtn active={active} onClick={() => setActive(true)} p={p}>活跃会话</MiniBtn><MiniBtn active={!active} onClick={() => setActive(false)} p={p}>过期</MiniBtn></div>
    <div className="rounded-[6px] border p-2 text-[9px] space-y-1" style={{ borderColor: active ? "#5f8a6b40" : "#b85c4a40", backgroundColor: p.surface }}>
      <div style={{ color: p.textMuted }}>SessionID: <span className="font-mono">{active ? "abc123..." : "（已失效）"}</span></div>
      <div style={{ color: active ? "#5f8a6b" : "#b85c4a" }}>{active ? "✓ 有效 — 用户已登录" : "✗ 过期 — 需重新登录"}</div>
    </div>
  </CodeToggle>);
}

export function StatusCodeDemo() {
  const p = usePalette();
  const codes = [{ code: 200, label: "OK", color: "#5f8a6b" }, { code: 301, label: "Moved", color: "#4a7fb5" }, { code: 404, label: "Not Found", color: "#d4a03c" }, { code: 500, label: "Error", color: "#b85c4a" }];
  const [sel, setSel] = useState(0);
  return (<CodeToggle code={`// HTTP 状态码分类\n2xx — 成功 (200 OK, 201 Created)\n3xx — 重定向 (301, 302, 304)\n4xx — 客户端错误 (400, 401, 403, 404)\n5xx — 服务器错误 (500, 502, 503)`}>
    <div className="flex gap-1 mb-2">{codes.map((c, i) => <button key={i} onClick={() => setSel(i)} className="px-2 py-1 rounded-[4px] text-[9px] font-mono font-bold cursor-pointer border transition-all" style={{ borderColor: sel === i ? c.color : p.border, color: sel === i ? c.color : p.textFaint }}>{c.code}</button>)}</div>
    <div className="text-[10px] text-center" style={{ color: codes[sel].color }}>{codes[sel].code} {codes[sel].label}</div>
  </CodeToggle>);
}

export function ConcurrencyDemo() {
  const p = usePalette();
  const [n, setN] = useState(1);
  return (<CodeToggle code={`// 并发 = 同时处理多个请求\n// Node.js: 事件循环 + 异步 I/O\n// 单线程也能处理万级并发\n// 瓶颈在 CPU 密集型任务`}>
    <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 调整并发数</p>
    <input type="range" min={1} max={8} value={n} onChange={e => setN(+e.target.value)} className="w-full mb-2" />
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.min(n, 4)}, 1fr)` }}>{Array.from({ length: n }, (_, i) => <div key={i} className="h-6 rounded-[4px] border flex items-center justify-center text-[8px] animate-pulse" style={{ borderColor: p.accent + "40", backgroundColor: p.accentBg, color: p.accent, animationDelay: `${i * 100}ms` }}>req-{i + 1}</div>)}</div>
  </CodeToggle>);
}

export function LoadBalancingDemo() {
  const p = usePalette();
  const [reqs, setReqs] = useState([0, 0, 0]);
  const send = () => setReqs(r => { const i = r.indexOf(Math.min(...r)); const n = [...r]; n[i]++; return n; });
  return (<CodeToggle code={`// 负载均衡\n// 将请求分发到多台服务器\n// 策略: Round Robin / 最少连接 / IP Hash\n// 工具: Nginx, HAProxy, Cloudflare`}>
    <button onClick={send} className="mb-2 px-3 py-1 rounded-[5px] text-[10px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>发送请求</button>
    <div className="flex gap-2 justify-center">{reqs.map((r, i) => <div key={i} className="text-center"><div className="w-10 h-10 rounded-[6px] border flex items-center justify-center text-[12px] font-bold" style={{ borderColor: p.border, backgroundColor: p.surface, color: p.accent }}>{r}</div><div className="text-[8px] mt-0.5" style={{ color: p.textFaint }}>Server {i + 1}</div></div>)}</div>
  </CodeToggle>);
}

export function ReverseProxyDemo() {
  const p = usePalette();
  return (<CodeToggle code={`# Nginx 反向代理配置\nlocation /api {\n  proxy_pass http://backend:3000;\n}\nlocation / {\n  proxy_pass http://frontend:8080;\n}\n# 对外只暴露 80/443 端口`}>
    <div className="flex items-center gap-1 text-[9px] flex-wrap"><Box p={p}>🌐 用户</Box><Arrow p={p}/><Box highlight p={p}>🔀 Nginx :80</Box><Arrow p={p}/><div className="space-y-1"><Box p={p}>/api → :3000</Box><Box p={p}>/ → :8080</Box></div></div>
  </CodeToggle>);
}

export function RateLimitDemo() {
  const p = usePalette();
  const [count, setCount] = useState(0);
  const limit = 5;
  const blocked = count >= limit;
  return (<CodeToggle code={`// 限流: 防止滥用 API\n// 令牌桶 / 滑动窗口\nrateLimit({ windowMs: 60000, max: 100 })\n// 超过限制返回 429 Too Many Requests`}>
    <button onClick={() => !blocked && setCount(c => c + 1)} disabled={blocked} className="mb-2 px-3 py-1 rounded-[5px] text-[10px] border cursor-pointer disabled:opacity-40" style={{ borderColor: p.accentBorder, color: p.accent }}>请求 ({count}/{limit})</button>
    <MiniBtn onClick={() => setCount(0)} p={p}>重置</MiniBtn>
    <div className="mt-2 flex gap-0.5">{Array.from({ length: limit }, (_, i) => <div key={i} className="w-4 h-4 rounded-[3px]" style={{ backgroundColor: i < count ? (blocked ? "#b85c4a" : p.accent) : p.surface }} />)}</div>
    {blocked && <div className="mt-1 text-[9px]" style={{ color: "#b85c4a" }}>429 Too Many Requests</div>}
  </CodeToggle>);
}

export function TimeoutDemo() {
  const p = usePalette();
  const [ms, setMs] = useState(3000);
  const [result, setResult] = useState("");
  const test = () => { setResult("waiting"); setTimeout(() => setResult(ms > 2000 ? "⏰ 超时！" : "✅ 成功"), ms > 2000 ? 2000 : ms); };
  return (<CodeToggle code={`// 超时设置\nfetch(url, { signal: AbortSignal.timeout(5000) })\n// 或 axios: { timeout: 5000 }\n// 防止请求永远挂起`}>
    <div className="flex items-center gap-2 mb-2"><span className="text-[9px]" style={{ color: p.textMuted }}>模拟延迟:</span><input type="range" min={500} max={5000} step={500} value={ms} onChange={e => setMs(+e.target.value)} className="flex-1" /><span className="text-[9px] font-mono" style={{ color: p.accent }}>{ms}ms</span></div>
    <button onClick={test} className="mb-2 px-3 py-1 rounded-[5px] text-[10px] border cursor-pointer" style={{ borderColor: p.accentBorder, color: p.accent }}>发请求 (timeout=2000ms)</button>
    <div className="text-[10px]" style={{ color: result.includes("超时") ? "#b85c4a" : result.includes("成功") ? "#5f8a6b" : p.textFaint }}>{result || "—"}</div>
  </CodeToggle>);
}

export function OrmDemo() {
  const p = usePalette();
  return (<CodeToggle code={`// ORM: 用代码操作数据库\nconst users = await User\n  .where('age', '>', 18)\n  .orderBy('name')\n  .limit(10)\n  .get();\n// 自动生成: SELECT * FROM users WHERE age > 18...`}>
    <div className="space-y-1.5"><div className="rounded-[6px] border p-1.5 font-mono text-[9px]" style={{ borderColor: p.accent + "40", backgroundColor: p.accentBg, color: p.accent }}>User.where('age', {'>'} 18).get()</div><div className="text-center text-[9px]" style={{ color: p.textFaint }}>↓ ORM 翻译 ↓</div><div className="rounded-[6px] border p-1.5 font-mono text-[9px]" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}>SELECT * FROM users WHERE age {'>'} 18</div></div>
  </CodeToggle>);
}

export function GraphqlDemo() {
  const p = usePalette();
  const [fields, setFields] = useState(["name", "email"]);
  const allFields = ["name", "email", "age", "avatar"];
  return (<CodeToggle code={`# GraphQL: 客户端决定要什么数据\nquery {\n  user(id: 1) {\n    name\n    email\n    # 只返回你需要的字段\n  }\n}\n# vs REST: 固定返回所有字段`}>
    <p className="text-[11px] mb-2" style={{ color: p.textFaint }}>👇 选择需要的字段</p>
    <div className="flex gap-1 mb-2 flex-wrap">{allFields.map(f => <MiniBtn key={f} active={fields.includes(f)} onClick={() => setFields(fs => fs.includes(f) ? fs.filter(x => x !== f) : [...fs, f])} p={p}>{f}</MiniBtn>)}</div>
    <div className="rounded-[6px] border p-1.5 font-mono text-[9px]" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}>{"{ user { "}{fields.join(" ")}{" } }"}</div>
  </CodeToggle>);
}

export function WebsocketDemo() {
  const p = usePalette();
  const [msgs, setMsgs] = useState<string[]>([]);
  const send = (m: string) => setMsgs(prev => [...prev.slice(-4), m]);
  useEffect(() => { const t = setInterval(() => send(`server: ping #${Date.now().toString(36).slice(-3)}`), 3000); return () => clearInterval(t); }, []);
  return (<CodeToggle code={`// WebSocket 双向实时通信\nconst ws = new WebSocket('wss://chat.example.com');\nws.onmessage = (e) => console.log(e.data);\nws.send('Hello!');\n// 不像 HTTP 需要反复请求`}>
    <div className="flex gap-1 mb-2">{["Hello!", "👋"].map(m => <MiniBtn key={m} onClick={() => send(`client: ${m}`)} p={p}>发送: {m}</MiniBtn>)}</div>
    <div className="h-[60px] overflow-y-auto rounded-[6px] border p-1.5 space-y-0.5 font-mono text-[8px]" style={{ borderColor: p.border, backgroundColor: p.codeBg }}>{msgs.map((m, i) => <div key={i} style={{ color: m.startsWith("client") ? p.accent : "#5f8a6b" }}>{m}</div>)}</div>
  </CodeToggle>);
}

export function MicroservicesDemo() {
  const p = usePalette();
  const services = ["用户服务", "订单服务", "支付服务"];
  return (<CodeToggle code={`// 微服务架构\n// 每个功能独立部署、独立扩展\n// 通过 API/消息队列通信\n// 优势: 独立部署、技术异构\n// 劣势: 分布式复杂性`}>
    <div className="flex items-center gap-1 justify-center flex-wrap">{services.map((s, i) => <span key={i} className="flex items-center"><Box highlight={i === 1} p={p}>📦 {s}</Box>{i < services.length - 1 && <Arrow p={p}/>}</span>)}</div>
    <div className="mt-2 text-[9px] text-center" style={{ color: p.textFaint }}>各服务独立数据库、独立部署</div>
  </CodeToggle>);
}

export function ServerlessDemo() {
  const p = usePalette();
  const [cold, setCold] = useState(true);
  return (<CodeToggle code={`// Serverless / FaaS\n// 无需管理服务器\n// 按调用次数计费\n// 冷启动: 首次调用需初始化 (慢)\n// 热启动: 后续调用复用实例 (快)`}>
    <div className="flex gap-1 mb-2"><MiniBtn active={cold} onClick={() => setCold(true)} p={p}>❄️ 冷启动</MiniBtn><MiniBtn active={!cold} onClick={() => setCold(false)} p={p}>🔥 热启动</MiniBtn></div>
    <div className="flex items-center gap-2"><div className="h-2 flex-1 rounded-full overflow-hidden" style={{ backgroundColor: p.surface }}><motion.div className="h-full rounded-full" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: cold ? 2 : 0.2 }} style={{ backgroundColor: cold ? "#d4a03c" : "#5f8a6b" }} /></div><span className="text-[9px] font-mono" style={{ color: p.textMuted }}>{cold ? "~2s" : "~50ms"}</span></div>
  </CodeToggle>);
}

export function QueueDemo() {
  const p = usePalette();
  const [queue, setQueue] = useState<string[]>(["task-1", "task-2"]);
  const add = () => setQueue(q => [...q, `task-${q.length + 1}`]);
  const process = () => setQueue(q => q.slice(1));
  return (<CodeToggle code={`// 消息队列\n// 生产者 → Queue → 消费者\n// 解耦、削峰、异步处理\n// 工具: RabbitMQ, Redis, Kafka`}>
    <div className="flex gap-1 mb-2"><MiniBtn onClick={add} p={p}>+ 入队</MiniBtn><MiniBtn onClick={process} p={p}>出队处理</MiniBtn></div>
    <div className="flex gap-1 items-center"><span className="text-[9px]" style={{ color: p.textFaint }}>Queue:</span>{queue.map((t, i) => <div key={i} className="px-1.5 py-1 rounded-[4px] text-[8px] border" style={{ borderColor: i === 0 ? p.accent : p.border, color: i === 0 ? p.accent : p.textFaint }}>{t}</div>)}{queue.length === 0 && <span className="text-[9px]" style={{ color: p.textFaint }}>空</span>}</div>
  </CodeToggle>);
}

export function CronDemo() {
  const p = usePalette();
  const [expr, setExpr] = useState("0 9 * * *");
  const descs: Record<string, string> = { "0 9 * * *": "每天 9:00", "*/5 * * * *": "每 5 分钟", "0 0 * * 1": "每周一 0:00" };
  return (<CodeToggle code={`# Cron 表达式: 分 时 日 月 周\n0 9 * * *    → 每天9点\n*/5 * * * *  → 每5分钟\n0 0 * * 1    → 每周一\n# 用途: 定时备份、清理日志、发送报告`}>
    <div className="flex gap-1 mb-2 flex-wrap">{Object.keys(descs).map(e => <MiniBtn key={e} active={expr === e} onClick={() => setExpr(e)} p={p}>{e}</MiniBtn>)}</div>
    <div className="text-[10px] text-center" style={{ color: p.accent }}>⏰ {descs[expr] || expr}</div>
  </CodeToggle>);
}

export function LoggingDemo() {
  const p = usePalette();
  const [level, setLevel] = useState("info");
  const levels = ["error", "warn", "info", "debug"];
  const colors: Record<string, string> = { error: "#b85c4a", warn: "#d4a03c", info: "#4a7fb5", debug: "#98978f" };
  const logs = [{ l: "error", m: "DB connection failed" }, { l: "warn", m: "High memory usage" }, { l: "info", m: "Server started" }, { l: "debug", m: "Query: SELECT..." }];
  const filtered = logs.filter(l => levels.indexOf(l.l) <= levels.indexOf(level));
  return (<CodeToggle code={`// 日志级别: error > warn > info > debug\nconsole.error('...');  // 错误\nconsole.warn('...');   // 警告\nconsole.info('...');   // 信息\nconsole.debug('...');  // 调试\n// 生产环境通常只保留 info 以上`}>
    <div className="flex gap-1 mb-2">{levels.map(l => <MiniBtn key={l} active={level === l} onClick={() => setLevel(l)} p={p}>{l}</MiniBtn>)}</div>
    <div className="space-y-0.5 font-mono text-[9px]">{filtered.map((l, i) => <div key={i} style={{ color: colors[l.l] }}>[{l.l.toUpperCase()}] {l.m}</div>)}</div>
  </CodeToggle>);
}

export function EnvVarDemo() {
  const p = usePalette();
  const [env, setEnv] = useState<"dev" | "prod">("dev");
  const vars = { dev: { DB: "localhost:5432", KEY: "sk_test_xxx" }, prod: { DB: "db.prod.com:5432", KEY: "sk_live_xxx" } };
  return (<CodeToggle code={`# .env.development\nDATABASE_URL=localhost:5432\nAPI_KEY=sk_test_xxx\n\n# .env.production\nDATABASE_URL=db.prod.com:5432\nAPI_KEY=sk_live_xxx\n# 代码中: process.env.API_KEY`}>
    <div className="flex gap-1 mb-2"><MiniBtn active={env === "dev"} onClick={() => setEnv("dev")} p={p}>.env.development</MiniBtn><MiniBtn active={env === "prod"} onClick={() => setEnv("prod")} p={p}>.env.production</MiniBtn></div>
    <div className="rounded-[6px] border p-2 font-mono text-[9px] space-y-0.5" style={{ borderColor: p.border, backgroundColor: p.codeBg, color: p.textMuted }}>{Object.entries(vars[env]).map(([k, v]) => <div key={k}>{k}=<span style={{ color: p.accent }}>{v}</span></div>)}</div>
  </CodeToggle>);
}

export function JwtDemo() {
  const p = usePalette();
  const [valid, setValid] = useState(true);
  return (<CodeToggle code={`// JWT 结构: header.payload.signature\n// 无状态认证: 服务器不存 session\n// 验证: 用密钥验签名\n// 过期: payload.exp 字段控制`}>
    <div className="flex gap-1 mb-2"><MiniBtn active={valid} onClick={() => setValid(true)} p={p}>✓ 有效 Token</MiniBtn><MiniBtn active={!valid} onClick={() => setValid(false)} p={p}>✗ 过期 Token</MiniBtn></div>
    <div className="rounded-[6px] border p-2 font-mono text-[9px]" style={{ borderColor: valid ? "#5f8a6b40" : "#b85c4a40", backgroundColor: p.codeBg }}>
      <div style={{ color: p.textMuted }}>eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoxLCJleHAiOi...</div>
      <div className="mt-1" style={{ color: valid ? "#5f8a6b" : "#b85c4a" }}>{valid ? "✓ 签名验证通过，未过期" : "✗ TokenExpiredError: jwt expired"}</div>
    </div>
  </CodeToggle>);
}

export const backendDemos: Record<string, React.ComponentType> = {
  "server-demo": ServerDemo, "http-demo": HttpDemo, "rest-demo": RestDemo,
  "json-demo": JsonDemo, "auth-demo": AuthDemo, "token-demo": TokenDemo,
  "cache-demo": CacheDemo, "middleware-demo": MiddlewareDemo, "webhook-demo": WebhookDemo,
  "cors-demo": CorsDemo, "sql-demo": SqlDemo, "nosql-demo": NosqlDemo,
  "cookie-demo": CookieDemo, "session-demo": SessionDemo, "status-code-demo": StatusCodeDemo,
  "concurrency-demo": ConcurrencyDemo, "load-balancing-demo": LoadBalancingDemo,
  "reverse-proxy-demo": ReverseProxyDemo, "rate-limit-demo": RateLimitDemo,
  "timeout-demo": TimeoutDemo, "orm-demo": OrmDemo, "graphql-demo": GraphqlDemo,
  "websocket-demo": WebsocketDemo, "microservices-demo": MicroservicesDemo,
  "serverless-demo": ServerlessDemo, "queue-demo": QueueDemo, "cron-demo": CronDemo,
  "logging-demo": LoggingDemo, "env-var-demo": EnvVarDemo, "jwt-demo": JwtDemo,
};
