import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';

@Injectable()
export class RefundsService {
  constructor(
    private prisma: PrismaService,
    private websocketGateway: AppWebsocketGateway
  ) {}

  async findAll(businessId: string) {
    if (!businessId) return [];
    const refunds = await this.prisma.refund.findMany({
      where: { businessId },
      include: {
        payment: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return refunds.map(r => ({
      id: r.refundNumber,
      paymentId: r.payment?.paymentNumber || r.paymentId,
      time: r.createdAt.toISOString(),
      method: r.refundMethod,
      amount: r.amount,
      status: r.status,
      reason: r.reason
    }));
  }

  async create(businessId: string, data: any) {
    let branch = await this.prisma.branch.findFirst({ where: { businessId } });
    const refund = await this.prisma.refund.create({
      data: {
        businessId: businessId,
        branchId: branch?.id,
        refundNumber: `REF-${Math.floor(1000 + Math.random() * 9000)}`,
        paymentId: data.paymentId,
        amount: parseFloat(data.amount),
        currency: 'USD',
        refundMethod: data.method || 'ORIGINAL_PAYMENT',
        refundType: 'FULL',
        reason: data.reason || 'Customer request',
        status: 'REQUESTED'
      }
    });

    this.websocketGateway.server.emit('refunds.updated', { refundId: refund.id });

    return refund;
  }

  async updateStatus(businessId: string, id: string, status: string) {
    const refund = await this.prisma.refund.findFirst({ where: { refundNumber: id, businessId } });
    if (!refund) throw new Error('Refund not found');

    const updated = await this.prisma.refund.update({
      where: { id: refund.id },
      data: { status }
    });

    this.websocketGateway.server.emit('refunds.updated', { refundId: updated.id });
    return updated;
  }
}
