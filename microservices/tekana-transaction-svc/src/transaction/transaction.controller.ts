import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TransactionService } from './transaction.service';
import {
    TRANSACTION_SERVICE_NAME,
    CreateTransactionResponse,
    CustTransactionsResponse,
} from './proto/transaction.pb';
import {
    CreateTransactionRequestDto,
    CustTransactionsRequestDto,
} from './transaction.dto';

@Controller()
export class TransactionController {
    @Inject(TransactionService)
    private readonly service: TransactionService;

    @GrpcMethod(TRANSACTION_SERVICE_NAME, 'CreateTransaction')
    private async createTransaction(
        data: CreateTransactionRequestDto,
    ): Promise<CreateTransactionResponse> {
        return this.service.createTransaction(data);
    }
    @GrpcMethod(TRANSACTION_SERVICE_NAME, 'CustTransactions')
    private async custTransactions(
        data: CustTransactionsRequestDto,
    ): Promise<CustTransactionsResponse> {
        return this.service.custTransactions(data);
    }
}
