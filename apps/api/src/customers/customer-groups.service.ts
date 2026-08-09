import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';

@Injectable()
export class CustomerGroupsService {
  constructor(
    private prisma: PrismaService,
    private websocketGateway: AppWebsocketGateway
  ) {}

  async create(businessId: string, data: any) {
    const group = await this.prisma.customerGroup.create({
      data: { ...data, businessId }
    });
    this.websocketGateway.broadcast('customer_groups.updated', { action: 'created', group });
    return group;
  }

  findAll(businessId: string) {
    return this.prisma.customerGroup.findMany({
      where: { businessId }
    });
  }

  findOne(businessId: string, id: string) {
    return this.prisma.customerGroup.findFirst({
      where: { id, businessId }
    });
  }

  async update(businessId: string, id: string, data: any) {
    const result = await this.prisma.customerGroup.updateMany({
      where: { id, businessId },
      data
    });
    this.websocketGateway.broadcast('customer_groups.updated', { action: 'updated', id });
    return result;
  }

  async remove(businessId: string, id: string) {
    const result = await this.prisma.customerGroup.deleteMany({
      where: { id, businessId }
    });
    this.websocketGateway.broadcast('customer_groups.updated', { action: 'removed', id });
    return result;
  }
}
