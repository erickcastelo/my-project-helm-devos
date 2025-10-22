# -----------------------------
# Etapa 1: Build (Node 22 Alpine)
# -----------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# 1️⃣ Instala apenas o essencial pro build
RUN apk add --no-cache python3 make g++ libc6-compat

# 2️⃣ Copia só arquivos de dependência primeiro (melhor cache)
COPY package*.json ./

# 3️⃣ Instala dependências (com cache eficiente)
# A flag --omit=dev só será usada depois
RUN npm install --omit=optional --no-audit

# 4️⃣ Instala o binário correto do Rollup (necessário no Alpine)
RUN npm install @rollup/rollup-linux-x64-musl --save-dev --force

# 5️⃣ Copia o restante do projeto
COPY . .

# 6️⃣ Gera o build
RUN npm run build

# 7️⃣ Remove dependências de dev pra deixar leve (antes de copiar pro runtime)
RUN npm prune --omit=dev

# -----------------------------
# Etapa 2: Runtime (Nginx Alpine)
# -----------------------------
FROM nginx:alpine

# 8️⃣ Copia o build pronto da etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# 9️⃣ Configuração mínima e gzip (opcional, melhora performance)
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;
  gzip on;
  gzip_types text/plain text/css application/javascript application/json image/svg+xml;
  location / {
    try_files \$uri /index.html;
  }
}
EOF

# 10️⃣ Expõe porta e inicia
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
