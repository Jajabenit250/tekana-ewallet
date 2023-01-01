/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "wallet";

export interface CreateWalletRequest {
  customerId: number;
  walletType: string;
}

export interface CreateWalletResponse {
  status: number;
  error: string[];
  id: number;
}

export interface DepositMoneyRequest {
  accNumber: string;
  amount: string;
}

export interface DepositMoneyResponse {
  status: number;
  error: string[];
  id: number;
}

export interface WalletData {
  id: number;
  accNumber: string;
  customerId: number;
  walletType: string;
  balance: number;
}

export interface FindOneRequest {
  accNumber: string;
}

export interface FindOneResponse {
  status: number;
  error: string[];
  data: WalletData | undefined;
}

/** Find Wallets by customerId */
export interface CustomerWalletsRequest {
  customerId: number;
}

export interface CustomerWalletsResponse {
  status: number;
  error: string[];
  data: WalletData[];
}

export interface WithdrawMoneyRequest {
  accNumber: string;
  amount: string;
}

export interface WithdrawMoneyResponse {
  status: number;
  error: string[];
  id: number;
}

export const WALLET_PACKAGE_NAME = "wallet";

export interface WalletServiceClient {
  createWallet(request: CreateWalletRequest): Observable<CreateWalletResponse>;

  depositMoney(request: DepositMoneyRequest): Observable<DepositMoneyResponse>;

  withdrawMoney(request: WithdrawMoneyRequest): Observable<WithdrawMoneyResponse>;

  findOne(request: FindOneRequest): Observable<FindOneResponse>;

  customerWallets(request: CustomerWalletsRequest): Observable<CustomerWalletsResponse>;
}

export interface WalletServiceController {
  createWallet(
    request: CreateWalletRequest,
  ): Promise<CreateWalletResponse> | Observable<CreateWalletResponse> | CreateWalletResponse;

  depositMoney(
    request: DepositMoneyRequest,
  ): Promise<DepositMoneyResponse> | Observable<DepositMoneyResponse> | DepositMoneyResponse;

  withdrawMoney(
    request: WithdrawMoneyRequest,
  ): Promise<WithdrawMoneyResponse> | Observable<WithdrawMoneyResponse> | WithdrawMoneyResponse;

  findOne(request: FindOneRequest): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;

  customerWallets(
    request: CustomerWalletsRequest,
  ): Promise<CustomerWalletsResponse> | Observable<CustomerWalletsResponse> | CustomerWalletsResponse;
}

export function WalletServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createWallet", "depositMoney", "withdrawMoney", "findOne", "customerWallets"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("WalletService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("WalletService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const WALLET_SERVICE_NAME = "WalletService";
