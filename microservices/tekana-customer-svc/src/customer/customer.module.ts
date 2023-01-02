import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';

@Module({
  controllers: [CustomerController]
})
export class CustomerModule {}
