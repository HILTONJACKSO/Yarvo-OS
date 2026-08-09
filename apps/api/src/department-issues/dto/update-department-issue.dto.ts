import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentIssueDto } from './create-department-issue.dto';

export class UpdateDepartmentIssueDto extends PartialType(CreateDepartmentIssueDto) {}
