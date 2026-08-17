import { Injectable } from '@nestjs/common';
import { CreateInventoryConsumptionDto } from './dto/create-inventory-consumption.dto';
import { UpdateInventoryConsumptionDto } from './dto/update-inventory-consumption.dto';

@Injectable()
export class InventoryConsumptionService {
  create(createInventoryConsumptionDto: CreateInventoryConsumptionDto) {
    return 'This action adds a new inventoryConsumption';
  }

  findAll(businessId?: string) {
    return `This action returns all inventoryConsumption`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventoryConsumption`;
  }

  update(id: number, updateInventoryConsumptionDto: UpdateInventoryConsumptionDto) {
    return `This action updates a #${id} inventoryConsumption`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventoryConsumption`;
  }
}
