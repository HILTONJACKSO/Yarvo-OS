import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentAllocationsService } from './payment-allocations.service';
import { CreatePaymentAllocationDto } from './dto/create-payment-allocation.dto';
import { UpdatePaymentAllocationDto } from './dto/update-payment-allocation.dto';

@Controller('payment-allocations')
export class PaymentAllocationsController {
  constructor(private readonly paymentAllocationsService: PaymentAllocationsService) {}

  @Post()
  create(@Body() createPaymentAllocationDto: CreatePaymentAllocationDto) {
    return this.paymentAllocationsService.create(createPaymentAllocationDto);
  }

  @Get()
  findAll() {
    return this.paymentAllocationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentAllocationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentAllocationDto: UpdatePaymentAllocationDto) {
    return this.paymentAllocationsService.update(+id, updatePaymentAllocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentAllocationsService.remove(+id);
  }
}
