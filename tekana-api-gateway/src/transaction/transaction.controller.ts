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
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  TransactionServiceClient,
  TRANSACTION_SERVICE_NAME,
  CreateTransactionResponse,
  CreateTransactionRequest,
  CustTransactionsRequest,
  CustTransactionsResponse,
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
    @Req() req: Request,
  ): Promise<Observable<CreateTransactionResponse>> {
    const body: CreateTransactionRequest = req.body;
    body.customerId = <number>req.user;
    return this.svc.createTransaction(body);
  }

  @Get(':accNumber')
  @UseGuards(CustomerGuard)
  private async customerTransactions(
    @Req() req: Request,
  ): Promise<Observable<CustTransactionsResponse>> {
    const body: CustTransactionsRequest = { accNumber: '' };

    body.accNumber = <string>req.params.accNumber;

    return this.svc.custTransactions(body);
  }
}
