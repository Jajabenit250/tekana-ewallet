/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "transaction";

export interface TransactionData {
  senderAcc: string;
  receiverAcc: string;
  amount: number;
  status: string;
}

export interface CreateTransactionRequest {
  senderAcc: string;
  receiverAcc: string;
  amount: number;
}

export interface CreateTransactionResponse {
  status: number;
  error: string[];
  id: number;
}

export interface CustTransactionsRequest {
  accNumber: string;
}

export interface CustTransactionsResponse {
  status: number;
  error: string[];
  data: TransactionData[];
}

export const TRANSACTION_PACKAGE_NAME = "transaction";

export interface TransactionServiceClient {
  createTransaction(request: CreateTransactionRequest): Observable<CreateTransactionResponse>;

  custTransactions(request: CustTransactionsRequest): Observable<CustTransactionsResponse>;
}

export interface TransactionServiceController {
  createTransaction(
    request: CreateTransactionRequest,
  ): Promise<CreateTransactionResponse> | Observable<CreateTransactionResponse> | CreateTransactionResponse;

  custTransactions(
    request: CustTransactionsRequest,
  ): Promise<CustTransactionsResponse> | Observable<CustTransactionsResponse> | CustTransactionsResponse;
}

export function TransactionServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createTransaction", "custTransactions"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TransactionService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TransactionService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TRANSACTION_SERVICE_NAME = "TransactionService";
