import { PartialType } from '@nestjs/mapped-types';
import { CreateCorporateReceivableDto } from './create-corporate-receivable.dto';

export class UpdateCorporateReceivableDto extends PartialType(CreateCorporateReceivableDto) {}
