import { Test, TestingModule } from '@nestjs/testing';
import { RoomTransfersController } from './room-transfers.controller';

describe('RoomTransfersController', () => {
  let controller: RoomTransfersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomTransfersController],
    }).compile();

    controller = module.get<RoomTransfersController>(RoomTransfersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
