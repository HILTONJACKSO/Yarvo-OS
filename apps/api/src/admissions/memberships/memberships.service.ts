import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class MembershipsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(businessId?: string) {
    return this.prisma.membership.findMany();
  }
}
