import { Controller, Get } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';

@Controller('crm/complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Get()
  findAll() {
    return this.complaintsService.findAll();
  }
}
