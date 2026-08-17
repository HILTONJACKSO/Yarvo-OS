import { Controller, Get, Headers } from '@nestjs/common';
import { OnlineBookingRequestsService } from './online-booking-requests.service';

@Controller('online-booking-requests')
export class OnlineBookingRequestsController {
  constructor(private readonly onlineRequestsService: OnlineBookingRequestsService) {}

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.onlineRequestsService.findAll(businessId);
  }
}
