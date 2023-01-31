import { endpoint } from './../../node_modules/aws-sdk/clients/sns.d';
import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { processEnv } from 'src/common/constant/process-env';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(configService: ConfigService) {
    const envUrl = processEnv.DATABASE_URL;
    const configUrl = configService.get('DATABASE_URL');
    super({
      log: ['query', 'info', 'warn', 'error'],
      datasources: {
        db: {
          url: envUrl || configUrl,
        },
      },
    });
  }

  async onModuleInit() {
    this.configSqlLog();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  private async configSqlLog() {
    this.$on('query', (event) => {
      this.logger.log(
        `Query: ${event.query}`,
        `Params: ${event.params}`,
        `Duration: ${event.duration} ms`,
      );
    });
    this.$on('info', (event) => {
      this.logger.log(`message: ${event.message}`);
    });
    this.$on('error', (event) => {
      this.logger.log(`error: ${event.message}`);
    });
    this.$on('warn', (event) => {
      this.logger.log(`warn: ${event.message}`);
    });
    await this.$connect();
  }
}
