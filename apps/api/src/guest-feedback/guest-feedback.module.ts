import { Module } from '@nestjs/common';
import { GuestFeedbackService } from './guest-feedback.service';
import { GuestFeedbackController } from './guest-feedback.controller';

@Module({
  controllers: [GuestFeedbackController],
  providers: [GuestFeedbackService],
})
export class GuestFeedbackModule {}
