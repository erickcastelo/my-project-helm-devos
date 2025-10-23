# -----------------------------
# Etapa 1: Build (Node 22 Alpine)
# -----------------------------
FROM node:22-alpine AS builder

WORKDIR /app
RUN apk add --no-cache python3 make g++ libc6-compat

COPY package*.json ./
RUN npm ci --omit=optional --no-audit
RUN npm install @rollup/rollup-linux-x64-musl --save-dev --force

COPY . .
RUN npm run build

# -----------------------------
# Etapa 2: Runtime (Nginx Alpine)
# -----------------------------
FROM nginx:alpine

# 👇 Copia o build para /app (dentro do html)
COPY --from=builder /app/dist /usr/share/nginx/html/app

# Config Nginx minimalista e robusta para subpath /app
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
