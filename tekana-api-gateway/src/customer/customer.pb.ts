/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "customer";

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  dateOfbirth: string;
  gender: string;
}

export interface RegisterResponse {
  status: number;
  error: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  error: string[];
  token: string;
}

export interface CustomerData {
  id: number;
  email: string;
  fullName: string;
  dateOfbirth: string;
  gender: string;
}

export interface RegCustomerRequest {
  id: number;
}

export interface RegCustomerResponse {
  status: number;
  error: string[];
  data: CustomerData | undefined;
}

export interface RegCustomersRequest {
  token: string;
}

export interface RegCustomersResponse {
  status: number;
  error: string[];
  data: CustomerData[];
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  customerId: number;
}

export const CUSTOMER_PACKAGE_NAME = "customer";

export interface CustomerServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;

  findAll(request: RegCustomersRequest): Observable<RegCustomersResponse>;

  findOne(request: RegCustomerRequest): Observable<RegCustomerResponse>;

  login(request: LoginRequest): Observable<LoginResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;
}

export interface CustomerServiceController {
  register(request: RegisterRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  findAll(
    request: RegCustomersRequest,
  ): Promise<RegCustomersResponse> | Observable<RegCustomersResponse> | RegCustomersResponse;

  findOne(
    request: RegCustomerRequest,
  ): Promise<RegCustomerResponse> | Observable<RegCustomerResponse> | RegCustomerResponse;

  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;
}

export function CustomerServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["register", "findAll", "findOne", "login", "validate"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CustomerService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CustomerService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CUSTOMER_SERVICE_NAME = "CustomerService";
