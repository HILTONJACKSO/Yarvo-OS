import { Controller, Get, Headers } from '@nestjs/common';
import { CommunicationsService } from './communications.service';

@Controller('crm/communications')
export class CommunicationsController {
  constructor(private readonly communicationsService: CommunicationsService) {}

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.communicationsService.findAll(businessId);
  }
}
