import { Module } from '@nestjs/common';
import { FolioEntriesController } from './folio-entries.controller';
import { FolioEntriesService } from './folio-entries.service';

@Module({
  controllers: [FolioEntriesController],
  providers: [FolioEntriesService]
})
export class FolioEntriesModule {}
