import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { HealthModule } from './health/health.module';
import { PostsModule } from './posts/posts.module';
import { PrismaService } from './prisma/prisma.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    PostsModule,
    ConfigModule,
    HealthModule,
    HttpModule.register({
      timeout: 60 * 1000,
      maxRedirects: 5
    }),
    CacheModule.register({
      isGlobal: true
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('RATE_TTL') || 60,
        limit: configService.get('RATE_LIMIT') || 10
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    // 如果不需要全局速率限制，可以在这里把这里注释掉
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {

}
