import { Module } from '@nestjs/common';
import { CatalogModifiersController } from './catalog-modifiers.controller';
import { CatalogModifiersService } from './catalog-modifiers.service';

@Module({
  controllers: [CatalogModifiersController],
  providers: [CatalogModifiersService]
})
export class CatalogModifiersModule {}
