import { Controller, Get, Post, Patch, Param, Body, UseGuards, Headers } from '@nestjs/common';
import { RoomBlocksService } from './room-blocks.service';

@Controller('room-blocks')
export class RoomBlocksController {
  constructor(private readonly roomBlocksService: RoomBlocksService) {}

  @Get()
  async findAll(@Headers('x-business-id') businessId: string, @Headers('x-branch-id') branchId: string) {
    if (!businessId || !branchId) return [];
    return this.roomBlocksService.findAll(businessId, branchId);
  }

  @Post()
  async create(@Headers('x-business-id') businessId: string, @Headers('x-branch-id') branchId: string, @Body() body: any) {
    return this.roomBlocksService.create(businessId, branchId, body);
  }

  @Patch(':id')
  async update(
    @Headers('x-business-id') businessId: string, 
    @Headers('x-branch-id') branchId: string,
    @Param('id') id: string,
    @Body() body: any
  ) {
    return this.roomBlocksService.update(businessId, branchId, id, body);
  }
}
