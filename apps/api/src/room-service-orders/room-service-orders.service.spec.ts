import { Test, TestingModule } from '@nestjs/testing';
import { RoomServiceOrdersService } from './room-service-orders.service';

describe('RoomServiceOrdersService', () => {
  let service: RoomServiceOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomServiceOrdersService],
    }).compile();

    service = module.get<RoomServiceOrdersService>(RoomServiceOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
