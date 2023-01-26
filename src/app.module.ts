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
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { MailModule } from './mail/mail.module';
import { OrderModule } from './order/order.module';
import { PostsModule } from './posts/posts.module';
import { PrismaService } from './prisma/prisma.service';
import { QueueModule } from './queue/queue.module';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    // CronModule, // 定义任务(👈schedule根据需要打开或关闭)
    PostsModule, // 文章模块(CRUD)
    UserModule, // 用户模块(resolver)
    AuthModule, // 认证服务(passport + jwt)
    MailModule, // 邮件发送 (nodemailer)
    QueueModule, // 消息队列 (bull)
    OrderModule, // 订单模块 (event)
    FileModule, // 文件上传下载 (aws sdk)
    // common modules
    EventEmitterModule.forRoot(), // 👈 事件模块
    HttpModule.register({
      // 👈 http 请求模块
      timeout: 60 * 1000,
      maxRedirects: 5,
    }),
    CacheModule.register({
      // 👈 缓存模块
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      // 👈 配置模块
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      // 👈 消息队列模块
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
      // 👈 GraphQL 模块
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
      autoSchemaFile: join(__dirname, '../docs/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
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
