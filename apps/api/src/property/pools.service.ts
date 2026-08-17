import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PoolsService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId: string, branchId: string) {
    const resources = await this.prisma.beachResource.findMany({ 
      where: { businessId, branchId } 
    });
    // Filter out only pool resources (we prefix their code with POOL_)
    return resources.filter(r => r.code.startsWith('POOL_'));
  }

  async findOne(businessId: string, branchId: string, id: string) {
    return this.prisma.beachResource.findFirst({ where: { id, businessId, branchId } });
  }

  async create(businessId: string, branchId: string, data: any) {
    return this.prisma.beachResource.create({
      data: { ...data, businessId, branchId }
    });
  }

  async update(businessId: string, branchId: string, id: string, data: any) {
    return this.prisma.beachResource.update({
      where: { id },
      data
    });
  }
}
