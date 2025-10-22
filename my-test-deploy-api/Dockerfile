# -----------------------------
# Etapa 1: Build (Node 22 Alpine)
# -----------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Instala ferramentas necessárias apenas pro build
RUN apk add --no-cache python3 make g++ libc6-compat

# Copia apenas os arquivos de dependência
COPY package*.json tsconfig*.json ./

# Instala todas as dependências (inclusive dev)
RUN npm ci --no-audit

# Copia o restante do código
COPY . .

# Compila o TypeScript
RUN npm run build

# Remove dependências de dev e cache do npm pra reduzir peso
RUN npm prune --omit=dev && npm cache clean --force

# -----------------------------
# Etapa 2: Runtime (produção)
# -----------------------------
FROM node:22-alpine

WORKDIR /app

# Copia apenas node_modules e o build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Define variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=80

EXPOSE 80

# Comando padrão para iniciar a aplicação
CMD ["node", "dist/index.js"]
