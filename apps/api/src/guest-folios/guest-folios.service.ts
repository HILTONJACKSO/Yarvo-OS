import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GuestFoliosService {
  constructor(private prisma: PrismaService) {}

  async getFolios(status?: string) {
    const where: any = {};
    if (status) {
      where.status = status;
    }

    return this.prisma.guestFolio.findMany({
      where,
      include: {
        stay: {
          include: {
            roomAssignments: {
              where: { isCurrent: true },
              include: { room: true }
            }
          }
        },
        primaryCustomer: true,
        corporateAccount: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });
  }
}
