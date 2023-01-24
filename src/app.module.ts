import { OrderModule } from './order/order.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from './prisma/prisma.service';
import { BullModule } from '@nestjs/bull';
import { CacheModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UserModule } from './user/user.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { HttpModule } from '@nestjs/axios';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { CronJobService } from 'src/cron/cron.service';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    PostsModule,
    UserModule,
    ConfigModule,
    MailModule,
    QueueModule,
    OrderModule,
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
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: false,
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, CronJobService],
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
