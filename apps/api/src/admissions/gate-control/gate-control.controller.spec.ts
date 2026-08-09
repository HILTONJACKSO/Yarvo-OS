import { Test, TestingModule } from '@nestjs/testing';
import { GateControlController } from './gate-control.controller';

describe('GateControlController', () => {
  let controller: GateControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GateControlController],
    }).compile();

    controller = module.get<GateControlController>(GateControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
