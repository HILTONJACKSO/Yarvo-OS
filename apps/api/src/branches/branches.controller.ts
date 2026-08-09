import { Controller, Get, Patch, Param, Body, Headers } from '@nestjs/common';
import { BranchesService } from './branches.service';

@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Get(':id')
  getBranch(
    @Param('id') id: string,
    @Headers('x-business-id') businessId: string
  ) {
    return this.branchesService.getBranch(id, businessId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Headers('x-business-id') businessId: string,
    @Body() data: any
  ) {
    return this.branchesService.update(id, businessId, data);
  }
}
