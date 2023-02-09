import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueProcessor } from './queue.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'queue',
    }),
  ],
  controllers: [QueueController],
  providers: [QueueProcessor],
})
export class QueueModule {}
