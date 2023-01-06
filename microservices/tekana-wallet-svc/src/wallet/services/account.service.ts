import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
    public generateCustomerNumber(customerId: number): string {
        const timestamp = Number(Date.now());
        return `200-${customerId.toString()}-${timestamp.toString()}`;
    }
}
