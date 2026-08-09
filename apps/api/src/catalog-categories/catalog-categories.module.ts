import { Module } from '@nestjs/common';
import { CatalogCategoriesController } from './catalog-categories.controller';
import { CatalogCategoriesService } from './catalog-categories.service';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CatalogCategoriesController],
  providers: [CatalogCategoriesService]
})
export class CatalogCategoriesModule {}
