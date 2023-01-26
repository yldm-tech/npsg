import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobService } from './cron.service';

@Module({
  imports: [ScheduleModule.forRoot()], // 👈 定时任务模块
  providers: [CronJobService],
})
export class CronModule {}
