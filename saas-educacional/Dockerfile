# ===========================================
# Stage 1: Build
# ===========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependencias
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm ci

# Gerar Prisma Client
RUN npx prisma generate

# Copiar codigo fonte
COPY tsconfig.json ./
COPY src/backend ./src/backend/
COPY src/shared ./src/shared/

# Compilar TypeScript
RUN npm run build:backend

# ===========================================
# Stage 2: Production
# ===========================================
FROM node:22-alpine AS production

WORKDIR /app

# Instalar apenas dependencias de producao
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copiar Prisma schema e gerar client
COPY prisma ./prisma/
RUN npx prisma generate

# Copiar build
COPY --from=builder /app/dist ./dist

# Expor porta
EXPOSE 3001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1

# Comando de inicializacao: executar migrations e iniciar servidor
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/backend/server.js"]
