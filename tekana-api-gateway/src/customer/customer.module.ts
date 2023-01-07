import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CustomerController } from './customer.controller';
import { CUSTOMER_SERVICE_NAME, CUSTOMER_PACKAGE_NAME } from './customer.pb';
import { CustomerService } from './customer.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: CUSTOMER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: `${process.env.CUSTOMER_SVC_URL}:${process.env.CUSTOMER_SVC_PORT}`,
          package: CUSTOMER_PACKAGE_NAME,
          protoPath: 'node_modules/tekana-protos/proto/customer.proto',
        },
      },
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
