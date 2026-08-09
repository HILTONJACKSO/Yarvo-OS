import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckoutAdjustmentDto } from './create-checkout-adjustment.dto';

export class UpdateCheckoutAdjustmentDto extends PartialType(CreateCheckoutAdjustmentDto) {}
