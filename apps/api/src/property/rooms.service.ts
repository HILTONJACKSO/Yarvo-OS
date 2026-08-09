import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId: string, branchId: string) {
    return this.prisma.room.findMany({ where: { businessId, branchId } });
  }

  async findOne(businessId: string, branchId: string, id: string) {
    return this.prisma.room.findFirst({ where: { id, businessId, branchId } });
  }

  async create(businessId: string, branchId: string, data: any) {
    if (data.bulk) {
      const { prefix = '', startNum, endNum, propertyAreaId, roomTypeId } = data.bulk;
      const roomsToCreate = [];
      for (let i = startNum; i <= endNum; i++) {
        const roomNumber = `${prefix}${i.toString().padStart(2, '0')}`;
        roomsToCreate.push({
          businessId,
          branchId,
          roomNumber,
          areaId: propertyAreaId || undefined,
          roomTypeId,
        });
      }
      return this.prisma.room.createMany({ data: roomsToCreate });
    }

    return this.prisma.room.create({
      data: { ...data, businessId, branchId }
    });
  }

  async update(businessId: string, branchId: string, id: string, data: any) {
    return this.prisma.room.update({
      where: { id },
      data
    });
  }
}
