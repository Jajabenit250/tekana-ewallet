import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
    LoginRequestDto,
    RegisterRequestDto,
    ValidateRequestDto,
    RegCustomerRequestDto,
    RegCustomersRequestDto,
} from './customer.dto';
import {
    CUSTOMER_SERVICE_NAME,
    RegisterResponse,
    LoginResponse,
    ValidateResponse,
    RegCustomerResponse,
    RegCustomersResponse,
} from './customer.pb';
import { CustomerService } from './service/customer.service';

@Controller()
export class CustomerController {
    @Inject(CustomerService)
    private readonly service: CustomerService;

    @GrpcMethod(CUSTOMER_SERVICE_NAME, 'Register')
    private register(payload: RegisterRequestDto): Promise<RegisterResponse> {
        return this.service.register(payload);
    }

    @GrpcMethod(CUSTOMER_SERVICE_NAME, 'Login')
    private login(payload: LoginRequestDto): Promise<LoginResponse> {
        return this.service.login(payload);
    }

    @GrpcMethod(CUSTOMER_SERVICE_NAME, 'Validate')
    private validate(payload: ValidateRequestDto): Promise<ValidateResponse> {
        return this.service.validate(payload);
    }

    @GrpcMethod(CUSTOMER_SERVICE_NAME, 'FindAllCustomers')
    private findAllCustomers(): Promise<RegCustomersResponse> {
        return this.service.findAllCustomers();
    }

    @GrpcMethod(CUSTOMER_SERVICE_NAME, 'FindOneCustomer')
    private findOneCustomer(
        payload: RegCustomerRequestDto,
    ): Promise<RegCustomerResponse> {
        return this.service.findOneCustomer(payload);
    }
}
