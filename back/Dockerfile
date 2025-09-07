# Étape 1 : build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY src ./src
COPY tsconfig.json ./

RUN npm run build

# Étape 2 : image finale
FROM node:22-alpine AS production

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./

ENV NODE_ENV=production

EXPOSE 80

CMD ["node", "dist/index.js"]
