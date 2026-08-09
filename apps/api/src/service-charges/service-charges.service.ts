import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';

@Injectable()
export class ServiceChargesService {
  constructor(
    private prisma: PrismaService,
    private websocketGateway: AppWebsocketGateway
  ) {}

  async create(businessId: string, data: any) {
    const serviceCharge = await this.prisma.serviceChargeRule.create({
      data: {
        businessId,
        ...data,
      }
    });
    this.websocketGateway.server.emit('settings.serviceCharge.updated', { action: 'created', serviceCharge });
    return serviceCharge;
  }

  async findAll(businessId: string) {
    return this.prisma.serviceChargeRule.findMany({
      where: { businessId }
    });
  }

  async update(id: string, businessId: string, data: any) {
    const serviceCharge = await this.prisma.serviceChargeRule.update({
      where: { id, businessId },
      data
    });
    this.websocketGateway.server.emit('settings.serviceCharge.updated', { action: 'updated', serviceCharge });
    return serviceCharge;
  }

  async remove(id: string, businessId: string) {
    await this.prisma.serviceChargeRule.delete({
      where: { id, businessId }
    });
    this.websocketGateway.server.emit('settings.serviceCharge.updated', { action: 'deleted', id });
    return { success: true };
  }
}
