import { Controller, Get, Post, Patch, Body, Param, UseGuards, Req, Headers } from '@nestjs/common';
import { TablesService } from './tables.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tables')
export class TablesController {
  constructor(private readonly service: TablesService) {}

  @Get()
  findAll(@Req() req: any) {
    const branchId = req.headers['x-branch-id'];
    return this.service.findAll(req.user.businessId, branchId);
  }

  @Post()
  create(@Req() req: any, @Body() data: any) {
    const branchId = req.headers['x-branch-id'] || data.branchId;
    return this.service.create(req.user.businessId, branchId, data);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() data: any) {
    const branchId = req.headers['x-branch-id'] || data.branchId;
    return this.service.update(req.user.businessId, branchId, id, data);
  }
}
