import { PartialType } from '@nestjs/mapped-types';
import { CreateHousekeepingReportDto } from './create-housekeeping-report.dto';

export class UpdateHousekeepingReportDto extends PartialType(CreateHousekeepingReportDto) {}
