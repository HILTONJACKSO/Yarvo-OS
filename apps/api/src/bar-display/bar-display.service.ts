import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BarDisplayService {
  constructor(private prisma: PrismaService) {}

  async getTickets() {
    // For robust implementation, we would filter by a PreparationStation where type === 'BAR'
    const tickets = await this.prisma.preparationTicket.findMany({
      include: {
        order: true
      },
      orderBy: { sentAt: 'asc' }
    });

    return tickets.map((ticket: any) => ({
      id: ticket.id,
      orderId: ticket.order?.orderNumber || ticket.orderId,
      orderType: ticket.order?.orderType || 'DINE_IN',
      table: ticket.order?.serviceTableId || 'Bar',
      status: ticket.status || 'NEW',
      priority: ticket.priority || 'NORMAL',
      receivedAt: ticket.sentAt,
      items: [] // Placeholder
    }));
  }

  async updateTicketStatus(id: string, status: string) {
    return this.prisma.preparationTicket.update({
      where: { id },
      data: { status }
    });
  }
}
