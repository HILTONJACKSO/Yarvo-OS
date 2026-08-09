import { Test, TestingModule } from '@nestjs/testing';
import { OrderTransfersService } from './order-transfers.service';

describe('OrderTransfersService', () => {
  let service: OrderTransfersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderTransfersService],
    }).compile();

    service = module.get<OrderTransfersService>(OrderTransfersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
