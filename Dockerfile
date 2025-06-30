
FROM node:22-alpine

WORKDIR /app

COPY dist /app/dist
COPY package.json /app/package.json

RUN npm install --omit=dev

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/index.js"] 