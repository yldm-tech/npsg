import { Injectable } from '@nestjs/common';
import { Chat } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatEntity } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}
  /**
   * 创建消息
   * @param chat chat
   * @returns
   */
  async createMessage(chat: ChatEntity): Promise<Chat> {
    return await this.prisma.chat.create({
      data: chat,
    });
  }

  /**
   * 获取消息
   * @returns 消息列表
   */
  async getMessages(): Promise<Chat[]> {
    return await this.prisma.chat.findMany();
  }
}
