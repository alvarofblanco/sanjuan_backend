FROM node:14.3.0-alpine3.10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV development
ENV DEBUG server,server:*

EXPOSE 3000

CMD ["npm", "start"]