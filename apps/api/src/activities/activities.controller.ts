import { Controller, Get, UseGuards, Request, Headers } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../casl/permissions.guard';
import { CheckPermissions } from '../casl/check-permissions.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  @CheckPermissions((ability) => ability.can('manage', 'settings'))
  findAll(@Request() req: any) {
    return this.activitiesService.findAll(req.headers['x-business-id']);
  }
}
