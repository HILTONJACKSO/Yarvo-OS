import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class CommunicationsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.customerCommunication.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true
      }
    });
  }
}
