import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { MenusService } from './menus.service';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.menusService.findAll(businessId);
  }

  @Post()
  create(@Headers('x-business-id') businessId: string, @Headers('x-branch-id') branchId: string, @Body() data: any) {
    return this.menusService.create(businessId, branchId, data);
  }
}
