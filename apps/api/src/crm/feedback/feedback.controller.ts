import { Controller, Get } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('crm/feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }
}
