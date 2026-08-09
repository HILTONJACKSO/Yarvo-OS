import { Test, TestingModule } from '@nestjs/testing';
import { OrderMergingService } from './order-merging.service';

describe('OrderMergingService', () => {
  let service: OrderMergingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderMergingService],
    }).compile();

    service = module.get<OrderMergingService>(OrderMergingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
