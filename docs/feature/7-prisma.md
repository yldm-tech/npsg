[返回功能介绍](/feature/)

# 说明

Prisma是一个ORM数据库，在`prisma.schema`定义好数据结构后通过cli进行`migrage`，则就可以在数据库中自动生成对应的数据表，同时会生成`d.ts`声明文件，方便我们快速的进行开发。



## 数据库配置

在构造函数中通过动态读取配置文件来配置数据库连接，可以非常灵活的使用如`configmap`、`secrets`或者`secret manager`中的配置信息，避免数据库信息存放在源码当中。

```typescript
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
```



## SQL日志和性能监测

在项目启动时对数据库的生命周期函数`query`、`info`、`error`、`warn`、进行监听，并进行对应级别的日志输出。

```typescript
async onModuleInit() {
    this.$on('query', (event) => {
      this.logger.log(
        `Query: ${event.query}`,
        `Params: ${event.params}`,
        `Duration: ${event.duration} ms`,
      );
    });
    this.$on('info', (event) => {
      this.logger.log(`${event.message}`);
    });
    this.$on('error', (event) => {
      this.logger.error(`${event.message}`);
    });
    this.$on('warn', (event) => {
      this.logger.warn(` ${event.message}`);
    });
    await this.$connect();
  }
```



## 优雅退出

在关闭数据库之前需要等待app的进程退出

```typescript
 async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
```





## 代码目录结构

```
├── prisma.module.ts
└── prisma.service.ts
```

