import { Controller, Get } from '@nestjs/common';
import { AssetsService } from './assets.service';

@Controller('finance/assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get()
  findAll() {
    return this.assetsService.findAll();
  }
}
