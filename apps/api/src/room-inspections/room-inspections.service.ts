import { Injectable } from '@nestjs/common';
import { CreateRoomInspectionDto } from './dto/create-room-inspection.dto';
import { UpdateRoomInspectionDto } from './dto/update-room-inspection.dto';

@Injectable()
export class RoomInspectionsService {
  create(createRoomInspectionDto: CreateRoomInspectionDto) {
    return 'This action adds a new roomInspection';
  }

  findAll() {
    return `This action returns all roomInspections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roomInspection`;
  }

  update(id: number, updateRoomInspectionDto: UpdateRoomInspectionDto) {
    return `This action updates a #${id} roomInspection`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomInspection`;
  }
}
