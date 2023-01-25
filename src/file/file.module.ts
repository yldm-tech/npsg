import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController as FileController } from './file.controller';

@Module({
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
