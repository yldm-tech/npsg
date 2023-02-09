import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisOptions, Transport } from '@nestjs/microservices';
import {
  HealthCheckService,
  HttpHealthIndicator,
  DiskHealthIndicator,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
  HealthCheck
} from '@nestjs/terminus';
import { processEnv } from '@lantron-ltd/npsg-utils/src/constant/process-env';

@Controller('health')
@ApiTags('app')
export class HealthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly microservice: MicroserviceHealthIndicator
  ) {
  }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('basic check', 'http://localhost:3000'),
      () => this.disk.checkStorage('storage', { path: '/', threshold: 1 }),
      () => this.memory.checkHeap('memory_heap', 100 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 100 * 1024 * 1024),
      () =>
        this.microservice.pingCheck<RedisOptions>('redis', {
          transport: Transport.REDIS,
          options: {
            host: this.configService.get('REDIS_HOST') || 'localhost',
            port: this.configService.get('REDIS_PORT') || 6379,
            username:
              this.configService.get('REDIS_USERNAME') ||
              processEnv.REDIS_USERNAME ||
              '',
            password:
              this.configService.get('REDIS_PASSWORD') ||
              processEnv.REDIS_PASSWORD ||
              ''
          }
        })
    ]);
  }
}
