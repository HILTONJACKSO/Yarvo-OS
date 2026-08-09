import { PartialType } from '@nestjs/mapped-types';
import { CreateLinenDto } from './create-linen.dto';

export class UpdateLinenDto extends PartialType(CreateLinenDto) {}
