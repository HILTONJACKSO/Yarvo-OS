import { Test, TestingModule } from '@nestjs/testing';
import { PreparationStationsService } from './preparation-stations.service';

describe('PreparationStationsService', () => {
  let service: PreparationStationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreparationStationsService],
    }).compile();

    service = module.get<PreparationStationsService>(PreparationStationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
