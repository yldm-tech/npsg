import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckService,
  HttpHealthIndicator,
  DiskHealthIndicator,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { PrismaHealthIndicator } from './prisma.indicator';

@Controller('health')
@ApiTags('app')
export class HealthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly prismaHealthIndicator: PrismaHealthIndicator,
    private readonly microservice: MicroserviceHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('basic check', 'http://localhost:3000'),
      () => this.disk.checkStorage('storage', { path: '/', threshold: 1 }),
      () => this.memory.checkHeap('memory_heap', 100 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 100 * 1024 * 1024),
      () => this.prismaHealthIndicator.isHealthy('prisma'),
    ]);
  }
}
