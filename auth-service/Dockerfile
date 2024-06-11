FROM node:18-alpine

WORKDIR /src/usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "dev" ]