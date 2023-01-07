import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  TRANSACTION_PACKAGE_NAME,
  TRANSACTION_SERVICE_NAME,
} from './transaction.pb';
import { TransactionController } from './transaction.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: TRANSACTION_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: `${process.env.TRANSACTION_SVC_URL}:${process.env.TRANSACTION_SVC_PORT}`,
          package: TRANSACTION_PACKAGE_NAME,
          protoPath: 'node_modules/tekana-protos/proto/transaction.proto',
        },
      },
    ]),
  ],
  controllers: [TransactionController],
})
export class TransactionModule {}
