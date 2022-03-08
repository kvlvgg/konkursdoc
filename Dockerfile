FROM node:12.21.0-alpine

WORKDIR /usr/src/app

COPY ./package.json .
RUN npm install

COPY . .

CMD npm run build && npm run start
