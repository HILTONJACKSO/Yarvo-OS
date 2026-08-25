import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  create(businessId: string, data: any) {
    if (!businessId) throw new Error('Business ID is required');
    return this.prisma.supplier.create({
      data: {
        businessId,
        supplierNumber: data.supplierNumber || Math.floor(10000 + Math.random() * 90000).toString(),
        name: data.name,
        code: data.code,
        contactName: data.contactName,
        phone: data.phone,
        email: data.email,
        address: data.address,
        country: data.country,
        city: data.city,
        currency: data.currency || 'USD',
        status: data.status || 'ACTIVE',
      }
    });
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
