import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId?: string) {
    return this.prisma.guestFeedback.findMany({ where: businessId ? { businessId } : undefined, 
      orderBy: { createdAt: 'desc' }
    });
  }
}
