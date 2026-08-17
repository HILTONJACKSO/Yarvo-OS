import { Controller, Get, Headers } from '@nestjs/common';
import { GuestRequestsService } from './guest-requests.service';

@Controller('guest-requests')
export class GuestRequestsController {
  constructor(private readonly guestRequestsService: GuestRequestsService) {}

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.guestRequestsService.findAll(businessId);
  }

  @Get('stats')
  getStats() {
    return this.guestRequestsService.getStats();
  }
}
