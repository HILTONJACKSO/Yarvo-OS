import { Controller, Get, Post, Patch, Body, Param, UseGuards, Req, Headers } from '@nestjs/common';
import { EventSpacesService } from './event-spaces.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('event-spaces')
export class EventSpacesController {
  constructor(private readonly service: EventSpacesService) {}

  @Get()
  findAll(@Req() req: any) {
    const branchId = req.headers['x-branch-id'];
    const businessId = req.headers['x-business-id'] || req.user?.businessId;
    return this.service.findAll(businessId, branchId);
  }

  @Post()
  create(@Req() req: any, @Body() data: any) {
    const branchId = req.headers['x-branch-id'] || data.branchId;
    const businessId = req.headers['x-business-id'] || req.user?.businessId;
    return this.service.create(businessId, branchId, data);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() data: any) {
    const branchId = req.headers['x-branch-id'] || data.branchId;
    const businessId = req.headers['x-business-id'] || req.user?.businessId;
    return this.service.update(businessId, branchId, id, data);
  }
}
