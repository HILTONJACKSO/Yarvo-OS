import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../casl/permissions.guard';
import { CheckPermissions } from '../casl/check-permissions.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @CheckPermissions((ability) => ability.can('view', 'roles'))
  findAll(@Request() req: any) {
    return this.rolesService.findAll(req.headers['x-business-id']);
  }

  @Get(':id')
  @CheckPermissions((ability) => ability.can('view', 'roles'))
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.rolesService.findOne(req.headers['x-business-id'], id);
  }

  @Post()
  @CheckPermissions((ability) => ability.can('create', 'roles'))
  create(@Request() req: any, @Body() body: any) {
    return this.rolesService.create(req.headers['x-business-id'], body);
  }

  @Put(':id/permissions')
  @CheckPermissions((ability) => ability.can('update', 'roles'))
  updatePermissions(@Request() req: any, @Param('id') id: string, @Body('permissionIds') permissionIds: string[]) {
    return this.rolesService.updatePermissions(req.headers['x-business-id'], id, permissionIds);
  }
}
