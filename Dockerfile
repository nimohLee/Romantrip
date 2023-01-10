FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

# npm install은 버전 반올림 해버림
RUN npm ci

COPY . .

EXPOSE 5001

ENV NODE_ENV=development

ENTRYPOINT [ "node","server.js"]