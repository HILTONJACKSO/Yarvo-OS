import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';

@Injectable()
export class CashRegistersService {
  constructor(
    private prisma: PrismaService,
    private websocketGateway: AppWebsocketGateway
  ) {}

  async create(businessId: string, branchId: string, data: any) {
    const cashRegister = await this.prisma.cashRegister.create({
      data: {
        businessId,
        branchId,
        ...data,
      }
    });
    this.websocketGateway.server.emit('settings.cashRegister.updated', { action: 'created', cashRegister });
    return cashRegister;
  }

  async findAll(businessId: string, branchId: string) {
    return this.prisma.cashRegister.findMany({
      where: { businessId, branchId }
    });
  }

  async update(id: string, businessId: string, data: any) {
    const cashRegister = await this.prisma.cashRegister.update({
      where: { id, businessId },
      data
    });
    this.websocketGateway.server.emit('settings.cashRegister.updated', { action: 'updated', cashRegister });
    return cashRegister;
  }

  async remove(id: string, businessId: string) {
    await this.prisma.cashRegister.delete({
      where: { id, businessId }
    });
    this.websocketGateway.server.emit('settings.cashRegister.updated', { action: 'deleted', id });
    return { success: true };
  }
}
