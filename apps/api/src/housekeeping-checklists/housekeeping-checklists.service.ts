import { Injectable } from '@nestjs/common';
import { CreateHousekeepingChecklistDto } from './dto/create-housekeeping-checklist.dto';
import { UpdateHousekeepingChecklistDto } from './dto/update-housekeeping-checklist.dto';

@Injectable()
export class HousekeepingChecklistsService {
  create(createHousekeepingChecklistDto: CreateHousekeepingChecklistDto) {
    return 'This action adds a new housekeepingChecklist';
  }

  findAll() {
    return `This action returns all housekeepingChecklists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} housekeepingChecklist`;
  }

  update(id: number, updateHousekeepingChecklistDto: UpdateHousekeepingChecklistDto) {
    return `This action updates a #${id} housekeepingChecklist`;
  }

  remove(id: number) {
    return `This action removes a #${id} housekeepingChecklist`;
  }
}
