import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';

@Injectable()
export class BranchesService {
  constructor(
    private prisma: PrismaService,
    private websocketGateway: AppWebsocketGateway
  ) {}

  async update(id: string, businessId: string, data: any) {
    const branch = await this.prisma.branch.update({
      where: { id, businessId },
      data
    });
    this.websocketGateway.server.emit('settings.branch.updated', { action: 'updated', branch });
    return branch;
  }

  async getBranch(id: string, businessId: string) {
    return this.prisma.branch.findUnique({
      where: { id, businessId }
    });
  }
}
