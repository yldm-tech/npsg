import { MailService } from './../mail/mail.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  getHello(): string {
    return 'hello';
  }
}
