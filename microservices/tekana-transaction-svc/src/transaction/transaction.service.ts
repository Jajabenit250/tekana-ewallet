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
} from './proto/transaction.pb';

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
        // for sender
        const senderWallet: FindOneResponse = await firstValueFrom(
            this.walletSvc.findOne({ accNumber: data.senderAcc }),
        );

        // for receiver
        const receiverWallet: FindOneResponse = await firstValueFrom(
            this.walletSvc.findOne({ accNumber: data.receiverAcc }),
        );

        if (
            senderWallet.status >= HttpStatus.NOT_FOUND

        ) {
            return {
                id: null,
                error: ['Sender Wallet not found'],
                status: senderWallet.status,
            };
        } else if (receiverWallet.status >= HttpStatus.NOT_FOUND) {
            return {
                id: null,
                error: ['Reciever Wallet not found'],
                status: receiverWallet.status,
            };
        }
        else if (senderWallet.data.balance < data.amount) {
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

        const withdrawMoneyData: WithdrawMoneyResponse = await firstValueFrom(
            this.walletSvc.withdrawMoney({
                accNumber: data.senderAcc,
                amount: data.amount,
                transactionId: transaction.id,
            }),
        );

        const depositMoneyData: DepositMoneyResponse = await firstValueFrom(
            this.walletSvc.depositMoney({
                accNumber: data.receiverAcc,
                amount: data.amount,
                transactionId: transaction.id,
            }),
        );

        if (
            withdrawMoneyData.status === HttpStatus.CONFLICT

        ) {
            // deleting transaction if decreaseStock fails
            await this.repository.softDelete(transaction.id);

            return {
                id: null,
                error: withdrawMoneyData.error,
                status: HttpStatus.CONFLICT,
            };
        } else if (depositMoneyData.status === HttpStatus.CONFLICT) {
            // deleting transaction if decreaseStock fails
            await this.repository.softDelete(transaction.id);

            return {
                id: null,
                error: depositMoneyData.error,
                status: HttpStatus.CONFLICT,
            };
        }

        return { id: transaction.id, error: null, status: HttpStatus.OK };
    }
}
