import { Injectable } from '@nestjs/common';
import { CreateLinenDto } from './dto/create-linen.dto';
import { UpdateLinenDto } from './dto/update-linen.dto';

@Injectable()
export class LinenService {
  create(createLinenDto: CreateLinenDto) {
    return 'This action adds a new linen';
  }

  findAll() {
    return `This action returns all linen`;
  }

  findOne(id: number) {
    return `This action returns a #${id} linen`;
  }

  update(id: number, updateLinenDto: UpdateLinenDto) {
    return `This action updates a #${id} linen`;
  }

  remove(id: number) {
    return `This action removes a #${id} linen`;
  }
}
