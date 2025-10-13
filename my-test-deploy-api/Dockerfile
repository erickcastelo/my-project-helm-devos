# Etapa 1: build da aplicação
FROM node:20-slim AS builder

# Instala dependências necessárias pra build (ex: typescript, etc)
RUN apt-get update && apt-get install -y \
  python3 g++ make \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia apenas o essencial primeiro
COPY package*.json tsconfig*.json ./

RUN npm install

# Copia o restante do código
COPY . .

# Compila o TypeScript
RUN npm run build

# Etapa 2: imagem final de produção
FROM node:20-slim

WORKDIR /app

# Copia apenas o package.json e instala dependências de produção
COPY package*.json ./
RUN npm install --omit=dev

# Copia o código já compilado
COPY --from=builder /app/dist ./dist

# Define ambiente
ENV NODE_ENV=production

# Expõe a porta do servidor
EXPOSE 3000

# Comando padrão pra iniciar
CMD ["node", "dist/index.js"]
