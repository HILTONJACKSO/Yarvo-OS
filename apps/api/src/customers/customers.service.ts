import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';

@Injectable()
export class CustomersService {
  constructor(
    private prisma: PrismaService,
    private websocketGateway: AppWebsocketGateway
  ) {}

  async create(businessId: string, data: any) {
    const customer = await this.prisma.customer.create({
      data: { ...data, businessId }
    });
    this.websocketGateway.broadcast('customers.updated', { action: 'created', customer });
    return customer;
  }

  findAll(businessId: string) {
    return this.prisma.customer.findMany({
      where: { businessId }
    });
  }

  findOne(businessId: string, id: string) {
    return this.prisma.customer.findFirst({
      where: { id, businessId }
    });
  }

  async update(businessId: string, id: string, data: any) {
    const result = await this.prisma.customer.updateMany({
      where: { id, businessId },
      data
    });
    this.websocketGateway.broadcast('customers.updated', { action: 'updated', id });
    return result;
  }

  async remove(businessId: string, id: string) {
    const result = await this.prisma.customer.deleteMany({
      where: { id, businessId }
    });
    this.websocketGateway.broadcast('customers.updated', { action: 'removed', id });
    return result;
  }
}
