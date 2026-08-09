import { Controller, Get } from '@nestjs/common';
import { ReservationWaitlistService } from './reservation-waitlist.service';

@Controller('reservation-waitlist')
export class ReservationWaitlistController {
  constructor(private readonly waitlistService: ReservationWaitlistService) {}

  @Get()
  findAll() {
    return this.waitlistService.findAll();
  }
}
