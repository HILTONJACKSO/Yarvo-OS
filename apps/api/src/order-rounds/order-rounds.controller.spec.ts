import { Test, TestingModule } from '@nestjs/testing';
import { OrderRoundsController } from './order-rounds.controller';

describe('OrderRoundsController', () => {
  let controller: OrderRoundsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderRoundsController],
    }).compile();

    controller = module.get<OrderRoundsController>(OrderRoundsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
