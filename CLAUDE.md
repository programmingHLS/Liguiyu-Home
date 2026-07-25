# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Before writing any Next.js code

This project uses **Next.js 16.2.6** — APIs, conventions, and file structure may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing framework-specific code. Heed deprecation notices.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build (always run before syncing to NAS)
npm run lint     # ESLint
npm run start    # Start production server
```

There are no tests in this project — `npm run build` is the sole pre-deploy verification step.

## Tech stack

- **Framework**: Next.js 16.2.6 (App Router) + TypeScript 5, strict mode
- **Styling**: Tailwind CSS v4 (`@theme` blocks in CSS, not `tailwind.config`)
- **Animation**: Framer Motion (`useMotionValue`/`useTransform` for GPU-accelerated animations) + Three.js (WebGL particle field)
- **Auth**: next-auth v5 beta (Credentials provider, JWT sessions, `trustHost: true`, `secure: false` cookies for HTTP)
- **Database**: SQLite via `better-sqlite3` (WAL mode, file: `data/liguiyu.db`)
- **Email**: Resend (`resend` package, API key in env)
- **Deploy**: Docker multi-stage build → NAS (Synology), two containers sharing one SQLite DB
- **Path alias**: `@/*` maps to project root

## Architecture: Dual-instance Docker deployment

The app runs as two Docker containers on a Synology NAS, sharing one SQLite database via a mounted volume:

| Container | Port | Auth | Purpose |
|-----------|------|------|---------|
| `liguiyu-home` | 3090→3000 | NextAuth (credentials) | Public site (liguiyu.com) |
| `liguiyu-admin` | 3091→3000 | Cloudflare Zero Trust (outer layer) | Admin dashboard — **no app-level auth** |

**Admin mode** (`ADMIN_MODE=true` / `NEXT_PUBLIC_ADMIN_MODE=true`): This compile-time constant disables all app-level authentication. Key decision points:
- `app/components/Providers.tsx` — skips `SessionProvider` wrapping entirely
- `app/components/Navbar.tsx` — `AuthButton` does not render
- `app/blog/[slug]/comments.tsx` — returns `null` (no comments in admin mode)
- `app/admin/page.tsx` — renders `AdminModePage` instead of `PublicAdminPage`
- `app/api/admin/users/route.ts` and `app/api/admin/comments/route.ts` — skip `isAdmin()` check
- `proxy.ts` — rewrites `/` → `/admin` when in admin mode

The admin mode is baked in at build time via Docker build args (`ADMIN_MODE="true"` for admin container, `"false"` for public).

## Project structure (key directories)

```
app/
├── layout.tsx                 # Root layout: fonts, metadata, <Providers>
├── page.tsx                   # Homepage (Hero + About + Blog preview + Tools + Footer)
├── globals.css                # Tailwind v4 @theme tokens, global styles, animation CSS vars
├── components/                # Shared components (Navbar, Hero, Blog, Footer, Three.js, etc.)
├── blog/                      # Blog listing + [slug] dynamic route (article rendering)
├── auth/                      # /auth/login, /auth/register, /auth/verify pages
├── admin/                     # Admin dashboard: user mgmt, comments, articles, problems, league
├── league-materials/          # 团日活动资料 upload/submission page
├── problems/                  # 智能题库 — browse subjects, sets, quiz mode
├── api/                       # All API routes (REST-style, see below)
└── lib/                       # Backend utilities
    ├── db.ts                  # SQLite singleton, schema init + migrations (auto-runs on first getDb())
    ├── auth.ts                # NextAuth config (credentials provider, JWT callbacks, role injection)
    ├── admin.ts               # isAdmin() helper — reads role from session via auth()
    ├── email.ts               # Resend email sending (verification, login code, submission notification)
    ├── posts.ts               # Blog post loader — reads .json + .html from data/posts/
    └── animations.ts          # Shared animation variants
```

## API routes

| Route | Purpose |
|-------|---------|
| `api/auth/[...nextauth]` | NextAuth core (login callback, session, CSRF) |
| `api/auth/register` | User registration (email + password + verification code) |
| `api/auth/send-code` | Send email verification code via Resend |
| `api/auth/verify` | Verify email token |
| `api/blog/comments` | CRUD for blog comments (post_slug scoped) |
| `api/admin/users` | Admin: list/delete users, toggle admin role |
| `api/admin/comments` | Admin: list/delete comments |
| `api/admin/articles` | Admin: CRUD blog articles (JSON + HTML in data/posts/) |
| `api/admin/problems` | Admin: CRUD problems |
| `api/admin/sets` | Admin: CRUD problem sets |
| `api/admin/subjects` | Admin: CRUD subjects |
| `api/admin/league-secretaries` | Admin: import/manage 团支书名单 |
| `api/admin/league-material-admins` | Admin: manage material submission admins |
| `api/league-materials/**` | 团日活动资料: upload, download, delete, chunked upload |
| `api/problems/sets` | Public: list problem sets by subject |
| `api/problems/subjects` | Public: list subjects |
| `api/problems/quiz` | Public: fetch quiz questions |
| `api/problems/pdf` | Public: serve PDF pages |
| `api/problems/pdf-download` | Public: download PDF |

## Database

Single SQLite file at `data/liguiyu.db`. Tables are auto-created on first `getDb()` call:

- **users** — id, email, password_hash, role ('admin'/'user'), email_verified, login_code, etc.
- **sessions** — NextAuth session store
- **verification_codes** — email verification codes (10-min TTL)
- **blog_comments** — post_slug, user_id, content, created_at
- **league_secretaries** — 团支书名单 (name, class_id)
- **league_material_admins** — users who can manage submissions
- **subjects / problem_sets / problems** — 智能题库 hierarchy

Migrations run inline in `initDb()` — columns and tables are added via `ALTER TABLE` if missing. No migration framework.

## Blog posts storage

Blog articles are NOT in the database. They are files on disk:
- `data/posts/{slug}.json` — metadata (title, date, description, keywords, author)
- `data/posts/{slug}.html` — full article HTML body

Articles are read at request time via `getPostBySlug()` in `app/lib/posts.ts`. HTML is served directly with heading-id deduplication. No rebuild/restart needed to update articles on NAS.

## Deploy workflow (龙虾协作流)

Code lives at `D:\Code\liguiyu-home` (Windows) and is synced to NAS at `Server:/vol1/1000/Docker/liguiyu-home/`:

1. Write code, then `npm run build` locally — must pass before syncing
2. `rsync -avz --dry-run --delete ...` — preview what will change (CRITICAL: check no `data/` deletions)
3. `rsync -avz --delete ...` — sync source to NAS (exclude: `node_modules`, `.next`, `.git`, `data/*.db`, `data/posts`, `data/pdfs`, `data/league-materials`, `.env*`, `app/fonts`)
4. Notify user to rebuild Docker: `ssh Server && cd /vol1/1000/Docker/liguiyu-home && sudo docker compose up -d --build`

**NAS details**: SSH alias `Server`, project at `/vol1/1000/Docker/liguiyu-home/`, Docker commands need `sudo`.

## Important implementation notes

- **Framer Motion performance**: Use `useMotionValue` (not React state) for high-frequency events like mouse tracking — it updates on GPU without triggering re-renders. `useTransform` subscribes to motion values inline.
- **Three.js particles**: `StarfieldBackground` uses `AdditiveBlending` + `depthWrite: false` to avoid depth-sorting overhead. Frame-rate independent via `dt * 60` scaling.
- **Dark/light mode**: Controlled by `html.dark` class, persisted to `localStorage`. All animated components adjust particle count/color/opacity based on `isDark`.
- **npm install**: Requires `--legacy-peer-deps` (next-auth vs Next.js 16). The `.npmrc` sets `legacy-peer-deps=true` for CI/Docker.
- **better-sqlite3**: Native addon — needs `python3 make g++` at both build and runtime in Docker.
- **File uploads**: `serverActions.bodySizeLimit` set to `200mb` in next.config for league material zip uploads.
- **HTML rendering**: Articles use `dangerouslySetInnerHTML`. KaTeX and highlight.js load from CDN on demand in `article-content.tsx`. Copy buttons and admonition blocks are attached via raw DOM manipulation (not React) because innerHTML resets the DOM.
