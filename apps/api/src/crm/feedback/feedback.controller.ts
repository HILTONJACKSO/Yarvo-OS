import { Controller, Get, Headers } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('crm/feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.feedbackService.findAll(businessId);
  }
}
