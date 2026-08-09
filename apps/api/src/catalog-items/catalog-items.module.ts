import { Module } from '@nestjs/common';
import { CatalogItemsController } from './catalog-items.controller';
import { CatalogItemsService } from './catalog-items.service';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CatalogItemsController],
  providers: [CatalogItemsService]
})
export class CatalogItemsModule {}
