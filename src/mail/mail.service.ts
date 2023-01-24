import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './mail/welcome.hbs',
      context: {
        name: 'xiaomo',
        url: 'https://blog.xiaomo.info',
      },
    });
  }
}
