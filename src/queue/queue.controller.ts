import { ApiTags } from '@nestjs/swagger';
import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('queue')
@ApiTags('queue')
export class QueueController {
  constructor(@InjectQueue('queue') private readonly queue: Queue) {}

  @Post('transcode')
  async transcode() {
    await this.queue.add('transcode', {
      file: 'audio.mp3',
    });
  }
}
