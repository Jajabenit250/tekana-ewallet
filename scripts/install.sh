#!/bin/bash

cd tekana-api-gateway && npm i && cd -
cd microservices/tekana-customer-svc && npm i && cd -
cd microservices/tekana-transaction-svc && npm i && cd -
cd microservices/tekana-wallet-svc && npm i && cd -
