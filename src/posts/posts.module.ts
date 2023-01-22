import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsResolver } from './posts.resolver';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService, PostsResolver],
})
export class PostsModule {}
