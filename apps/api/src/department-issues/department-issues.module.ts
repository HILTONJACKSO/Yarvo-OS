import { Module } from '@nestjs/common';
import { DepartmentIssuesService } from './department-issues.service';
import { DepartmentIssuesController } from './department-issues.controller';

@Module({
  controllers: [DepartmentIssuesController],
  providers: [DepartmentIssuesService],
})
export class DepartmentIssuesModule {}
