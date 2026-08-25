import { Injectable } from '@nestjs/common';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PurchaseOrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto, businessId: string, branchId: string, userId: string) {
    const { items, ...orderData } = createPurchaseOrderDto;
    
    // Generate a simple order number
    const purchaseOrderNumber = `PO-${Date.now()}`;

    // Create the purchase order first
    const order = await this.prisma.purchaseOrder.create({
      data: {
        ...orderData,
        businessId,
        branchId,
        purchaseOrderNumber,
        createdByUserId: userId,
        orderDate: new Date(),
        expectedDeliveryDate: orderData.expectedDeliveryDate ? new Date(orderData.expectedDeliveryDate) : null,
      }
    });

    // Create the items manually since there is no implicit relation in schema
    await Promise.all(items.map(item => 
      this.prisma.purchaseOrderItem.create({
        data: {
          purchaseOrderId: order.id,
          inventoryItemId: item.inventoryItemId,
          orderedQuantity: item.orderedQuantity,
          unitId: item.unitId || 'default-unit', // Provide fallback
          unitCost: item.unitCost,
          taxAmount: item.taxAmount,
          lineTotal: item.lineTotal,
        }
      })
    ));

    return order;
  }

  findAll(businessId?: string) {
    if (!businessId) return [];
    return this.prisma.purchaseOrder.findMany({
      where: { businessId },
      orderBy: { createdAt: 'desc' }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseOrder`;
  }

  update(id: number, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return `This action updates a #${id} purchaseOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseOrder`;
  }
}
