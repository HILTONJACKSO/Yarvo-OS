import { Controller, Get, Headers } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';

@Controller('crm/complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.complaintsService.findAll(businessId);
  }
}
