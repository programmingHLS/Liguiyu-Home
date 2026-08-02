# ── Stage 1: Build ──
FROM node:22-alpine AS builder
WORKDIR /app

ARG ADMIN_MODE=false
ENV NEXT_PUBLIC_ADMIN_MODE=${ADMIN_MODE}

RUN apk add --no-cache python3 make g++
COPY package.json package-lock.json .npmrc ./
# NAS 网络访问 GitHub / unofficial-builds.nodejs.org 不稳定：
#  - disturl: node-gyp 从 npmmirror 下载 node headers（替代官方/unofficial 源）
#  - build_from_source: better-sqlite3 跳过 prebuild 下载，直接本地编译
ENV npm_config_disturl=https://npmmirror.com/mirrors/node \
    npm_config_build_from_source=true
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: Runtime ──
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
