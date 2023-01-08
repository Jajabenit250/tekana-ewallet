import { IsNumber, IsString, Min } from 'class-validator';
import {
  CreateTransactionRequest,
  CustTransactionsRequest,
} from './proto/transaction.pb';

export class CreateTransactionRequestDto implements CreateTransactionRequest {
  @IsString()
  public senderAcc: string;

  @IsNumber()
  public receiverAcc: string;

  @IsNumber()
  @Min(1)
  public amount: number;

  @IsNumber()
  @Min(1)
  public customerId: number;
}

export class CustTransactionsRequestDto implements CustTransactionsRequest {
  @IsString()
  public accNumber: string;
}
