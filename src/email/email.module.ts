import { Module } from '@nestjs/common';
import { MailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { EmailService } from './email.service';


@Module({
    imports:[
        MailerModule.forRootAsync({
            useFactory: () => ({
              transport: 'smtps://suzukaze.hazuki2024@gmail.com:Xiaomo2023@smtp.gmail.com',
              defaults: {
                from: '"xiaomo" <suzukaze.hazuki2024>',
              },
              template: {
                dir: __dirname + '/templates',
                adapter: new PugAdapter(),
                options: {
                  strict: true,
                },
              },
            }),
          })
    ],
    providers:[EmailService]
})
export class EmailModule {

}
