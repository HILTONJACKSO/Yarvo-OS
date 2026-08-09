import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CustomerNotesService {
  constructor(private prisma: PrismaService) {}

  create(businessId: string, data: any) {
    return this.prisma.customerNote.create({
      data: { ...data, businessId }
    });
  }

  findAll(businessId: string) {
    return this.prisma.customerNote.findMany({
      where: { businessId }
    });
  }

  findOne(businessId: string, id: string) {
    return this.prisma.customerNote.findFirst({
      where: { id, businessId }
    });
  }

  update(businessId: string, id: string, data: any) {
    return this.prisma.customerNote.updateMany({
      where: { id, businessId },
      data
    });
  }

  remove(businessId: string, id: string) {
    return this.prisma.customerNote.deleteMany({
      where: { id, businessId }
    });
  }
}
