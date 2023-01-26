import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { setTimeout } from 'timers/promises';

@Processor('queue')
export class QueueProcessor {
  private readonly logger = new Logger(QueueProcessor.name);

  @Process('transcode')
  handleTranscode(job: Job) {
    this.logger.debug('Start transcoding...');
    setTimeout(3000);
    this.logger.debug(job.data);
    this.logger.debug('Transcoding completed');
  }
}
