FROM node:14-alpine as build

WORKDIR /usr/local/tekana-transaction-svc

COPY dist package.json ./

RUN apk add --no-cache git

RUN apk -U --no-cache add protobuf protobuf-dev

RUN npm run proto:install

RUN npm install --production

FROM node:14-alpine

WORKDIR /usr/local/tekana-transaction-svc

COPY --from=build /usr/local/tekana-transaction-svc .

EXPOSE 50053

CMD ["node", "main.js"]
