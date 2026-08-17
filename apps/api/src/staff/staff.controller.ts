import { Controller, Get, Post, Body, UseGuards, Request, Headers } from '@nestjs/common';
import { StaffService } from './staff.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../casl/permissions.guard';
import { CheckPermissions } from '../casl/check-permissions.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @CheckPermissions((ability) => ability.can('create', 'staff'))
  create(@Request() req: any, @Body() body: any) {
    const businessId = req.headers['x-business-id'];
    return this.staffService.create(businessId, body);
  }

  @Get()
  @CheckPermissions((ability) => ability.can('view', 'staff'))
  findAll(@Request() req: any) {
    const businessId = req.headers['x-business-id'];
    return this.staffService.findAll(businessId);
  }
}
