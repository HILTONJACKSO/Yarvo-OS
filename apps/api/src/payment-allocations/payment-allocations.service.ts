import { Injectable } from '@nestjs/common';
import { CreatePaymentAllocationDto } from './dto/create-payment-allocation.dto';
import { UpdatePaymentAllocationDto } from './dto/update-payment-allocation.dto';

@Injectable()
export class PaymentAllocationsService {
  create(createPaymentAllocationDto: CreatePaymentAllocationDto) {
    return 'This action adds a new paymentAllocation';
  }

  findAll(businessId?: string) {
    return `This action returns all paymentAllocations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentAllocation`;
  }

  update(id: number, updatePaymentAllocationDto: UpdatePaymentAllocationDto) {
    return `This action updates a #${id} paymentAllocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentAllocation`;
  }
}
