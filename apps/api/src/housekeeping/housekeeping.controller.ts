import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { HousekeepingService } from './housekeeping.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('housekeeping')
export class HousekeepingController {
  constructor(private readonly housekeepingService: HousekeepingService) {}

  @Get('stats')
  getStats(@Request() req: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.housekeepingService.getStats(businessId);
  }

  @Get('rooms')
  getRooms(@Request() req: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.housekeepingService.getRooms(businessId);
  }

  @Get('tasks')
  getTasks(@Request() req: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.housekeepingService.getTasks(businessId);
  }

  @Post('tasks')
  createTask(@Request() req: any, @Body() payload: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.housekeepingService.createTask(businessId, payload);
  }

  @Patch('tasks/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.housekeepingService.updateTaskStatus(id, status);
  }

  @Get('inspections')
  getInspections(@Request() req: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.housekeepingService.getInspections(businessId);
  }

  @Get('stay-over')
  getStayOver(@Request() req: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.housekeepingService.getStayOver(businessId);
  }

  @Get('linen/items')
  getLinenItems(@Request() req: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.housekeepingService.getLinenItems(businessId);
  }

  @Get('linen/movements')
  getLinenMovements(@Request() req: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.housekeepingService.getLinenMovements(businessId);
  }

  @Post('linen/movements')
  createLinenMovement(@Request() req: any, @Body() payload: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    const userId = req.user.userId;
    return this.housekeepingService.createLinenMovement(businessId, userId, payload);
  }

  @Get('lost-and-found')
  getLostAndFound(@Request() req: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.housekeepingService.getLostAndFound(businessId);
  }

  @Post('lost-and-found')
  createLostAndFound(@Request() req: any, @Body() payload: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    const userId = req.user.userId;
    return this.housekeepingService.createLostAndFound(businessId, userId, payload);
  }

  @Get('reports')
  getReports(@Request() req: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.housekeepingService.getReports(businessId);
  }
}
