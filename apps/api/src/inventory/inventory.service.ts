import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wsGateway: AppWebsocketGateway,
  ) {}

  async getDashboardStats() {
    const totalValueResult = await this.prisma.stockBalance.aggregate({
      _sum: {
        stockValue: true,
      },
    });

    const lowStockCount = await this.prisma.stockBalance.count({
      where: {
        quantityAvailable: { lte: 10, gt: 0 }
      }
    });

    const outOfStockCount = await this.prisma.stockBalance.count({
      where: { quantityAvailable: { lte: 0 } }
    });

    const openOrdersCount = await this.prisma.purchaseOrder.count({
      where: { status: 'OPEN' }
    });

    return {
      totalStockValue: totalValueResult._sum.stockValue || 0,
      lowStockItems: lowStockCount,
      outOfStock: outOfStockCount,
      openPurchaseOrders: openOrdersCount,
    };
  }

  async getItems() {
    return this.prisma.inventoryItem.findMany({
      orderBy: { name: 'asc' }
    });
  }

  async getStockLevels() {
    return this.prisma.stockBalance.findMany();
  }

  async getMovements() {
    return this.prisma.stockMovement.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getTransfers() {
    return this.prisma.stockTransfer.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getRecipes() {
    return this.prisma.recipe.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getCounts() {
    return this.prisma.stockCount.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getWaste() {
    return this.prisma.inventoryWaste.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getCategories() {
    return this.prisma.inventoryCategory.findMany();
  }

  async getUnits() {
    return this.prisma.unitOfMeasure.findMany();
  }

  async getLocations() {
    return this.prisma.stockLocation.findMany();
  }

  create(createInventoryDto: CreateInventoryDto) {
    return 'This action adds a new inventory';
  }

  findAll() {
    return `This action returns all inventory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventory`;
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }
}
