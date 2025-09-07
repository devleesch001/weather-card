# Étape 1 : build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . ./

RUN npm run build

# Étape 2 : image finale pour servir le build
FROM node:22-alpine AS production

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/build ./build

EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]