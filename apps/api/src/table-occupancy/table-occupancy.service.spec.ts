import { Test, TestingModule } from '@nestjs/testing';
import { TableOccupancyService } from './table-occupancy.service';

describe('TableOccupancyService', () => {
  let service: TableOccupancyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableOccupancyService],
    }).compile();

    service = module.get<TableOccupancyService>(TableOccupancyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
