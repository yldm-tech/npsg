import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { CacheModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { OrderModule } from './order/order.module';
import { PostsModule } from './posts/posts.module';
import { PrismaService } from './prisma/prisma.service';
import { QueueModule } from './queue/queue.module';
import { FileModule } from './file/file.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_GUARD } from '@nestjs/core';
import { ChatModule } from './chat/chat.module';
import { HealthModule } from './health/health.module';
import { processEnv } from './common/constant/process-env';

@Module({
  imports: [
    ChatModule,
    PostsModule,
    UserModule,
    AuthModule,
    ConfigModule,
    MailModule,
    QueueModule,
    OrderModule,
    FileModule,
    HealthModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    HttpModule.register({
      timeout: 60 * 1000,
      maxRedirects: 5,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host:
            configService.get('REDIS_HOST') ||
            processEnv.REDIS_HOST ||
            '127.0.0.1',
          port:
            processEnv.REDIS_PORT || configService.get('REDIS_PORT') || 6379,
          username:
            configService.get('REDIS_USERNAME') ||
            processEnv.REDIS_USERNAME ||
            '',
          password:
            configService.get('REDIS_PASSWORD') ||
            processEnv.REDIS_PASSWORD ||
            '',
        },
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('RATE_TTL') || 60,
        limit: configService.get('RATE_LIMIT') || 10,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        debug: configService.get<boolean>('DEBUG'),
        playground: false,
        subscriptions: {
          'graphql-ws': true,
        },
        sortSchema: true,
        autoSchemaFile: join(__dirname, '../docs/schema.gql'),
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        cors: {
          origin: '*',
          credentials: true,
        },
        buildSchemaOptions: {
          directives: [
            new GraphQLDirective({
              name: 'upper',
              locations: [DirectiveLocation.FIELD_DEFINITION],
            }),
          ],
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    // 如果不需要全局速率限制，可以在这里把这里注释掉
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // 配置中间件
    consumer
      .apply(LoggerMiddleware)
      // .exclude({ path: 'hello', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
