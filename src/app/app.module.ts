import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PostsModule } from '../posts/posts.module';
import { LoggerMiddleware } from '../common/middleware/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import emailConfig from '../common/config/email.config';
// import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [emailConfig],
    }),
    // MailerModule.forRootAsync({
    //   useFactory: (config: ConfigService) => config.get('emailConfig'),
    //   inject: [ConfigService],
    // }),
    PrismaModule,
    PostsModule,
    // EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
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
