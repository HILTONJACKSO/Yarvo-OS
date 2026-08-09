import { Test, TestingModule } from '@nestjs/testing';
import { RoomServiceOrdersController } from './room-service-orders.controller';

describe('RoomServiceOrdersController', () => {
  let controller: RoomServiceOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomServiceOrdersController],
    }).compile();

    controller = module.get<RoomServiceOrdersController>(RoomServiceOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
