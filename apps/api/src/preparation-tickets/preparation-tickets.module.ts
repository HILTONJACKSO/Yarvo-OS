import { Module } from '@nestjs/common';
import { PreparationTicketsController } from './preparation-tickets.controller';
import { PreparationTicketsService } from './preparation-tickets.service';

@Module({
  controllers: [PreparationTicketsController],
  providers: [PreparationTicketsService]
})
export class PreparationTicketsModule {}
