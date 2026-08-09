import { Test, TestingModule } from '@nestjs/testing';
import { GuestRequestsService } from './guest-requests.service';

describe('GuestRequestsService', () => {
  let service: GuestRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuestRequestsService],
    }).compile();

    service = module.get<GuestRequestsService>(GuestRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
