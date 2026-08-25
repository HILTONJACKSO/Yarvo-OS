import { Injectable } from '@nestjs/common';
import { CreateStockLocationDto } from './dto/create-stock-location.dto';
import { UpdateStockLocationDto } from './dto/update-stock-location.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StockLocationsService {
  constructor(private prisma: PrismaService) {}

  async create(createStockLocationDto: any, businessId: string, branchId: string) {
    return this.prisma.stockLocation.create({
      data: {
        ...createStockLocationDto,
        businessId,
        branchId,
        status: 'ACTIVE'
      }
    });
  }

  findAll(businessId?: string) {
    if (!businessId) return [];
    return this.prisma.stockLocation.findMany({
      where: { businessId },
      orderBy: { name: 'asc' }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} stockLocation`;
  }

  update(id: number, updateStockLocationDto: UpdateStockLocationDto) {
    return `This action updates a #${id} stockLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockLocation`;
  }
}
