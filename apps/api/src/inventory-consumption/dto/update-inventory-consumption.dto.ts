import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryConsumptionDto } from './create-inventory-consumption.dto';

export class UpdateInventoryConsumptionDto extends PartialType(CreateInventoryConsumptionDto) {}
