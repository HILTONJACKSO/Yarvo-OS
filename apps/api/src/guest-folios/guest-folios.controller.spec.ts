import { Test, TestingModule } from '@nestjs/testing';
import { GuestFoliosController } from './guest-folios.controller';

describe('GuestFoliosController', () => {
  let controller: GuestFoliosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuestFoliosController],
    }).compile();

    controller = module.get<GuestFoliosController>(GuestFoliosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
