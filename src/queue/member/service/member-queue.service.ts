import { InjectQueue } from '@nestjs/bull';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class MemberQueueService implements OnModuleInit {
    constructor(@InjectQueue('member') private memberQueue: Queue) {}

    async addMemberJob(data: any): Promise<any> {
        await this.memberQueue.add('loginMemberJob', data);
    }

    onModuleInit(): any {
        this.memberQueue.on('error', (err) => {
            console.error('Bull 오류 :', err);
        });

        this.memberQueue.on('failed', (job, err) => {
            console.error(`작업 ${job.id} 실패 :`, err);
        });

        this.memberQueue.on('stalled', (job) => {
            console.error(`작업 ${job.id}이 정체됨`);
        });
    }
}
