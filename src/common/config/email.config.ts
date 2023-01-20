import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

export default () => ({
  transport: 'smtps://suzukaze.hazuki2024@gmail.com:Xiaomo2023@smtp.gmail.com',
  defaults: {
    from: 'xiaomo <suzukaze.hazuki2024>',
  },
  template: {
    dir: __dirname + '/templates',
    adapter: new EjsAdapter(),
    options: {
      strict: true,
    },
  },
});
