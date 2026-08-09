import { Injectable } from '@nestjs/common';
import { CreateRoomDamageDto } from './dto/create-room-damage.dto';
import { UpdateRoomDamageDto } from './dto/update-room-damage.dto';

@Injectable()
export class RoomDamagesService {
  create(createRoomDamageDto: CreateRoomDamageDto) {
    return 'This action adds a new roomDamage';
  }

  findAll() {
    return `This action returns all roomDamages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roomDamage`;
  }

  update(id: number, updateRoomDamageDto: UpdateRoomDamageDto) {
    return `This action updates a #${id} roomDamage`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomDamage`;
  }
}
