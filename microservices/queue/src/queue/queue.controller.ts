import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { InjectQueue } from '@nestjs/bull';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Queue } from 'bull';
import { queueNames, jobNames } from './queue.constant';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from './file-upload.dto';

@Controller('queue')
@ApiTags('queue')
export class QueueController {
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
    file,
  ) {
    const result = await this.queue.add(jobNames.transcode, {
      file: file,
    });
    return result;
  }
}
