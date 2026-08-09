import { Test, TestingModule } from '@nestjs/testing';
import { GuestFoliosService } from './guest-folios.service';

describe('GuestFoliosService', () => {
  let service: GuestFoliosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuestFoliosService],
    }).compile();

    service = module.get<GuestFoliosService>(GuestFoliosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
