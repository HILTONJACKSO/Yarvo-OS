import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  create(createSupplierDto: CreateSupplierDto) {
    return 'This action adds a new supplier';
  }

  findAll(businessId?: string) {
    if (!businessId) return [];
    return this.prisma.supplier.findMany({
      where: { businessId },
      orderBy: { createdAt: 'desc' }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
