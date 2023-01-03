import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateWalletRequest, DepositMoneyRequest, FindOneRequest, WithdrawMoneyRequest, CustomerWalletsRequest } from './wallet.pb';

export class FindOneRequestDto implements FindOneRequest {
    @IsNumber({ allowInfinity: false, allowNaN: false })
    public readonly accNumber: string;
}

export class CreateWalletRequestDto implements CreateWalletRequest {
    @IsNumber({ allowInfinity: false, allowNaN: false })
    @IsNotEmpty()
    public readonly customerId: number;

    @IsString()
    @IsNotEmpty()
    public readonly walletType: 'saving' | 'personal' | 'loan' | null;

}

export class DepositMoneyRequestDto implements DepositMoneyRequest {
    @IsString()
    @IsNotEmpty()
    public readonly accNumber: string;

    @IsString()
    @IsNotEmpty()
    public readonly amount: number;

    @IsString()
    @IsNotEmpty()
    public readonly transactionId: number;
}
export class WithdrawMoneyRequestDto implements WithdrawMoneyRequest {
    @IsString()
    @IsNotEmpty()
    public readonly accNumber: string;

    @IsString()
    @IsNotEmpty()
    public readonly amount: number;

    @IsString()
    @IsNotEmpty()
    public readonly transactionId: number;
}
export class CustomerWalletsRequestDto implements CustomerWalletsRequest {
    @IsNumber({ allowInfinity: false, allowNaN: false })
    @IsNotEmpty()
    public readonly customerId: number;
}

