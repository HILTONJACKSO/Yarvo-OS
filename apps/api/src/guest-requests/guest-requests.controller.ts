import { Controller, Get } from '@nestjs/common';
import { GuestRequestsService } from './guest-requests.service';

@Controller('guest-requests')
export class GuestRequestsController {
  constructor(private readonly guestRequestsService: GuestRequestsService) {}

  @Get()
  findAll() {
    return this.guestRequestsService.findAll();
  }

  @Get('stats')
  getStats() {
    return this.guestRequestsService.getStats();
  }
}
