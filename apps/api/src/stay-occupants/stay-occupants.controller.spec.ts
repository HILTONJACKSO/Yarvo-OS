import { Test, TestingModule } from '@nestjs/testing';
import { StayOccupantsController } from './stay-occupants.controller';

describe('StayOccupantsController', () => {
  let controller: StayOccupantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StayOccupantsController],
    }).compile();

    controller = module.get<StayOccupantsController>(StayOccupantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
