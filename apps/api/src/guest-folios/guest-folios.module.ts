import { Module } from '@nestjs/common';
import { GuestFoliosController } from './guest-folios.controller';
import { GuestFoliosService } from './guest-folios.service';

@Module({
  controllers: [GuestFoliosController],
  providers: [GuestFoliosService]
})
export class GuestFoliosModule {}
