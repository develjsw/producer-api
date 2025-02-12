import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { MemberQueueService } from './service/member-queue.service';
import { CreateMemberDto } from './dto/create-member.dto';

@Controller('queue/members')
export class MemberQueueController {
    constructor(private readonly memberService: MemberQueueService) {}

    @Post()
    async createLoginMember(
        @Body(new ValidationPipe({ transform: true }))
        createMemberDto: CreateMemberDto
    ): Promise<{ jobId: string | number }> {
        const job = await this.memberService.addMemberJob(createMemberDto);

        return {
            jobId: job.id
        };
    }
}
