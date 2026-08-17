import { Injectable } from '@nestjs/common';
import { CreateInventoryWasteDto } from './dto/create-inventory-waste.dto';
import { UpdateInventoryWasteDto } from './dto/update-inventory-waste.dto';

@Injectable()
export class InventoryWasteService {
  create(createInventoryWasteDto: CreateInventoryWasteDto) {
    return 'This action adds a new inventoryWaste';
  }

  findAll(businessId?: string) {
    return `This action returns all inventoryWaste`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventoryWaste`;
  }

  update(id: number, updateInventoryWasteDto: UpdateInventoryWasteDto) {
    return `This action updates a #${id} inventoryWaste`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventoryWaste`;
  }
}
