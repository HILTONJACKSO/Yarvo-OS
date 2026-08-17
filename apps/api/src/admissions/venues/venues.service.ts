import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class VenuesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(businessId?: string) {
    return this.prisma.venue.findMany();
  }
}
