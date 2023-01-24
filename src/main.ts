import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { PrismaClientExceptionFilter } from './common/filter/prisma-client-exception_filter';
import { LoggingInterceptor } from './common/interceptor/logger.interceptor';
import { ExcludeNullInterceptor } from './common/interceptor/exclude-null.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global pipes
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // global interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ExcludeNullInterceptor());

  // apply the exception filters to the entire application
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // swagger configuration
  const config = new DocumentBuilder()
    .setTitle('nest-api')
    .setDescription('The nest API description')
    .addBasicAuth()
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableShutdownHooks();
  await app.listen(3000);
}

bootstrap();
