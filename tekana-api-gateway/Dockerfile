FROM node:14-alpine as build

WORKDIR /usr/local/tekana-api-gateway

COPY dist package.json ./

RUN apk add --no-cache git

RUN apk -U --no-cache add protobuf protobuf-dev

RUN npm run proto:install

RUN npm install

FROM node:14-alpine 

WORKDIR /usr/local/tekana-api-gateway

COPY --from=build /usr/local/tekana-api-gateway .

EXPOSE 3000

CMD ["npm", "start"]
