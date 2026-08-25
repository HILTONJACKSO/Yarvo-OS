import { Module } from '@nestjs/common';
import { StockLocationsService } from './stock-locations.service';
import { StockLocationsController } from './stock-locations.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StockLocationsController],
  providers: [StockLocationsService],
})
export class StockLocationsModule {}
