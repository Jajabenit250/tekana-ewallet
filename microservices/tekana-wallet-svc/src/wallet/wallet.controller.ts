import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateWalletRequestDto, FindOneRequestDto, WithdrawMoneyRequestDto, DepositMoneyRequestDto, CustomerWalletsRequestDto } from './wallet.dto';
import { CreateWalletResponse, FindOneResponse, WALLET_SERVICE_NAME, WithdrawMoneyResponse, DepositMoneyResponse, CustomerWalletsResponse } from './wallet.pb';
import { WalletService } from './wallet.service';

@Controller()
export class WalletController {
    @Inject(WalletService)
    private readonly service: WalletService;

    @GrpcMethod(WALLET_SERVICE_NAME, 'CreateWallet')
    private createWallet(payload: CreateWalletRequestDto): Promise<CreateWalletResponse> {
        return this.service.createWallet(payload);
    }

    @GrpcMethod(WALLET_SERVICE_NAME, 'FindOne')
    private findOne(payload: FindOneRequestDto): Promise<FindOneResponse> {
        return this.service.findOne(payload);
    }

    @GrpcMethod(WALLET_SERVICE_NAME, 'DepositMoney')
    private depositMoney(payload: DepositMoneyRequestDto): Promise<DepositMoneyResponse> {
        return this.service.depositMoney(payload);
    }

    @GrpcMethod(WALLET_SERVICE_NAME, 'DepositMoney')
    private withdrawMoney(payload: WithdrawMoneyRequestDto): Promise<WithdrawMoneyResponse> {
        return this.service.withdrawMoney(payload);
    }

    @GrpcMethod(WALLET_SERVICE_NAME, 'CustomerWallets')
    private customerWallets(payload: CreateWalletRequestDto): Promise<CustomerWalletsResponse> {
        return this.service.customerWallets(payload);
    }
}