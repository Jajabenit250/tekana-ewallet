import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '../entity/wallet.entity';
import {
  CreateWalletRequestDto,
  WithdrawMoneyRequestDto,
  DepositMoneyRequestDto,
  FindOneRequestDto,
  CustomerWalletsRequestDto,
} from '../wallet.dto';
import {
  CreateWalletResponse,
  WithdrawMoneyResponse,
  DepositMoneyResponse,
  FindOneResponse,
  CustomerWalletsResponse,
} from '../wallet.pb';
import { WalletActivityLog } from '../entity/wallet-activity-log.entity';
import { AccountService } from './account.service';

@Injectable()
export class WalletService {
  @InjectRepository(Wallet)
  private readonly repository: Repository<Wallet>;

  @InjectRepository(WalletActivityLog)
  private readonly activityLogRepository: Repository<WalletActivityLog>;

  @Inject(AccountService)
  private readonly accountService: AccountService;

  public async findOne({
    accNumber,
  }: FindOneRequestDto): Promise<FindOneResponse> {
    const wallet: Wallet = await this.repository.findOne({
      where: { accNumber },
      relations: {
        walletActivityLogs: true,
      },
    });

    if (!wallet) {
      return {
        data: null,
        error: ['Wallet not found'],
        status: HttpStatus.NOT_FOUND,
      };
    }

    return { data: wallet, error: null, status: HttpStatus.OK };
  }

  public async createWallet(
    payload: CreateWalletRequestDto,
  ): Promise<CreateWalletResponse> {
    const wallet: Wallet = new Wallet();

    wallet.customerId = payload.customerId;
    wallet.walletType = payload.walletType;

    // generate acc number and starting balance
    wallet.accNumber = this.accountService.generateCustomerNumber(
      payload.customerId,
    );
    wallet.balance = 0;

    await this.repository.save(wallet);

    return { id: wallet.id, error: null, status: HttpStatus.OK };
  }

  public async withdrawMoney({
    accNumber,
    amount,
    transactionId,
  }: WithdrawMoneyRequestDto): Promise<WithdrawMoneyResponse> {
    const wallet: Wallet = await this.repository.findOne({
      select: ['id', 'balance'],
      where: { accNumber },
    });

    if (!wallet) {
      return { error: ['Wallet not found'], status: HttpStatus.NOT_FOUND };
    } else if (wallet.balance <= amount) {
      return {
        error: ['No available funds to complete transaction'],
        status: HttpStatus.CONFLICT,
      };
    }

    const isAlreadyWithrawn: number = await this.activityLogRepository.count({
      where: { transactionId, action: 'debit' },
    });

    if (isAlreadyWithrawn) {
      // Idempotence
      return {
        error: ['Money already reduced from your account'],
        status: HttpStatus.CONFLICT,
      };
    }

    await this.repository.update(
      { id: wallet.id },
      {
        balance: parseFloat(wallet.balance.toString()) - amount,
      },
    );
    await this.activityLogRepository.insert({
      wallet,
      transactionId,
      action: 'debit',
      amount: amount,
    });

    return { error: null, status: HttpStatus.OK };
  }

  public async depositMoney({
    accNumber,
    amount,
    transactionId,
  }: DepositMoneyRequestDto): Promise<DepositMoneyResponse> {
    const wallet: Wallet = await this.repository.findOne({
      select: ['id', 'balance'],
      where: { accNumber },
    });

    if (!wallet) {
      return { error: ['Wallet not found'], status: HttpStatus.NOT_FOUND };
    }

    const isAlreadyDeposited: number = await this.activityLogRepository.count({
      where: { transactionId, action: 'credit' },
    });

    if (isAlreadyDeposited) {
      // Idempotence
      return {
        error: ['Money already added to your account'],
        status: HttpStatus.CONFLICT,
      };
    }

    await this.repository.update(
      { id: wallet.id },
      {
        balance: parseFloat(wallet.balance.toString()) + amount,
      },
    );

    await this.activityLogRepository.insert({
      wallet,
      transactionId,
      action: 'credit',
      amount: amount,
    });

    return { error: null, status: HttpStatus.OK };
  }

  public async customerWallets({
    customerId,
  }: CustomerWalletsRequestDto): Promise<CustomerWalletsResponse> {
    const wallet: Wallet[] = await this.repository.find({
      where: { customerId },
      relations: {
        walletActivityLogs: true,
      },
    });

    if (!wallet) {
      return {
        data: null,
        error: ['Wallet not found'],
        status: HttpStatus.NOT_FOUND,
      };
    }

    return { data: wallet, error: null, status: HttpStatus.OK };
  }
}
