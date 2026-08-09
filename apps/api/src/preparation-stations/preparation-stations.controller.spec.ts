import { Test, TestingModule } from '@nestjs/testing';
import { PreparationStationsController } from './preparation-stations.controller';

describe('PreparationStationsController', () => {
  let controller: PreparationStationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreparationStationsController],
    }).compile();

    controller = module.get<PreparationStationsController>(PreparationStationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
