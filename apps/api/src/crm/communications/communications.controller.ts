import { Controller, Get } from '@nestjs/common';
import { CommunicationsService } from './communications.service';

@Controller('crm/communications')
export class CommunicationsController {
  constructor(private readonly communicationsService: CommunicationsService) {}

  @Get()
  findAll() {
    return this.communicationsService.findAll();
  }
}
