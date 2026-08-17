import { Injectable } from '@nestjs/common';
import { CreateLostAndFoundDto } from './dto/create-lost-and-found.dto';
import { UpdateLostAndFoundDto } from './dto/update-lost-and-found.dto';

@Injectable()
export class LostAndFoundService {
  create(createLostAndFoundDto: CreateLostAndFoundDto) {
    return 'This action adds a new lostAndFound';
  }

  findAll(businessId?: string) {
    return `This action returns all lostAndFound`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lostAndFound`;
  }

  update(id: number, updateLostAndFoundDto: UpdateLostAndFoundDto) {
    return `This action updates a #${id} lostAndFound`;
  }

  remove(id: number) {
    return `This action removes a #${id} lostAndFound`;
  }
}
