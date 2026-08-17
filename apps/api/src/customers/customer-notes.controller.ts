import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Headers } from '@nestjs/common';
import { CustomerNotesService } from './customer-notes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('customer-notes')
export class CustomerNotesController {
  constructor(private readonly service: CustomerNotesService) {}

  @Post()
  create(@Request() req: any, @Body() data: any) {
    return this.service.create(req.user.businessId, data);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.service.findAll(req.user.businessId);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.service.findOne(req.user.businessId, id);
  }

  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() data: any) {
    return this.service.update(req.user.businessId, id, data);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.service.remove(req.user.businessId, id);
  }
}
