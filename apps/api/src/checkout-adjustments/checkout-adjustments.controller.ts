import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { CheckoutAdjustmentsService } from './checkout-adjustments.service';
import { CreateCheckoutAdjustmentDto } from './dto/create-checkout-adjustment.dto';
import { UpdateCheckoutAdjustmentDto } from './dto/update-checkout-adjustment.dto';

@Controller('checkout-adjustments')
export class CheckoutAdjustmentsController {
  constructor(private readonly checkoutAdjustmentsService: CheckoutAdjustmentsService) {}

  @Post()
  create(@Body() createCheckoutAdjustmentDto: CreateCheckoutAdjustmentDto) {
    return this.checkoutAdjustmentsService.create(createCheckoutAdjustmentDto);
  }

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.checkoutAdjustmentsService.findAll(businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkoutAdjustmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckoutAdjustmentDto: UpdateCheckoutAdjustmentDto) {
    return this.checkoutAdjustmentsService.update(+id, updateCheckoutAdjustmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkoutAdjustmentsService.remove(+id);
  }
}
