#### [返回功能介绍](/feature/)
## 依赖

在`nestjs`中进行健康检查需要依赖到`TerminusModule`和`HttpModule`，`Terminus`提供了不同的`Indicator`来帮助我们做健康检查。

## 说明

这里分别对服务的状态、硬盘、内存、数据库、redis等做是健康状况监测，访问endpoint:`health`就可以获取到对应的健康状况信息，可以通过`status`字段来获取整体状态。

- `基本检查`： http方式检查根路径是否正常可以访问。
- `堆内存`：可以检查代码是否有内存泄漏问题。
- `常驻内存`： 监控进程在RAM中占用的内存。
- `Prisma`: 对数据进连接进行检测。
- `Redis`：对redis是否正常连接进行检测。

```typescript
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('basic check', 'http://localhost:3000'),
      () =>
        this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.2 }),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
      () => this.prismaHealthIndicator.isHealthy('prisma'),
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
              '',
          },
        }),
    ]);
  }
```

## 健康状况详细信息

```json
{
    "status": "error",
    "info": {
        "basic check": {
            "status": "up"
        },
        "memory_heap": {
            "status": "up"
        },
        "memory_rss": {
            "status": "up"
        },
        "prisma": {
            "status": "up"
        },
        "redis": {
            "status": "up"
        }
    },
    "error": {
        "storage": {
            "status": "down",
            "message": "Used disk storage exceeded the set threshold"
        }
    },
    "details": {
        "basic check": {
            "status": "up"
        },
        "memory_heap": {
            "status": "up"
        },
        "memory_rss": {
            "status": "up"
        },
        "prisma": {
            "status": "up"
        },
        "redis": {
            "status": "up"
        },
        "storage": {
            "status": "down",
            "message": "Used disk storage exceeded the set threshold"
        }
    }
}
```



## 代码目录结构

```typescript
├── health.controller.ts
├── health.module.ts
└── prisma.indicator.ts
```

