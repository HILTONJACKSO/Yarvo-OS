import { Test, TestingModule } from '@nestjs/testing';
import { OrderRoundsService } from './order-rounds.service';

describe('OrderRoundsService', () => {
  let service: OrderRoundsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderRoundsService],
    }).compile();

    service = module.get<OrderRoundsService>(OrderRoundsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
