FROM node:20-slim AS base

# Install pnpm and openssl
RUN apt-get update && apt-get install -y openssl && npm install -g pnpm

# Dependencies
FROM base AS deps
WORKDIR /app
# Copy root files needed for pnpm workspace
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Copy app package.json
COPY apps/api/package.json ./apps/api/
# Install dependencies
RUN pnpm config set ignore-scripts false
RUN pnpm install --filter api...

# Builder
FROM base AS builder
WORKDIR /app
# Copy all files
COPY . .
# Copy installed dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules
# Generate Prisma Client
RUN pnpm --filter api exec prisma generate
# Build API
RUN pnpm --filter api build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3002

# Copy production artifacts
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

EXPOSE 3002

CMD ["node", "apps/api/dist/src/main"]
