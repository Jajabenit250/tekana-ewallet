FROM node:14-alpine as build

WORKDIR /usr/local/tekana-api-gateway

COPY dist package.json ./

RUN npm install

FROM node:14-alpine

WORKDIR /usr/local/tekana-api-gateway

COPY --from=build /usr/local/tekana-api-gateway .

EXPOSE 3000

CMD ["node", "main.js"]
