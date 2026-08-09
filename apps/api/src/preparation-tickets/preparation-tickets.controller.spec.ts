import { Test, TestingModule } from '@nestjs/testing';
import { PreparationTicketsController } from './preparation-tickets.controller';

describe('PreparationTicketsController', () => {
  let controller: PreparationTicketsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreparationTicketsController],
    }).compile();

    controller = module.get<PreparationTicketsController>(PreparationTicketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
