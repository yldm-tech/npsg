import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Render, Res } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
@ApiTags('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  /**
   *
   * @returns chat.ejs
   */
  @Render('chat')
  @Get('')
  Home() {
    return { message: 'Hello world!' };
  }

  /**
   * 供chat.ejs中的ajax请求调用;
   * @param res
   */
  @Get('api/chat')
  async Chat(@Res() res) {
    const messages = await this.chatService.getMessages();
    res.json(messages);
  }
}
