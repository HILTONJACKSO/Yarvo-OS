import { Module } from '@nestjs/common';
import { DepartmentIssuesService } from './department-issues.service';
import { DepartmentIssuesController } from './department-issues.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [DepartmentIssuesController],
  providers: [DepartmentIssuesService, PrismaService],
})
export class DepartmentIssuesModule {}
