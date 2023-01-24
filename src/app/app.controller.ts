import { MailService } from './../mail/mail.service';
import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';

@Controller({ version: VERSION_NEUTRAL })
export class AppController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  getHello(): string {
    return 'hello';
  }

  /**
   * http://localhost:3000/v1
   * @returns
   */
  @Get()
  @Version('1')
  getHelloV1(): string {
    return 'hello v1';
  }

  /**
   * http://localhost:3000/v2
   * @returns
   */
  @Get()
  @Version('2')
  getHelloV2(): string {
    return 'hello v2';
  }
}
