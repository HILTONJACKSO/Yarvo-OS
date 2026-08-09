import { Test, TestingModule } from '@nestjs/testing';
import { FolioEntriesService } from './folio-entries.service';

describe('FolioEntriesService', () => {
  let service: FolioEntriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FolioEntriesService],
    }).compile();

    service = module.get<FolioEntriesService>(FolioEntriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
