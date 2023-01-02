

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { CustomerService } from './service/customer.service';
import { JwtService } from './service/jwt.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'forTesting',
      signOptions: { expiresIn: '365d' },
    }),
    TypeOrmModule.forFeature([Customer]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, JwtService, JwtStrategy],
})
export class CustomerModule { }