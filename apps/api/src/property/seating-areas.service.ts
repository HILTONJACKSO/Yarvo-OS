import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SeatingAreasService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId: string, branchId: string) {
    return this.prisma.seatingArea.findMany({ where: { businessId, branchId } });
  }

  async findOne(businessId: string, branchId: string, id: string) {
    return this.prisma.seatingArea.findFirst({ where: { id, businessId, branchId } });
  }

  async create(businessId: string, branchId: string, data: any) {
    return this.prisma.seatingArea.create({
      data: { ...data, businessId, branchId }
    });
  }

  async update(businessId: string, branchId: string, id: string, data: any) {
    return this.prisma.seatingArea.update({
      where: { id },
      data
    });
  }
}
