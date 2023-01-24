import { Controller, Get, Query, Req } from '@nestjs/common';
import { MailService } from './mail.service';
import { SentMessageInfo } from 'nodemailer';

@Controller('/mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('/sendMail')
  async sendMail(@Query('mail') mail: string): Promise<SentMessageInfo> {
    const info = await this.mailService.sendMail(mail);
    console.log(info);
    return info;
  }
}
