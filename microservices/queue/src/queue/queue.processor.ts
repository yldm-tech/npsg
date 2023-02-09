import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { setTimeout } from 'timers/promises';
import { queueNames, jobNames } from './queue.constant';

@Processor(queueNames.queue)
export class QueueProcessor {
  private readonly logger = new Logger(QueueProcessor.name);

  @Process(jobNames.transcode)
  async handleTranscode(job: Job) {
    this.logger.debug(`Start job: ${job.name}...`);
    await setTimeout(3000);
    this.logger.debug(job.data);
    this.logger.debug('Transcoding completed');
  }
}
