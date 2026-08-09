import { PartialType } from '@nestjs/mapped-types';
import { CreateLostAndFoundDto } from './create-lost-and-found.dto';

export class UpdateLostAndFoundDto extends PartialType(CreateLostAndFoundDto) {}
