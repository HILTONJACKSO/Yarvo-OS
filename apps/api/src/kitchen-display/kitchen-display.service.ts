import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class KitchenDisplayService {
  constructor(private prisma: PrismaService) {}

  async getTickets(businessId: string) {
    if (!businessId) return [];
    const tickets = await this.prisma.preparationTicket.findMany({
      where: { businessId },
      include: {
        order: {
          include: {
            orderItems: {
              include: {
                menuItem: true,
                modifiers: true
              }
            }
          }
        }
      },
      orderBy: { sentAt: 'asc' }
    });

    return tickets.map((ticket: any) => ({
      id: ticket.id,
      orderId: ticket.order?.orderNumber || ticket.orderId,
      orderType: ticket.order?.orderType || 'DINE_IN',
      table: ticket.order?.serviceTableId || 'Walk-in',
      status: ticket.status || 'NEW',
      priority: ticket.priority || 'NORMAL',
      receivedAt: ticket.sentAt,
      items: ticket.order?.orderItems?.map((item: any) => ({
        id: item.id,
        name: item.menuItem?.name || 'Item',
        quantity: item.quantity,
        notes: item.notes || '',
        modifiers: item.modifiers?.map((m: any) => m.name).join(', ') || ''
      })) || []
    }));
  }

  async updateTicketStatus(id: string, status: string) {
    return this.prisma.preparationTicket.update({
      where: { id },
      data: { status }
    });
  }
}
