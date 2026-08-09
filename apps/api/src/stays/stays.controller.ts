import { Controller, Get } from '@nestjs/common';
import { StaysService } from './stays.service';

@Controller('stays')
export class StaysController {
  constructor(private readonly staysService: StaysService) {}

  @Get('in-house')
  getInHouse() {
    return this.staysService.getInHouse();
  }

  @Get('front-desk-stats')
  getFrontDeskStats() {
    return this.staysService.getFrontDeskStats();
  }
}
