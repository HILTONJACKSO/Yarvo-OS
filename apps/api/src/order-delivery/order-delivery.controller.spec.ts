import { Test, TestingModule } from '@nestjs/testing';
import { OrderDeliveryController } from './order-delivery.controller';

describe('OrderDeliveryController', () => {
  let controller: OrderDeliveryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderDeliveryController],
    }).compile();

    controller = module.get<OrderDeliveryController>(OrderDeliveryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
