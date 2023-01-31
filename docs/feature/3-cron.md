#### [返回功能介绍](/feature/)
---

# 使用场景
定义任务可以帮我们做一在未来某一个时间点执行的工作，比如定时拉取信息、清理数据等。除了定时任务之后，还有延时任务，周期性任务等等。

## CronModule
定时任务是通过`ScheduleModule`来实现的功能，这个模块是`@nextjs自带的`。

## CronService
- `@Cron`可以通过表达式设置一些定时的或者周期性的任务
```typescript
  /**
   * 每xx秒调用一次
   */
  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.logger.debug('Called when the current second is 45');
  }
```
- `@Interval`可以设置周期性的任务，使用起来比`@Cron`要简单
```typescript
  /**
   * 每10秒调用一次
   */
  @Interval(10000)
  handleInterval() {
    this.logger.debug('Called every 10 seconds');
  }
```

- `@Timeout`可以用来延时执行任务

  ```typescript
    /**
     * 5秒后调用一次
     */
    @Timeout(5000)
    handleTimeout() {
      this.logger.debug('Called once after 5 seconds');
    }
  
  ```

- 通过`this.schedulerRegistry`动态查询、添加、删除定时任务、延时任务和周期任务
```typescript
    doesExists: (type: 'cron' | 'timeout' | 'interval', name: string) => boolean;
    doesExist(type: 'cron' | 'timeout' | 'interval', name: string): boolean;
    getCronJob(name: string): CronJob;
    getInterval(name: string): any;
    getTimeout(name: string): any;
    addCronJob(name: string, job: CronJob): void;
    addInterval<T = any>(name: string, intervalId: T): void;
    addTimeout<T = any>(name: string, timeoutId: T): void;
    getCronJobs(): Map<string, CronJob>;
    deleteCronJob(name: string): void;
    getIntervals(): string[];
    deleteInterval(name: string): void;
    getTimeouts(): string[];
    deleteTimeout(name: string): void;
```

## 代码目录结构

```
├── cron.module.ts
└── cron.service.ts
```