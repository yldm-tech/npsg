import { ChatService } from './chat.service';
import { PrismaService } from 'prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';

@Module({
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, PrismaService],
})
export class ChatModule {}
