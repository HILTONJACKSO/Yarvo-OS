import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  findAll(@Request() req: any) {
    return this.departmentsService.findAll(req.headers['x-business-id']);
  }

  @Post()
  create(@Request() req: any, @Body() body: any) {
    return this.departmentsService.create(req.headers['x-business-id'], body);
  }
}
