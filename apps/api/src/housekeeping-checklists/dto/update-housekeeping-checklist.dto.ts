import { PartialType } from '@nestjs/mapped-types';
import { CreateHousekeepingChecklistDto } from './create-housekeeping-checklist.dto';

export class UpdateHousekeepingChecklistDto extends PartialType(CreateHousekeepingChecklistDto) {}
