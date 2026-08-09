import { Injectable } from '@nestjs/common';
import { CreateStayOverServiceDto } from './dto/create-stay-over-service.dto';
import { UpdateStayOverServiceDto } from './dto/update-stay-over-service.dto';

@Injectable()
export class StayOverServicesService {
  create(createStayOverServiceDto: CreateStayOverServiceDto) {
    return 'This action adds a new stayOverService';
  }

  findAll() {
    return `This action returns all stayOverServices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stayOverService`;
  }

  update(id: number, updateStayOverServiceDto: UpdateStayOverServiceDto) {
    return `This action updates a #${id} stayOverService`;
  }

  remove(id: number) {
    return `This action removes a #${id} stayOverService`;
  }
}
