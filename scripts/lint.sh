#!/bin/bash

cd tekana-api-gateway && npm run build && cd -
cd microservices/tekana-customer-svc && npm run build && cd -
cd microservices/tekana-transaction-svc && npm run build && cd -
cd microservices/tekana-wallet-svc && npm run build && cd -
