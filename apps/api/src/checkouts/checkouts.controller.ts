import { Controller, Get } from '@nestjs/common';
import { CheckoutsService } from './checkouts.service';

@Controller('checkouts')
export class CheckoutsController {
  constructor(private readonly checkoutsService: CheckoutsService) {}

  @Get('stats')
  getStats() {
    return this.checkoutsService.getStats();
  }

  @Get('departures')
  getDepartures() {
    return this.checkoutsService.getDepartures();
  }

  @Get('pending')
  getPending() {
    return this.checkoutsService.getPending();
  }

  @Get('history')
  getHistory() {
    return this.checkoutsService.getHistory();
  }

  @Get('outstanding')
  getOutstanding() {
    return this.checkoutsService.getOutstanding();
  }
}
