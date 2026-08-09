import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TablesService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId: string, branchId: string) {
    return this.prisma.serviceTable.findMany({ where: { businessId, branchId } });
  }

  async findOne(businessId: string, branchId: string, id: string) {
    return this.prisma.serviceTable.findFirst({ where: { id, businessId, branchId } });
  }

  async create(businessId: string, branchId: string, data: any) {
    if (data.bulk) {
      const { prefix, startNum, endNum, seatingAreaId, capacity } = data.bulk;
      const results = [];
      for (let i = startNum; i <= endNum; i++) {
        const name = `${prefix ? prefix + ' ' : ''}${i}`;
        results.push(await this.prisma.serviceTable.create({
          data: {
            businessId,
            branchId,
            seatingAreaId,
            name,
            code: `TBL_${i}`,
            standardCapacity: capacity || 4,
            maximumCapacity: capacity || 4,
            tableType: 'Restaurant Table',
            status: 'ACTIVE'
          }
        }));
      }
      return results;
    }

    return this.prisma.serviceTable.create({
      data: { ...data, businessId, branchId }
    });
  }

  async update(businessId: string, branchId: string, id: string, data: any) {
    return this.prisma.serviceTable.update({
      where: { id },
      data
    });
  }
}
