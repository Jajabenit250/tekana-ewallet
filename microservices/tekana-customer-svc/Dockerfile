FROM node:14-alpine as build

WORKDIR /usr/local/tekana-customer-svc

COPY dist package.json ./

RUN apk add --no-cache git

RUN apk -U --no-cache add protobuf protobuf-dev

RUN npm run proto:install

RUN npm install --production

FROM node:14-alpine

WORKDIR /usr/local/tekana-customer-svc

COPY --from=build /usr/local/tekana-customer-svc .

EXPOSE 50051

CMD ["node", "main.js"]
