FROM node:14-alpine as build

WORKDIR /usr/local/tekana-customer-svc

COPY dist package.json ./

RUN npm install

FROM node:14-alpine

WORKDIR /usr/local/tekana-customer-svc

COPY --from=build /usr/local/tekana-customer-svc .

EXPOSE 50051

CMD ["node", "main.js"]
