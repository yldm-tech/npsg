import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, Query } from "@nestjs/common";
import { SentMessageInfo } from "nodemailer";
import { MailService } from "./mail.service";

@Controller('/mail')
@ApiTags('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('/sendMail')
  async sendMail(@Query('mail') mail: string): Promise<SentMessageInfo> {
    return await this.mailService.sendMail(mail);
  }
}
