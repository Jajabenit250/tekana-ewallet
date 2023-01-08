import { HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientGrpc } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { Transaction } from './transaction.entity';
import {
  FindOneResponse,
  WithdrawMoneyResponse,
  DepositMoneyResponse,
  WalletServiceClient,
  WALLET_SERVICE_NAME,
} from './proto/wallet.pb';
import {
  CreateTransactionRequest,
  CreateTransactionResponse,
  CustTransactionsRequest,
  CustTransactionsResponse,
} from './proto/transaction.pb';
import { CreateTransactionRequestDto } from './transaction.dto';

@Injectable()
export class TransactionService implements OnModuleInit {
  private walletSvc: WalletServiceClient;

  @Inject(WALLET_SERVICE_NAME)
  private readonly client: ClientGrpc;

  @InjectRepository(Transaction)
  private readonly repository: Repository<Transaction>;

  public onModuleInit(): void {
    this.walletSvc =
      this.client.getService<WalletServiceClient>(WALLET_SERVICE_NAME);
  }

  public async createTransaction(
    data: CreateTransactionRequest,
  ): Promise<CreateTransactionResponse> {
    // find Sender account
    const senderWallet: FindOneResponse = await firstValueFrom(
      this.walletSvc.findOne({ accNumber: data.senderAcc }),
    );

    // find Receiver Account
    const receiverWallet: FindOneResponse = await firstValueFrom(
      this.walletSvc.findOne({ accNumber: data.receiverAcc }),
    );

    if (senderWallet.status >= HttpStatus.NOT_FOUND) {
      return {
        id: null,
        error: ['Sender Wallet not found'],
        status: senderWallet.status,
      };
    } else if (senderWallet.data.customerId != data.customerId) {
      return {
        id: null,
        error: ['Can not perform the action wallet belong to someone else'],
        status: receiverWallet.status,
      };
    } else if (receiverWallet.status >= HttpStatus.NOT_FOUND) {
      return {
        id: null,
        error: ['Reciever Wallet not found'],
        status: receiverWallet.status,
      };
    } else if (senderWallet.data.balance < data.amount) {
      return {
        id: null,
        error: ['No available funds to complete transaction'],
        status: HttpStatus.CONFLICT,
      };
    }

    const transaction: Transaction = new Transaction();

    transaction.amount = data.amount;
    transaction.senderAcc = senderWallet.data.accNumber;
    transaction.receiverAcc = receiverWallet.data.accNumber;

    await this.repository.save(transaction);

    // Withdraw money from Sender Wallet
    const withdrawMoneyData: WithdrawMoneyResponse = await firstValueFrom(
      this.walletSvc.withdrawMoney({
        accNumber: data.senderAcc,
        amount: data.amount,
        transactionId: transaction.id,
      }),
    );

    // Deposit money to the Receiver Wallet
    const depositMoneyData: DepositMoneyResponse = await firstValueFrom(
      this.walletSvc.depositMoney({
        accNumber: data.receiverAcc,
        amount: data.amount,
        transactionId: transaction.id,
      }),
    );

    if (withdrawMoneyData.status === HttpStatus.CONFLICT) {
      // mark transaction as failed if withdrawMoney fails
      await this.repository.update(
        { id: transaction.id },
        { status: 'failed' },
      );

      return {
        id: null,
        error: withdrawMoneyData.error,
        status: HttpStatus.CONFLICT,
      };
    } else if (depositMoneyData.status === HttpStatus.CONFLICT) {
      // mark transaction as failed if depositMoney fails
      await this.repository.update(
        { id: transaction.id },
        { status: 'failed' },
      );

      // refund the sender if depositMoney fails

      const refundMoney: DepositMoneyResponse = await firstValueFrom(
        this.walletSvc.depositMoney({
          accNumber: data.senderAcc,
          amount: data.amount,
          transactionId: transaction.id,
        }),
      );

      if (refundMoney.status === HttpStatus.CONFLICT) {
        return {
          id: null,
          error: ['Transaction Failed and Refund Failed Contact your CSO'],
          status: HttpStatus.CONFLICT,
        };
      }

      return {
        id: null,
        error: depositMoneyData.error,
        status: HttpStatus.CONFLICT,
      };
    }

    await this.repository.update(
      { id: transaction.id },
      { status: 'completed' },
    );

    return { id: transaction.id, error: null, status: HttpStatus.OK };
  }

  public async custTransactions({
    accNumber,
  }: CustTransactionsRequest): Promise<CustTransactionsResponse> {
    const transaction: Transaction[] = await this.repository.find({
      where: [{ senderAcc: accNumber }, { receiverAcc: accNumber }],
    });

    if (!transaction) {
      return {
        data: null,
        error: ['Transactions not found'],
        status: HttpStatus.NOT_FOUND,
      };
    }

    return { data: transaction, error: null, status: HttpStatus.OK };
  }
}
