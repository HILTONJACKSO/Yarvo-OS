import { Injectable } from '@nestjs/common';
import { CreatePurchaseRequestDto } from './dto/create-purchase-request.dto';
import { UpdatePurchaseRequestDto } from './dto/update-purchase-request.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PurchaseRequestsService {
  constructor(private prisma: PrismaService) {}

  async create(createPurchaseRequestDto: CreatePurchaseRequestDto, businessId: string, branchId: string, userId: string) {
    const { items, ...requestData } = createPurchaseRequestDto;
    
    // Generate a simple request number
    const requestNumber = `PR-${Date.now()}`;

    return this.prisma.purchaseRequest.create({
      data: {
        ...requestData,
        businessId,
        branchId,
        requestNumber,
        requestedByUserId: userId,
        requiredDate: requestData.requiredDate ? new Date(requestData.requiredDate) : null,
        items: {
          create: items.map(item => ({
            inventoryItemId: item.inventoryItemId,
            requestedQuantity: item.requestedQuantity,
            unitId: item.unitId || 'default-unit', // Provide fallback or map to correct unit
            estimatedUnitCost: item.estimatedUnitCost,
          }))
        }
      },
      include: {
        items: true,
      }
    });
  }

  findAll(businessId?: string) {
    return `This action returns all purchaseRequests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseRequest`;
  }

  update(id: number, updatePurchaseRequestDto: UpdatePurchaseRequestDto) {
    return `This action updates a #${id} purchaseRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseRequest`;
  }
}
