import { Test, TestingModule } from '@nestjs/testing';
import { KitchenDisplayService } from './kitchen-display.service';

describe('KitchenDisplayService', () => {
  let service: KitchenDisplayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KitchenDisplayService],
    }).compile();

    service = module.get<KitchenDisplayService>(KitchenDisplayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
