import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';

@Injectable()
export class OperatingHoursService {
  constructor(
    private prisma: PrismaService,
    private websocketGateway: AppWebsocketGateway
  ) {}

  async findAll(businessId: string, branchId: string) {
    return this.prisma.operatingHour.findMany({ where: { businessId, branchId } });
  }

  async findOne(businessId: string, branchId: string, id: string) {
    return this.prisma.operatingHour.findFirst({ where: { id, businessId, branchId } });
  }

  async create(businessId: string, branchId: string, data: any) {
    const res = await this.prisma.operatingHour.create({
      data: { ...data, businessId, branchId }
    });
    this.websocketGateway.server.emit('property.hours.updated', { id: res.id });
    return res;
  }

  async update(businessId: string, branchId: string, id: string, data: any) {
    const res = await this.prisma.operatingHour.update({
      where: { id },
      data
    });
    this.websocketGateway.server.emit('property.hours.updated', { id: res.id });
    return res;
  }
}
