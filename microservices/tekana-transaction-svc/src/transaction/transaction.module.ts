import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';
import { WALLET_SERVICE_NAME, WALLET_PACKAGE_NAME } from './proto/wallet.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: WALLET_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: `${process.env.WALLET_SVC_URL}:${process.env.WALLET_SVC_PORT}`,
          package: WALLET_PACKAGE_NAME,
          protoPath: 'node_modules/tekana-protos/proto/wallet.proto',
        },
      },
    ]),
    TypeOrmModule.forFeature([Transaction]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
