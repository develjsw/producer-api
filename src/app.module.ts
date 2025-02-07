import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { MemberQueueModule } from './queue/member/member-queue.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: '127.0.0.1',
        port: 6379,
      },
    }),
    MemberQueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
