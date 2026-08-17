import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { PurchaseRequestsService } from './purchase-requests.service';
import { CreatePurchaseRequestDto } from './dto/create-purchase-request.dto';
import { UpdatePurchaseRequestDto } from './dto/update-purchase-request.dto';

@Controller('purchase-requests')
export class PurchaseRequestsController {
  constructor(private readonly purchaseRequestsService: PurchaseRequestsService) {}

  @Post()
  create(@Body() createPurchaseRequestDto: CreatePurchaseRequestDto) {
    return this.purchaseRequestsService.create(createPurchaseRequestDto);
  }

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.purchaseRequestsService.findAll(businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseRequestDto: UpdatePurchaseRequestDto) {
    return this.purchaseRequestsService.update(+id, updatePurchaseRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseRequestsService.remove(+id);
  }
}
