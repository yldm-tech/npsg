import { PrismaService } from './../prisma/prisma.service';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from '../posts/posts.module';
import { LoggerMiddleware } from '../common/middleware/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import emailConfig from '../common/config/email.config';
import { UserModule } from '../user/user.module';
import { EmailModule } from '../email/email.module';
import { ConfigService } from '@nestjs/config';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DirectiveLocation, GraphQLDirective } from 'graphql';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [emailConfig],
    }),
    // EmailModule.apply({
    //   useFactory: () => emailConfig(),
    //   inject: [ConfigService],
    // }),
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
    PostsModule,
    UserModule,
    // EmailModule,
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
