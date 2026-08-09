import { Controller, Get, UseGuards } from '@nestjs/common';
import { BiService } from './bi.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('bi')
export class BiController {
  constructor(private readonly biService: BiService) {}

  @Get('executive')
  getExecutiveDashboard() {
    return this.biService.getExecutiveDashboard();
  }
}
