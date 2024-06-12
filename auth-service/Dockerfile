FROM node:18-alpine as build

WORKDIR /src/usr/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm install typescript && npx tsc

EXPOSE 4000

CMD [ "node", "./dist/src/index.js" ]