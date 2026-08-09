import { Module } from '@nestjs/common';
import { GuestRequestsController } from './guest-requests.controller';
import { GuestRequestsService } from './guest-requests.service';

@Module({
  controllers: [GuestRequestsController],
  providers: [GuestRequestsService]
})
export class GuestRequestsModule {}
