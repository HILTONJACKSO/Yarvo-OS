import { Controller, Post, Body, UseGuards, Get, Request, Patch, Param } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @Post('setup')
  async setup(@Request() req: any, @Body() body: any) {
    return this.businessesService.setupBusinessAndBranch(req.user.userId, body);
  }

  @Get('current')
  async getCurrent(@Request() req: any) {
    return this.businessesService.getCurrentBusinesses(req.user.userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: any
  ) {
    return this.businessesService.update(id, data);
  }
}
