#!/bin/bash

cd tekana-api-gateway && npm run test:cov && cd -
cd microservices/tekana-customer-svc && npm run test:cov && cd -
cd microservices/tekana-transaction-svc && npm run test:cov && cd -
cd microservices/tekana-wallet-svc && npm run test:cov && cd -
