import { Controller, Get, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { KitchenDisplayService } from './kitchen-display.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('kitchen-display')
export class KitchenDisplayController {
  constructor(private readonly kitchenDisplayService: KitchenDisplayService) {}

  @Get('tickets')
  getTickets(@Request() req: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.kitchenDisplayService.getTickets(businessId);
  }

  @Patch('tickets/:id/status')
  updateTicketStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.kitchenDisplayService.updateTicketStatus(id, status);
  }
}
