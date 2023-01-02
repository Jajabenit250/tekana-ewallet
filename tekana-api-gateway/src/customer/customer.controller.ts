import {
    Body,
    Controller,
    Get,
    Inject,
    OnModuleInit,
    Post,
    Put,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
    CustomerServiceClient,
    RegisterResponse,
    RegisterRequest,
    CUSTOMER_SERVICE_NAME,
    LoginRequest,
    LoginResponse,
    RegCustomersResponse,
    RegCustomersRequest,
    RegCustomerRequest,
    RegCustomerResponse,
} from './customer.pb';

@Controller('customer')
export class CustomerController implements OnModuleInit {
    private svc: CustomerServiceClient;

    @Inject(CUSTOMER_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<CustomerServiceClient>(
            CUSTOMER_SERVICE_NAME,
        );
    }

    @Post('register')
    private async register(
        @Body() body: RegisterRequest,
    ): Promise<Observable<RegisterResponse>> {
        return this.svc.register(body);
    }

    @Put('login')
    private async login(
        @Body() body: LoginRequest,
    ): Promise<Observable<LoginResponse>> {
        return this.svc.login(body);
    }

    @Get(':id')
    private async findOne(
        @Body() body: RegCustomerRequest,
    ): Promise<Observable<RegCustomerResponse>> {
        return this.svc.findOne(body);
    }

    @Get()
    private async findAll(
        @Body() body: RegCustomersRequest,
    ): Promise<Observable<RegCustomersResponse>> {
        return this.svc.findAll(body);
    }
}
