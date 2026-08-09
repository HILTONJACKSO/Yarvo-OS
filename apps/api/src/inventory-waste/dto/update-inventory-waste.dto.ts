import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryWasteDto } from './create-inventory-waste.dto';

export class UpdateInventoryWasteDto extends PartialType(CreateInventoryWasteDto) {}
