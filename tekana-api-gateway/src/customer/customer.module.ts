import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CustomerController } from './customer.controller';
import { CUSTOMER_SERVICE_NAME, CUSTOMER_PACKAGE_NAME } from './customer.pb';
import { CustomerService } from './customer.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: CUSTOMER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
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
export class CustomerModule { }
