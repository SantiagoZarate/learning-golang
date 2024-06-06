FROM node:18-alpine

WORKDIR /app/web

COPY package*.json .

RUN corepack enable && corepack prepare pnpm@latest --activate && pnpm i

COPY . .

RUN pnpm build

EXPOSE 8000

CMD [ "pnpm", "preview" ]