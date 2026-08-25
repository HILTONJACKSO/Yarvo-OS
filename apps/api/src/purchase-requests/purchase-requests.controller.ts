import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, UseGuards, Request } from '@nestjs/common';
import { PurchaseRequestsService } from './purchase-requests.service';
import { CreatePurchaseRequestDto } from './dto/create-purchase-request.dto';
import { UpdatePurchaseRequestDto } from './dto/update-purchase-request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('purchase-requests')
export class PurchaseRequestsController {
  constructor(private readonly purchaseRequestsService: PurchaseRequestsService) {}

  @Post()
  create(
    @Body() createPurchaseRequestDto: CreatePurchaseRequestDto,
    @Headers('x-business-id') businessId: string,
    @Request() req: any
  ) {
    // In Yarvo OS, branchId can be derived from current branch header or defaulted
    const branchId = req.headers['x-branch-id'] || 'default-branch';
    const userId = req.user?.id || 'system';
    return this.purchaseRequestsService.create(createPurchaseRequestDto, businessId, branchId, userId);
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
