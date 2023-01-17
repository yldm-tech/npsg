import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export default () => ({
  transport: 'smtps://suzukaze.hazuki2024@gmail.com:Xiaomo2023@smtp.gmail.com',
  defaults: {
    from: 'xiaomo <suzukaze.hazuki2024>',
  },
  template: {
    dir: __dirname + '/templates',
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
});
