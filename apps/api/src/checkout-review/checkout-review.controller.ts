import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { CheckoutReviewService } from './checkout-review.service';
import { CreateCheckoutReviewDto } from './dto/create-checkout-review.dto';
import { UpdateCheckoutReviewDto } from './dto/update-checkout-review.dto';

@Controller('checkout-review')
export class CheckoutReviewController {
  constructor(private readonly checkoutReviewService: CheckoutReviewService) {}

  @Post()
  create(@Body() createCheckoutReviewDto: CreateCheckoutReviewDto) {
    return this.checkoutReviewService.create(createCheckoutReviewDto);
  }

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.checkoutReviewService.findAll(businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkoutReviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckoutReviewDto: UpdateCheckoutReviewDto) {
    return this.checkoutReviewService.update(+id, updateCheckoutReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkoutReviewService.remove(+id);
  }
}
