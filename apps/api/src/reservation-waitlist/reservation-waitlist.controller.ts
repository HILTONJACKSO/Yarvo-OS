import { Controller, Get, Headers } from '@nestjs/common';
import { ReservationWaitlistService } from './reservation-waitlist.service';

@Controller('reservation-waitlist')
export class ReservationWaitlistController {
  constructor(private readonly waitlistService: ReservationWaitlistService) {}

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.waitlistService.findAll(businessId);
  }
}
