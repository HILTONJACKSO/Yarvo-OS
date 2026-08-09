import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RoomServiceOrdersService {
  constructor(private prisma: PrismaService) {}

  async getOrders() {
    const orders = await this.prisma.order.findMany({
      where: { orderType: 'ROOM_SERVICE' },
      include: {
        items: true
      },
      orderBy: { openedAt: 'desc' }
    });

    return orders.map((order: any) => {
      return {
        id: order.id,
        orderId: order.orderNumber,
        room: order.stayId ? `Stay: ${order.stayId.substring(0, 8)}` : 'Walk-in',
        guest: order.customerId || 'Guest',
        status: order.status,
        orderedAt: order.openedAt,
        total: `$${order.estimatedTotal || 0}`,
        items: order.items.map((i: any) => ({
          name: i.itemNameSnapshot,
          quantity: i.quantity,
          note: i.preparationNote || ''
        }))
      };
    });
  }

  async updateOrderStatus(id: string, status: string) {
    return this.prisma.order.update({
      where: { id },
      data: { status }
    });
  }
}
