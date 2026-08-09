import { Module } from '@nestjs/common';
import { MenuBuilderController } from './menu-builder.controller';
import { MenuBuilderService } from './menu-builder.service';

@Module({
  controllers: [MenuBuilderController],
  providers: [MenuBuilderService]
})
export class MenuBuilderModule {}
