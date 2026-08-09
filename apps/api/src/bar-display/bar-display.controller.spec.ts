import { Test, TestingModule } from '@nestjs/testing';
import { BarDisplayController } from './bar-display.controller';

describe('BarDisplayController', () => {
  let controller: BarDisplayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BarDisplayController],
    }).compile();

    controller = module.get<BarDisplayController>(BarDisplayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
