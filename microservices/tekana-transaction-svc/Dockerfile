FROM node:14-alpine as build

WORKDIR /usr/local/tekana-transaction-svc

COPY dist package.json ./

RUN npm install

FROM node:14-alpine

WORKDIR /usr/local/tekana-transaction-svc

COPY --from=build /usr/local/tekana-transaction-svc .

EXPOSE 50051

CMD ["node", "main.js"]
