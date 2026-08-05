# Étape 1 : build
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY src ./src
COPY tsconfig.json ./

RUN npm run build

# Étape 2 : image finale
FROM node:24-alpine AS production

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

ENV NODE_ENV=production

EXPOSE 80

CMD ["node", "dist/index.cjs"]
