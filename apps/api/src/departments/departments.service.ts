import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';

@Injectable()
export class DepartmentsService {
  constructor(
    private prisma: PrismaService,
    private websocketGateway: AppWebsocketGateway
  ) {}

  async findAll(businessId: string) {
    return this.prisma.department.findMany({ 
      where: { businessId },
      include: { _count: { select: { employees: true } } }
    });
  }

  async create(businessId: string, data: any) {
    const department = await this.prisma.department.create({
      data: {
        businessId,
        name: data.name,
        code: data.name.toUpperCase().replace(/\s+/g, '_'),
        description: data.description
      }
    });
    this.websocketGateway.broadcast('departments.updated', { action: 'created', department });
    return department;
  }
}
