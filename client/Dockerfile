FROM node:18-alpine AS base

WORKDIR /app/web

COPY package*.json .

RUN --mount=type=cache,target=/app/web/.npm \
  npm set cache /app/web/.npm && \
  npm install --omit=dev && npm install typescript

COPY . .

RUN npm run build

EXPOSE 8000

CMD [ "npm", "run", "preview" ]