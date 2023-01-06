FROM node:14-alpine as build

WORKDIR /usr/local/tekana-wallet-svc

COPY dist package.json ./

RUN npm install

FROM node:14-alpine

WORKDIR /usr/local/tekana-wallet-svc

COPY --from=build /usr/local/tekana-wallet-svc .

EXPOSE 50052

CMD ["node", "main.js"]
