import { Injectable } from '@nestjs/common';
import { CreatePurchaseRequestDto } from './dto/create-purchase-request.dto';
import { UpdatePurchaseRequestDto } from './dto/update-purchase-request.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PurchaseRequestsService {
  constructor(private prisma: PrismaService) {}

  async create(createPurchaseRequestDto: CreatePurchaseRequestDto, businessId: string, branchId: string, userId: string) {
    const { items, ...requestData } = createPurchaseRequestDto;
    
    // Generate a simple request number
    const requestNumber = `PR-${Date.now()}`;

    // Create the purchase request first
    const request = await this.prisma.purchaseRequest.create({
      data: {
        ...requestData,
        businessId,
        branchId,
        requestNumber,
        requestedByUserId: userId,
        requiredDate: requestData.requiredDate ? new Date(requestData.requiredDate) : null,
      }
    });

    // Create the items manually since there is no implicit relation in schema
    await Promise.all(items.map(item => 
      this.prisma.purchaseRequestItem.create({
        data: {
          purchaseRequestId: request.id,
          inventoryItemId: item.inventoryItemId,
          requestedQuantity: item.requestedQuantity,
          unitId: item.unitId || 'default-unit', // Provide fallback
          estimatedUnitCost: item.estimatedUnitCost,
        }
      })
    ));

    return request;
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
