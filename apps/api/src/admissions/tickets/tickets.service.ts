import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.ticketType.findMany();
  }

  createType(data: any) {
    return this.prisma.ticketType.create({
      data: {
        name: data.name,
        code: data.code,
        validityType: data.validityType,
        status: data.status,
        businessId: data.businessId || 'b1',
        venueId: data.venueId || 'v1',
      }
    });
  }

  deleteType(id: string) {
    return this.prisma.ticketType.delete({
      where: { id }
    });
  }

  async validateTicket(ticketNumber: string) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { ticketNumber }
    });

    if (!ticket) {
      return { status: 'invalid', message: 'TICKET NOT FOUND' };
    }

    if (ticket.status === 'EXPIRED') {
      return { status: 'invalid', message: 'TICKET EXPIRED', ticket };
    }
    
    if (ticket.status === 'USED') {
      return { status: 'invalid', message: 'TICKET ALREADY USED', ticket };
    }

    if (ticket.status === 'VOIDED' || ticket.status === 'CANCELLED') {
      return { status: 'invalid', message: 'TICKET VOIDED OR CANCELLED', ticket };
    }

    // Otherwise, assume it's valid for now. (More complex validation can check validity times)
    return { status: 'valid', message: 'TICKET VALID', ticket };
  }

  async issueTickets(tickets: any[]) {
    // tickets will be an array of items, we'll create individual Ticket records for each quantity
    const createdTickets = [];
    
    for (const item of tickets) {
      for (let i = 0; i < item.quantity; i++) {
        const token = Math.random().toString(36).substr(2, 9).toUpperCase() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        const ticket = await this.prisma.ticket.create({
          data: {
            businessId: 'b1',
            venueId: 'v1',
            ticketTypeId: item.id,
            ticketNumber: `TKT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            status: 'ACTIVE',
            validFrom: new Date(),
            qrToken: token,
          }
        });
        createdTickets.push(ticket);
      }
    }
    return createdTickets;
  }

  async getIssuedTickets() {
    const tickets = await this.prisma.ticket.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    const types = await this.prisma.ticketType.findMany();
    
    return tickets.map(ticket => ({
      ...ticket,
      ticketType: types.find(t => t.id === ticket.ticketTypeId) || null
    }));
  }
}
