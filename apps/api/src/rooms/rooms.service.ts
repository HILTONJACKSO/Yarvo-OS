import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(businessId?: string) {
    return this.prisma.room.findMany({ where: businessId ? { businessId } : undefined, 
      include: { roomType: true },
      orderBy: { roomNumber: 'asc' }
    });
  }
}
