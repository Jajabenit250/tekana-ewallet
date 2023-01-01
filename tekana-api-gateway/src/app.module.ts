import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TransactionModule } from './transaction/transaction.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [CustomerModule, TransactionModule, WalletModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
