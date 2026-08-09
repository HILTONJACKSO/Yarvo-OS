import { Test, TestingModule } from '@nestjs/testing';
import { StayOccupantsService } from './stay-occupants.service';

describe('StayOccupantsService', () => {
  let service: StayOccupantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StayOccupantsService],
    }).compile();

    service = module.get<StayOccupantsService>(StayOccupantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
