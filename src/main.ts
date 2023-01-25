import {
  ValidationPipe,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { doc } from 'prettier';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './common/filter/prisma-client-exception_filter';
import { ExcludeNullInterceptor } from './common/interceptor/exclude-null.interceptor';
import { LoggingInterceptor } from './common/interceptor/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: false,
      forbidUnknownValues: false,
    }),
  );

  // global interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ExcludeNullInterceptor());

  // apply the exception filters to the entire application
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // version
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });

  // cookie
  app.use(cookieParser());

  // swagger configuration
  const config = new DocumentBuilder()
    .setTitle('nest-api')
    .setDescription('The nest API description')
    .addBasicAuth()
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  // swagger json
  const jsonDocument = JSON.stringify(
    JSON.parse(JSON.stringify(document)),
    null,
    2,
  );
  console.log(jsonDocument);
  fs.writeFileSync(join(__dirname, '../docs/swagger.json'), jsonDocument);
  // swagger yaml
  const yamlDocument = yaml.dump(document);
  fs.writeFileSync(join(__dirname, '../docs/swagger.yaml'), yamlDocument);

  app.enableShutdownHooks();
  // session
  app.use(
    session({
      secret: 'session',
      resave: false,
      saveUninitialized: false,
    }),
  );

  // static
  app.useStaticAssets(join(__dirname, '..', 'static'));

  await app.listen(3000);
}

bootstrap();
