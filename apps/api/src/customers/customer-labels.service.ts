import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CustomerLabelsService {
  constructor(private prisma: PrismaService) {}

  create(businessId: string, data: any) {
    return this.prisma.customerLabel.create({
      data: { ...data, businessId }
    });
  }

  findAll(businessId: string) {
    return this.prisma.customerLabel.findMany({
      where: { businessId }
    });
  }

  findOne(businessId: string, id: string) {
    return this.prisma.customerLabel.findFirst({
      where: { id, businessId }
    });
  }

  update(businessId: string, id: string, data: any) {
    return this.prisma.customerLabel.updateMany({
      where: { id, businessId },
      data
    });
  }

  remove(businessId: string, id: string) {
    return this.prisma.customerLabel.deleteMany({
      where: { id, businessId }
    });
  }
}
