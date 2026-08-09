import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RoomTypesService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId: string, branchId: string) {
    return this.prisma.roomType.findMany({ where: { businessId, branchId } });
  }

  async findOne(businessId: string, branchId: string, id: string) {
    return this.prisma.roomType.findFirst({ where: { id, businessId, branchId } });
  }

  async create(businessId: string, branchId: string, data: any) {
    const code = data.code || data.name?.substring(0, 3).toUpperCase() || 'RM';
    const bedType = data.bedType || 'Double';

    const res = await this.prisma.roomType.create({
      data: { 
        businessId, 
        branchId,
        name: data.name,
        code: code,
        description: data.description,
        basePrice: Number(data.basePrice),
        standardCapacity: Number(data.capacity) || 2,
        bedType: bedType
      }
    });
    return res;
  }

  async update(businessId: string, branchId: string, id: string, data: any) {
    return this.prisma.roomType.update({
      where: { id },
      data
    });
  }
}
