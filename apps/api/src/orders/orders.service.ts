import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gateway: AppWebsocketGateway
  ) {}

  async createDraftOrder(orderType: string) {
    const defaultBusinessId = 'bus_1';
    const defaultBranchId = 'br_1';
    const orderNumber = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const order = await this.prisma.order.create({
      data: {
        businessId: defaultBusinessId,
        branchId: defaultBranchId,
        orderNumber,
        orderType,
        status: 'DRAFT',
      }
    });

    this.gateway.server.emit('order.updated', order);
    return order;
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        items: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true }
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateItems(orderId: string, items: any[]) {
    // Delete existing items
    await this.prisma.orderItem.deleteMany({
      where: { orderId }
    });

    // Create new items
    if (items.length > 0) {
      const defaultBusinessId = 'bus_1';
      const defaultBranchId = 'br_1';

      await this.prisma.orderItem.createMany({
        data: items.map(item => ({
          businessId: defaultBusinessId,
          branchId: defaultBranchId,
          orderId,
          catalogItemId: item.catalogItemId,
          itemNameSnapshot: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
          grossAmount: item.price * item.quantity,
          netAmount: item.price * item.quantity,
          status: item.status || 'DRAFT',
        }))
      });
    }

    // Calculate totals
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const taxAmount = subtotal * 0.1;
    const estimatedTotal = subtotal + taxAmount;

    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { subtotal, estimatedTaxAmount: taxAmount, estimatedTotal },
      include: { items: true }
    });

    this.gateway.server.emit('order.updated', order);
    return order;
  }

  async updateOrderStatus(orderId: string, data: { status: string, itemStatus?: string }) {
    if (data.itemStatus) {
      await this.prisma.orderItem.updateMany({
        where: { orderId },
        data: { status: data.itemStatus }
      });
    }

    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { status: data.status },
      include: { items: true }
    });

    this.gateway.server.emit('order.updated', order);
    return order;
  }

  async updateItemStatus(itemId: string, status: string) {
    const item = await this.prisma.orderItem.update({
      where: { id: itemId },
      data: { status }
    });
    
    // Fetch the parent order to emit its update
    const order = await this.prisma.order.findUnique({
      where: { id: item.orderId },
      include: { items: true }
    });
    
    this.gateway.server.emit('order.updated', order);
    return item;
  }
}
