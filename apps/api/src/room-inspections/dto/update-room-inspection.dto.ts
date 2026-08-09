import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomInspectionDto } from './create-room-inspection.dto';

export class UpdateRoomInspectionDto extends PartialType(CreateRoomInspectionDto) {}
