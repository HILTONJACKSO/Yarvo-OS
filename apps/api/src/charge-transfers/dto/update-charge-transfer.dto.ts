import { PartialType } from '@nestjs/mapped-types';
import { CreateChargeTransferDto } from './create-charge-transfer.dto';

export class UpdateChargeTransferDto extends PartialType(CreateChargeTransferDto) {}
