FROM node:10-alpine

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000 8080

CMD [ "yarn", "dev" ]
