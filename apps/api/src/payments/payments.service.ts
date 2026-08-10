import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private websocketGateway: AppWebsocketGateway
  ) {}

  async getStats(businessId: string) {
    if (!businessId) return { todayRevenue: 0, transactions: 0, refunds: 0, pending: 0 };
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const allPayments = await this.prisma.payment.findMany({ where: { businessId } });
    const allRefunds = await this.prisma.refund.findMany({ where: { businessId } });

    const todayPayments = allPayments.filter(p => p.createdAt >= today);
    const todayRevenue = todayPayments.reduce((sum, p) => sum + p.amount, 0);

    const transactions = allPayments.length;
    
    // Refunds total
    const totalRefunds = allRefunds.reduce((sum, r) => sum + r.amount, 0);

    // Calculate pending from unpaid folios (simplified for real db)
    const pending = 0; // Keeping 0 unless we calculate full folios balances

    return {
      todayRevenue,
      transactions,
      refunds: totalRefunds,
      pending
    };
  }

  async findAll(businessId: string) {
    if (!businessId) return [];
    const payments = await this.prisma.payment.findMany({
      where: { businessId },
      orderBy: { createdAt: 'desc' }
    });

    return payments.map(p => ({
      id: p.paymentNumber,
      time: p.createdAt.toISOString(),
      method: p.paymentMethod,
      amount: p.amount,
      status: 'CONFIRMED',
      ref: p.orderId ? `Order #${p.orderId.substring(0, 8)}` : (p.folioId ? `Folio #${p.folioId.substring(0, 8)}` : 'Direct')
    }));
  }

  async create(businessId: string, data: any) {
    let branch = await this.prisma.branch.findFirst({ where: { businessId } });
    const payment = await this.prisma.payment.create({
      data: {
        businessId: businessId,
        branchId: branch?.id as string,
        paymentNumber: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
        paymentMethod: data.method,
        amount: parseFloat(data.amount),
        baseAmount: parseFloat(data.amount),
        currency: 'USD',
        referenceNumber: data.reference,
        orderId: data.orderId,
      }
    });

    this.websocketGateway.server.emit('payments.updated', { paymentId: payment.id });

    return payment;
  }
}
