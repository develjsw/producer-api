import { InjectQueue } from '@nestjs/bull';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Job, JobOptions, Queue } from 'bull';

@Injectable()
export class MemberQueueService implements OnModuleInit {
    constructor(@InjectQueue('member') private memberQueue: Queue) {}

    async addMemberJob(data: unknown, option?: JobOptions): Promise<Job> {
        return await this.memberQueue.add('createMemberJob', data, option);
    }

    onModuleInit(): void {
        this.memberQueue.on('error', (err) => {
            console.error('Bull 오류 :', err);
        });

        this.memberQueue.on('failed', (job: Job<unknown>, err) => {
            console.error(`작업 ${job.id} 실패 :`, err);
        });

        this.memberQueue.on('stalled', (job: Job<unknown>) => {
            console.error(`작업 ${job.id}이 정체됨`);
        });
    }
}
