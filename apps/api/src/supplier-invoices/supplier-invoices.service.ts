import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSupplierInvoiceDto } from './dto/create-supplier-invoice.dto';
import { UpdateSupplierInvoiceDto } from './dto/update-supplier-invoice.dto';

@Injectable()
export class SupplierInvoicesService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const totalUnpaid = await this.prisma.supplierInvoice.aggregate({
      where: { status: { not: 'PAID' } },
      _sum: { totalAmount: true }
    });
    return {
      totalUnpaid: totalUnpaid._sum?.totalAmount || 0
    };
  }

  create(createSupplierInvoiceDto: CreateSupplierInvoiceDto) {
    return 'This action adds a new supplierInvoice';
  }

  findAll(businessId?: string) {
    return this.prisma.supplierInvoice.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} supplierInvoice`;
  }

  update(id: number, updateSupplierInvoiceDto: UpdateSupplierInvoiceDto) {
    return `This action updates a #${id} supplierInvoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplierInvoice`;
  }
}
