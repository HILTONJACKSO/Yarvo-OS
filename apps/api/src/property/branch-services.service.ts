import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';

@Injectable()
export class BranchServicesService {
  constructor(
    private prisma: PrismaService,
    private websocketGateway: AppWebsocketGateway
  ) {}

  async findAll(businessId: string, branchId: string) {
    return this.prisma.branchService.findMany({ where: { businessId, branchId } });
  }

  async findOne(businessId: string, branchId: string, id: string) {
    return this.prisma.branchService.findFirst({ where: { id, businessId, branchId } });
  }

  async create(businessId: string, branchId: string, data: any) {
    if (data.services && Array.isArray(data.services)) {
      // Handle bulk update of services
      const results = [];
      for (const svc of data.services) {
        const existing = await this.prisma.branchService.findFirst({
          where: { businessId, branchId, serviceType: svc.serviceType }
        });

        if (existing) {
          results.push(await this.prisma.branchService.update({
            where: { id: existing.id },
            data: { isEnabled: svc.isEnabled, enabledAt: svc.isEnabled ? new Date() : null, disabledAt: !svc.isEnabled ? new Date() : null }
          }));
        } else {
          results.push(await this.prisma.branchService.create({
            data: { 
              businessId, 
              branchId, 
              serviceType: svc.serviceType, 
              isEnabled: svc.isEnabled,
              enabledAt: svc.isEnabled ? new Date() : null
            }
          }));
        }
      }
      this.websocketGateway.server.emit('property.service.updated', { branchId });
      return results;
    } else {
      // Fallback for single creation
      const res = await this.prisma.branchService.create({
        data: { ...data, businessId, branchId }
      });
      this.websocketGateway.server.emit('property.service.updated', { id: res.id, branchId });
      return res;
    }
  }

  async update(businessId: string, branchId: string, id: string, data: any) {
    const res = await this.prisma.branchService.update({
      where: { id },
      data
    });
    this.websocketGateway.server.emit('property.service.updated', { id: res.id });
    return res;
  }
}
