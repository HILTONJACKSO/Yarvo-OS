import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId?: string) {
    return this.prisma.customer.findMany({ where: businessId ? { businessId } : undefined, 
      orderBy: { createdAt: 'desc' },
      include: {
        communications: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });
  }
}
