FROM node:18-alpine AS build

WORKDIR /app/web

COPY package*.json .

RUN --mount=type=cache,target=/app/web/.npm \
  npm set cache /app/web/.npm && \
  npm install --omit=dev && npm install typescript

COPY . .

### For production enviroment im not able to pass ENVS through docker-compose file
### therefore i have to use args as a workaround.
ARG VITE_API_URL
ARG VITE_APP_VERSION

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_APP_VERSION=${VITE_APP_VERSION}

RUN npm run build

###
FROM nginx:1.17-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/web/dist/ /usr/share/nginx/html

EXPOSE 8000

CMD [ "nginx", "-g", "daemon off;" ]