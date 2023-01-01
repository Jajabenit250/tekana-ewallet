import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
    CustomerServiceClient,
    CUSTOMER_SERVICE_NAME,
    ValidateResponse,
} from './customer.pb';

@Injectable()
export class CustomerService {
    private svc: CustomerServiceClient;

    @Inject(CUSTOMER_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<CustomerServiceClient>(
            CUSTOMER_SERVICE_NAME,
        );
    }

    public async validate(token: string): Promise<ValidateResponse> {
        return firstValueFrom(this.svc.validate({ token }));
    }
}
