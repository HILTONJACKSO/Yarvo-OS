import { Test, TestingModule } from '@nestjs/testing';
import { KitchenDisplayController } from './kitchen-display.controller';

describe('KitchenDisplayController', () => {
  let controller: KitchenDisplayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KitchenDisplayController],
    }).compile();

    controller = module.get<KitchenDisplayController>(KitchenDisplayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
