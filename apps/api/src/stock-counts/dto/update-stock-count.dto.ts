import { PartialType } from '@nestjs/mapped-types';
import { CreateStockCountDto } from './create-stock-count.dto';

export class UpdateStockCountDto extends PartialType(CreateStockCountDto) {}
