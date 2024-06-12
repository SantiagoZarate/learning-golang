FROM node:20-slim as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# COPY package*.json .

# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --no-frozen-lockfile && pnpm add typescript

COPY . .

# RUN pnpm tsc

###
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

###
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm tsc

###
FROM gcr.io/distroless/nodejs20-debian11

WORKDIR /app

# COPY --from=base /app/node_modules /app/node_modules
# COPY --from=base /app/dist /app/dist

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json

# RUN --mount=type=cache,target=/src/usr/app.npm \
#   npm set cache /src/usr/app.npm && \
#   npm install --omit=dev

# COPY . .

# RUN npm install typescript && npx tsc

EXPOSE 4000

CMD [ "dist/src/index.js" ]