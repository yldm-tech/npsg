import { Logger, ValidationPipe, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import * as fs from 'fs';
import compression from 'compression';
import * as yaml from 'js-yaml';
import helmet from 'helmet';
import csurf from 'csurf';
import { join } from 'path';
import { AppModule } from './app.module';
import { LoggingInterceptor } from '@lantron-ltd/npsg-utils';
import { ExcludeNullInterceptor } from '@lantron-ltd/npsg-utils';
import { PrismaClientExceptionFilter } from './common/prisma-client-exception_filter';


const logger = new Logger('internal-api');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 提高性能
  app.use(compression());

  // global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
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
    defaultVersion: VERSION_NEUTRAL
  });

  app.enableShutdownHooks();

  // static
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  // cookie
  app.use(cookieParser());
  // security
  app.use(helmet());
  app.enableCors();
  app.use(
    csurf({
      cookie: true,
      value: readCsrfToken
    })
  ); // 必须在cookieParser之后

  // swagger configuration
  const config = new DocumentBuilder()
    .setTitle('nest-api')
    .setDescription('The nest API description')
    .addBasicAuth()
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  // swagger json
  const jsonDocument = JSON.stringify(
    JSON.parse(JSON.stringify(document)),
    null,
    2
  );
  fs.writeFileSync(join(__dirname, '../docs/swagger.json'), jsonDocument);
  // swagger yaml
  const yamlDocument = yaml.dump(document);
  fs.writeFileSync(join(__dirname, '../docs/swagger.yaml'), yamlDocument);

  await app.listen(3000);
}

bootstrap().then(() => logger.log('internal api started.'));

function readCsrfToken(req) {
  return req.csrfToken();
}
