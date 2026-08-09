import { Test, TestingModule } from '@nestjs/testing';
import { TableOccupancyController } from './table-occupancy.controller';

describe('TableOccupancyController', () => {
  let controller: TableOccupancyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableOccupancyController],
    }).compile();

    controller = module.get<TableOccupancyController>(TableOccupancyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
