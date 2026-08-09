import { PartialType } from '@nestjs/mapped-types';
import { CreateStayOverServiceDto } from './create-stay-over-service.dto';

export class UpdateStayOverServiceDto extends PartialType(CreateStayOverServiceDto) {}
