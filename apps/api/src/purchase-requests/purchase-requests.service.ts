import { Injectable } from '@nestjs/common';
import { CreatePurchaseRequestDto } from './dto/create-purchase-request.dto';
import { UpdatePurchaseRequestDto } from './dto/update-purchase-request.dto';

@Injectable()
export class PurchaseRequestsService {
  create(createPurchaseRequestDto: CreatePurchaseRequestDto) {
    return 'This action adds a new purchaseRequest';
  }

  findAll() {
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
