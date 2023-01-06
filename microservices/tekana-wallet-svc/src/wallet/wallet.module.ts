import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletController } from './wallet.controller';
import { WalletService } from './services/wallet.service';
import { AccountService } from './services/account.service';
import { Wallet } from './entity/wallet.entity';
import { WalletActivityLog } from './entity/wallet-activity-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, WalletActivityLog])],
  controllers: [WalletController],
  providers: [WalletService, AccountService],
})
export class WalletModule { }