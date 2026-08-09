import { PartialType } from '@nestjs/mapped-types';
import { CreateCashierShiftDto } from './create-cashier-shift.dto';

export class UpdateCashierShiftDto extends PartialType(CreateCashierShiftDto) {}
