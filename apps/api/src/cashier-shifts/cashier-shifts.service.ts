import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';

@Injectable()
export class CashierShiftsService {
  constructor(
    private prisma: PrismaService,
    private websocketGateway: AppWebsocketGateway
  ) {}

  async getCurrentShift(businessId: string) {
    if (!businessId) return null;
    let branch = await this.prisma.branch.findFirst({ where: { businessId } });
    if (!branch) return null;
    
    const shift = await this.prisma.cashierShift.findFirst({
      where: { status: 'OPEN', businessId, branchId: branch.id },
      orderBy: { openedAt: 'desc' }
    });

    if (!shift) {
      return null;
    }

    const payments = await this.prisma.payment.findMany({
      where: {
        businessId,
        createdAt: { gte: shift.openedAt }
      },
      orderBy: { createdAt: 'desc' }
    });

    let cashSales = 0;
    let cardSales = 0;
    let mobileMoneySales = 0;

    const recentTransactions = payments.slice(0, 10).map((p, index) => ({
      id: p.id,
      time: p.createdAt.toISOString(),
      receipt: p.paymentNumber,
      type: 'PAYMENT',
      method: p.paymentMethod,
      amount: p.amount
    }));

    payments.forEach(p => {
      if (p.paymentMethod === 'CASH') cashSales += p.amount;
      else if (p.paymentMethod === 'CARD' || p.paymentMethod === 'DEBIT_CARD' || p.paymentMethod === 'CREDIT_CARD') cardSales += p.amount;
      else if (p.paymentMethod === 'MOBILE_MONEY') mobileMoneySales += p.amount;
    });

    const cashOut = 0;
    const cashIn = 0;
    const expectedCash = shift.openingCash + cashSales + cashIn - cashOut;

    await this.prisma.cashierShift.update({
      where: { id: shift.id },
      data: { expectedCash }
    });

    return {
      id: shift.id,
      status: shift.status,
      registerName: 'Main Front Desk Register',
      openedAt: shift.openedAt.toISOString(),
      openingCash: shift.openingCash,
      cashSales,
      cardSales,
      mobileMoneySales,
      cashIn,
      cashOut,
      expectedCash,
      recentTransactions
    };
  }

  async openShift(businessId: string, userId: string, data: any) {
    let branch = await this.prisma.branch.findFirst({ where: { businessId } });
    
    const existing = await this.prisma.cashierShift.findFirst({
      where: { status: 'OPEN', businessId }
    });

    if (existing) {
      throw new BadRequestException('A shift is already open');
    }

    const shift = await this.prisma.cashierShift.create({
      data: {
        businessId: businessId,
        branchId: branch?.id,
        cashRegisterId: data.cashRegisterId || 'REG-001',
        employeeId: userId,
        openedByUserId: userId,
        openingCash: parseFloat(data.openingCash) || 0,
        expectedCash: parseFloat(data.openingCash) || 0,
        status: 'OPEN',
        openingNote: data.notes
      }
    });

    this.websocketGateway.server.emit('cashier.updated', { shiftId: shift.id });
    return shift;
  }

  async closeShift(businessId: string, userId: string, data: any) {
    const shift = await this.prisma.cashierShift.findFirst({
      where: { status: 'OPEN', businessId }
    });

    if (!shift) {
      throw new NotFoundException('No active shift found');
    }

    const actualCash = parseFloat(data.actualCash) || 0;
    const cashDifference = actualCash - shift.expectedCash;
    let differenceStatus = 'BALANCED';
    
    if (cashDifference > 0) differenceStatus = 'OVER';
    if (cashDifference < 0) differenceStatus = 'SHORT';

    const updated = await this.prisma.cashierShift.update({
      where: { id: shift.id },
      data: {
        status: 'CLOSED',
        closedAt: new Date(),
        closedByUserId: userId,
        actualCash,
        cashDifference,
        differenceStatus,
        closingNote: data.notes
      }
    });

    this.websocketGateway.server.emit('cashier.updated', { shiftId: updated.id });
    return updated;
  }
}
