import { Module } from '@nestjs/common';
import { ServiceChargesService } from './service-charges.service';
import { ServiceChargesController } from './service-charges.controller';

@Module({
  controllers: [ServiceChargesController],
  providers: [ServiceChargesService],
})
export class ServiceChargesModule {}
