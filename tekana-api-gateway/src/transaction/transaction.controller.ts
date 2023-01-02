import {
    Controller,
    Get,
    Inject,
    OnModuleInit,
    Param,
    ParseIntPipe,
    UseGuards,
    Post,
    Body,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
    TransactionServiceClient,
    TRANSACTION_SERVICE_NAME,
    CreateTransactionResponse,
    CreateTransactionRequest,
} from './transaction.pb';
import { CustomerGuard } from '../customer/customer.guard';

@Controller('transaction')
export class TransactionController implements OnModuleInit {
    private svc: TransactionServiceClient;

    @Inject(TRANSACTION_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<TransactionServiceClient>(
            TRANSACTION_SERVICE_NAME,
        );
    }

    @Post()
    @UseGuards(CustomerGuard)
    private async createTransaction(
        @Body() body: CreateTransactionRequest,
    ): Promise<Observable<CreateTransactionResponse>> {
        return this.svc.createTransaction(body);
    }

    //   @Get(':id')
    //   @UseGuards(CustomerGuard)
    //   private async findOne(
    //     @Param('id', ParseIntPipe) id: number,
    //   ): Promise<Observable<FindOneResponse>> {
    //     return this.svc.findOne({ id });
    //   }
}
