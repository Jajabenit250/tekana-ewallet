import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './customer/filter/http-exception.filter';
import { protobufPackage } from './customer/customer.pb';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${process.env.URL}:${process.env.PORT}`,
        package: protobufPackage,
        protoPath: join('node_modules/tekana-protos/proto/customer.proto'),
      },
    },
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen();
}

bootstrap();
