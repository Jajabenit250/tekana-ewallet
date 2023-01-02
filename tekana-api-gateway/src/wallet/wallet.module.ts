import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WALLET_SERVICE_NAME, WALLET_PACKAGE_NAME } from './wallet.pb';
import { WalletController } from './wallet.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: WALLET_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: WALLET_PACKAGE_NAME,
          protoPath: 'node_modules/tekana-protos/proto/wallet.proto',
        },
      },
    ]),
  ],
  controllers: [WalletController],
})
export class WalletModule { }
