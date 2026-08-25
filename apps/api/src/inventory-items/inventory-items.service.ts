import { Injectable } from '@nestjs/common';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory-item.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class InventoryItemsService {
  constructor(private prisma: PrismaService) {}

  create(createInventoryItemDto: CreateInventoryItemDto) {
    return 'This action adds a new inventoryItem';
  }

  async findAll(businessId: string) {
    return this.prisma.inventoryItem.findMany({
      where: { businessId },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} inventoryItem`;
  }

  update(id: number, updateInventoryItemDto: UpdateInventoryItemDto) {
    return `This action updates a #${id} inventoryItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventoryItem`;
  }
}
