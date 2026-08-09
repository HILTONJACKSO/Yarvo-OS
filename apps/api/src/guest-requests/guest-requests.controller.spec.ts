import { Test, TestingModule } from '@nestjs/testing';
import { GuestRequestsController } from './guest-requests.controller';

describe('GuestRequestsController', () => {
  let controller: GuestRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuestRequestsController],
    }).compile();

    controller = module.get<GuestRequestsController>(GuestRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
