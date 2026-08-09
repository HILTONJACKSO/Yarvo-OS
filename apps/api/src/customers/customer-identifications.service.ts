import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CustomerIdentificationsService {
  constructor(private prisma: PrismaService) {}

  create(businessId: string, data: any) {
    return this.prisma.customerIdentification.create({
      data: { ...data, businessId }
    });
  }

  findAll(businessId: string) {
    return this.prisma.customerIdentification.findMany({
      where: { businessId }
    });
  }

  findOne(businessId: string, id: string) {
    return this.prisma.customerIdentification.findFirst({
      where: { id, businessId }
    });
  }

  update(businessId: string, id: string, data: any) {
    return this.prisma.customerIdentification.updateMany({
      where: { id, businessId },
      data
    });
  }

  remove(businessId: string, id: string) {
    return this.prisma.customerIdentification.deleteMany({
      where: { id, businessId }
    });
  }
}
