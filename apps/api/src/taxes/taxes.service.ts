import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';

@Injectable()
export class TaxesService {
  constructor(
    private prisma: PrismaService,
    private websocketGateway: AppWebsocketGateway
  ) {}

  async create(businessId: string, data: any) {
    const tax = await this.prisma.taxRule.create({
      data: {
        businessId,
        ...data,
      }
    });
    this.websocketGateway.server.emit('settings.tax.updated', { action: 'created', tax });
    return tax;
  }

  async findAll(businessId: string) {
    return this.prisma.taxRule.findMany({
      where: { businessId }
    });
  }

  async update(id: string, businessId: string, data: any) {
    const tax = await this.prisma.taxRule.update({
      where: { id, businessId },
      data
    });
    this.websocketGateway.server.emit('settings.tax.updated', { action: 'updated', tax });
    return tax;
  }

  async remove(id: string, businessId: string) {
    await this.prisma.taxRule.delete({
      where: { id, businessId }
    });
    this.websocketGateway.server.emit('settings.tax.updated', { action: 'deleted', id });
    return { success: true };
  }
}
