import { Module } from '@nestjs/common';
import { PreparationStationsController } from './preparation-stations.controller';
import { PreparationStationsService } from './preparation-stations.service';

@Module({
  controllers: [PreparationStationsController],
  providers: [PreparationStationsService]
})
export class PreparationStationsModule {}
