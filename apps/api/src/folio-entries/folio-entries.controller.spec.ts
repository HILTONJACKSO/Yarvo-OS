import { Test, TestingModule } from '@nestjs/testing';
import { FolioEntriesController } from './folio-entries.controller';

describe('FolioEntriesController', () => {
  let controller: FolioEntriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FolioEntriesController],
    }).compile();

    controller = module.get<FolioEntriesController>(FolioEntriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
