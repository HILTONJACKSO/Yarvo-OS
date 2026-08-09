import { Module } from '@nestjs/common';
import { StayOverServicesService } from './stay-over-services.service';
import { StayOverServicesController } from './stay-over-services.controller';

@Module({
  controllers: [StayOverServicesController],
  providers: [StayOverServicesService],
})
export class StayOverServicesModule {}
