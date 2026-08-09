import { Test, TestingModule } from '@nestjs/testing';
import { OrderDeliveryService } from './order-delivery.service';

describe('OrderDeliveryService', () => {
  let service: OrderDeliveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderDeliveryService],
    }).compile();

    service = module.get<OrderDeliveryService>(OrderDeliveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
