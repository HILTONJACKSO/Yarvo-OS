import { Test, TestingModule } from '@nestjs/testing';
import { OrderMergingController } from './order-merging.controller';

describe('OrderMergingController', () => {
  let controller: OrderMergingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderMergingController],
    }).compile();

    controller = module.get<OrderMergingController>(OrderMergingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
