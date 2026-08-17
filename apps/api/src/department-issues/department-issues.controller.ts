import { Controller, Get, Patch, Param, Body, Headers } from '@nestjs/common';
import { DepartmentIssuesService } from './department-issues.service';

@Controller('department-issues')
export class DepartmentIssuesController {
  constructor(private readonly departmentIssuesService: DepartmentIssuesService) {}

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    return this.departmentIssuesService.findAll(businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentIssuesService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.departmentIssuesService.updateStatus(id, body.status);
  }
}
