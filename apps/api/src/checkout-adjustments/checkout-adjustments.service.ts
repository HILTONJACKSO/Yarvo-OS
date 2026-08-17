import { Injectable } from '@nestjs/common';
import { CreateCheckoutAdjustmentDto } from './dto/create-checkout-adjustment.dto';
import { UpdateCheckoutAdjustmentDto } from './dto/update-checkout-adjustment.dto';

@Injectable()
export class CheckoutAdjustmentsService {
  create(createCheckoutAdjustmentDto: CreateCheckoutAdjustmentDto) {
    return 'This action adds a new checkoutAdjustment';
  }

  findAll(businessId?: string) {
    return `This action returns all checkoutAdjustments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkoutAdjustment`;
  }

  update(id: number, updateCheckoutAdjustmentDto: UpdateCheckoutAdjustmentDto) {
    return `This action updates a #${id} checkoutAdjustment`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkoutAdjustment`;
  }
}
