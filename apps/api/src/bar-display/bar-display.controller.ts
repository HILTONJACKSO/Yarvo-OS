import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { BarDisplayService } from './bar-display.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('bar-display')
export class BarDisplayController {
  constructor(private readonly barDisplayService: BarDisplayService) {}

  @Get('tickets')
  getTickets() {
    return this.barDisplayService.getTickets();
  }

  @Patch('tickets/:id/status')
  updateTicketStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.barDisplayService.updateTicketStatus(id, status);
  }
}
