[返回功能介绍](/feature/)

# 说明

这里的消息队列用到的是`bull`, `nestjs`对 bull进行了封装，能够更加的方便我们使用，这里用的是redis进行存储。

## 使用场景

1. 微服务架构：
2. 分布式系统中的消息传递；
3. 数据导流和数据缓存；
4. 异步任务处理；
5. 消息通知；
6. 应用程序的事件驱动。



## 代码示例

这里通过`@InjectQueue`注解注入了一个消息队列，可以往这个消息队列中添加一个名字和任意类型的数据进行处理，这里假设我们需要对媒体文件进行转码处理。

```typescript
constructor(@InjectQueue(queueNames.queue) private readonly queue: Queue) {}

  @Post('transcode')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'file',
    type: FileDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  async transcode(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    await this.queue.add(jobNames.transcode, {
      file: file,
    });
  }
```

然后我们需要一个处理器来处理收到的队列信息，通过`@Processor(queueNames.transcode)`注解来绑定一个消息队列，再在方法体上使用`@Process(jobNames.transcode)`对job进行处理。

```typescript
@Processor(queueNames.queue)
export class QueueProcessor {
  private readonly logger = new Logger(QueueProcessor.name);

  @Process(jobNames.transcode)
  async handleTranscode(job: Job) {
    this.logger.debug(`Start transcoding ${job.name}...`);
    await setTimeout(3000);
    this.logger.debug('Transcoding completed');
  }
}
```





## 代码目录结构

```
├── queue.controller.ts
├── queue.module.ts
└── queue.processor.ts
```

