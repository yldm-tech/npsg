import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(AppService.name);
  onApplicationShutdown(signal?: string) {
    this.logger.log('application shutdown...');
  }
  onModuleInit() {
    this.logger.log('app module init...');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
