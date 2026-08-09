import { Injectable } from '@nestjs/common';
import { CreateDepartmentIssueDto } from './dto/create-department-issue.dto';
import { UpdateDepartmentIssueDto } from './dto/update-department-issue.dto';

@Injectable()
export class DepartmentIssuesService {
  create(createDepartmentIssueDto: CreateDepartmentIssueDto) {
    return 'This action adds a new departmentIssue';
  }

  findAll() {
    return `This action returns all departmentIssues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} departmentIssue`;
  }

  update(id: number, updateDepartmentIssueDto: UpdateDepartmentIssueDto) {
    return `This action updates a #${id} departmentIssue`;
  }

  remove(id: number) {
    return `This action removes a #${id} departmentIssue`;
  }
}
