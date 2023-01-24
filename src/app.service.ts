import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit, OnApplicationShutdown {
  onApplicationShutdown(signal?: string) {
    console.log('application shutdown...');
  }
  onModuleInit() {
    console.log('app module init...');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
