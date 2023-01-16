import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { PrismaClientExceptionFilter } from './filter/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // With whitelist set to true validator will strip validated object of any properties that do not have any decorators.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // swagger configuration
  const config = new DocumentBuilder()
    .setTitle('nest-api')
    .setDescription('The nest API description')
    .addBasicAuth()
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // apply the exception filter to the entire application
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
