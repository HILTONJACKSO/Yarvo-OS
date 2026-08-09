import { Test, TestingModule } from '@nestjs/testing';
import { RoomTransfersService } from './room-transfers.service';

describe('RoomTransfersService', () => {
  let service: RoomTransfersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomTransfersService],
    }).compile();

    service = module.get<RoomTransfersService>(RoomTransfersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
