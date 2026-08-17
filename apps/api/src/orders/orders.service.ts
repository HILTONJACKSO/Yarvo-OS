import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gateway: AppWebsocketGateway
  ) {}

  async createDraftOrder(businessId: string, providedBranchId: string, orderType: string, serviceTableId?: string) {
    const orderNumber = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Get a valid branch ID for this business
    let branchId = providedBranchId;
    const branch = await this.prisma.branch.findFirst({ where: { businessId } });
    if (branch) {
      branchId = branch.id;
    }

    const order = await this.prisma.order.create({
      data: {
        businessId,
        branchId,
        orderNumber,
        orderType,
        serviceTableId,
        status: 'DRAFT',
      }
    });

    this.gateway.broadcast('order.updated', order, order.businessId);
    return order;
  }

  async findAll(businessId?: string) {
    return this.prisma.order.findMany({ where: businessId ? { businessId } : undefined, 
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
    const existingOrder = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!existingOrder) throw new NotFoundException('Order not found');

    // Delete existing items
    await this.prisma.orderItem.deleteMany({
      where: { orderId }
    });

    // Create new items
    if (items.length > 0) {
      await this.prisma.orderItem.createMany({
        data: items.map(item => ({
          businessId: existingOrder.businessId,
          branchId: existingOrder.branchId,
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

    this.gateway.broadcast('order.updated', order, order.businessId);
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

    this.gateway.broadcast('order.updated', order, order.businessId);
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
    
    if (order) {
      const allDelivered = order.items.every(i => i.status === 'DELIVERED');
      if (allDelivered && order.status !== 'DELIVERED' && order.status !== 'COMPLETED') {
        await this.prisma.order.update({
          where: { id: order.id },
          data: { status: 'DELIVERED' }
        });
        order.status = 'DELIVERED';
      }
    }
    
    this.gateway.broadcast('order.updated', order, order?.businessId);
    return item;
  }

  async cancelOrder(orderId: string, pin: string, businessId: string) {
    const validManager = await this.prisma.businessMember.findFirst({
      where: {
        businessId,
        role: { in: ['OWNER', 'MANAGER', 'ADMIN'] },
        user: { posPin: pin }
      }
    });

    if (!validManager) {
      throw new UnauthorizedException('Invalid PIN or unauthorized role');
    }

    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' },
      include: { items: true }
    });

    // Update all items to CANCELLED as well
    await this.prisma.orderItem.updateMany({
      where: { orderId: orderId },
      data: { status: 'CANCELLED' }
    });

    // Refetch to emit updated items
    const updatedOrder = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true }
    });

    this.gateway.broadcast('order.updated', updatedOrder, updatedOrder?.businessId);
    return updatedOrder;
  }
}
