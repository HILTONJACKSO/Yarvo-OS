import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmentIssuesService } from './department-issues.service';
import { CreateDepartmentIssueDto } from './dto/create-department-issue.dto';
import { UpdateDepartmentIssueDto } from './dto/update-department-issue.dto';

@Controller('department-issues')
export class DepartmentIssuesController {
  constructor(private readonly departmentIssuesService: DepartmentIssuesService) {}

  @Post()
  create(@Body() createDepartmentIssueDto: CreateDepartmentIssueDto) {
    return this.departmentIssuesService.create(createDepartmentIssueDto);
  }

  @Get()
  findAll() {
    return this.departmentIssuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentIssuesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmentIssueDto: UpdateDepartmentIssueDto) {
    return this.departmentIssuesService.update(+id, updateDepartmentIssueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentIssuesService.remove(+id);
  }
}
