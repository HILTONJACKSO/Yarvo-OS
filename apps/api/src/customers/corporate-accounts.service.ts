import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';

@Injectable()
export class CorporateAccountsService {
  constructor(
    private prisma: PrismaService,
    private websocketGateway: AppWebsocketGateway
  ) {}

  async create(businessId: string, data: any) {
    const account = await this.prisma.corporateAccount.create({
      data: { ...data, businessId }
    });
    this.websocketGateway.broadcast('corporate_accounts.updated', { action: 'created', account });
    return account;
  }

  findAll(businessId: string) {
    return this.prisma.corporateAccount.findMany({
      where: { businessId }
    });
  }

  findOne(businessId: string, id: string) {
    return this.prisma.corporateAccount.findFirst({
      where: { id, businessId }
    });
  }

  async update(businessId: string, id: string, data: any) {
    const result = await this.prisma.corporateAccount.updateMany({
      where: { id, businessId },
      data
    });
    this.websocketGateway.broadcast('corporate_accounts.updated', { action: 'updated', id });
    return result;
  }

  async remove(businessId: string, id: string) {
    const result = await this.prisma.corporateAccount.deleteMany({
      where: { id, businessId }
    });
    this.websocketGateway.broadcast('corporate_accounts.updated', { action: 'removed', id });
    return result;
  }
}
