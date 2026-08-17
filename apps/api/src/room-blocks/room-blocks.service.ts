import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RoomBlocksService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId: string, branchId: string) {
    return this.prisma.roomBlock.findMany({ 
      where: { businessId, branchId },
      include: {
        room: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async create(businessId: string, branchId: string, data: any) {
    return this.prisma.roomBlock.create({
      data: { ...data, businessId, branchId }
    });
  }

  async update(businessId: string, branchId: string, id: string, data: any) {
    return this.prisma.roomBlock.update({
      where: { id },
      data
    });
  }
}
