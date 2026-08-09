import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDamageDto } from './create-room-damage.dto';

export class UpdateRoomDamageDto extends PartialType(CreateRoomDamageDto) {}
