import { Injectable } from '@nestjs/common';
import { Chat } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatEntity } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}
  async createMessage(chat: ChatEntity): Promise<Chat> {
    return await this.prisma.chat.create({
      data: chat,
    });
  }

  async getMessages(): Promise<Chat[]> {
    return await this.prisma.chat.findMany();
  }
}
