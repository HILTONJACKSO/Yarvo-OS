import { Test, TestingModule } from '@nestjs/testing';
import { OrderTransfersController } from './order-transfers.controller';

describe('OrderTransfersController', () => {
  let controller: OrderTransfersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderTransfersController],
    }).compile();

    controller = module.get<OrderTransfersController>(OrderTransfersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
