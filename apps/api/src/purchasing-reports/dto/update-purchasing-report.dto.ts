import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchasingReportDto } from './create-purchasing-report.dto';

export class UpdatePurchasingReportDto extends PartialType(CreatePurchasingReportDto) {}
