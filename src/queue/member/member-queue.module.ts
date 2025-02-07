import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MemberQueueController } from './member-queue.controller';
import { MemberQueueService } from './service/member-queue.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'member',
    }),
  ],
  controllers: [MemberQueueController],
  providers: [MemberQueueService],
  exports: [],
})
export class MemberQueueModule {}
