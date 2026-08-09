import { Controller, Get, Query } from '@nestjs/common';
import { GuestFoliosService } from './guest-folios.service';

@Controller('guest-folios')
export class GuestFoliosController {
  constructor(private readonly guestFoliosService: GuestFoliosService) {}

  @Get()
  getFolios(@Query('status') status?: string) {
    return this.guestFoliosService.getFolios(status);
  }
}
