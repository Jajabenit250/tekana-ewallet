import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';

@Module({
  controllers: [TransactionController]
})
export class TransactionModule {}
