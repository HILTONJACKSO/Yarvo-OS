import { Controller, Get } from '@nestjs/common';
import { OnlineBookingRequestsService } from './online-booking-requests.service';

@Controller('online-booking-requests')
export class OnlineBookingRequestsController {
  constructor(private readonly onlineRequestsService: OnlineBookingRequestsService) {}

  @Get()
  findAll() {
    return this.onlineRequestsService.findAll();
  }
}
