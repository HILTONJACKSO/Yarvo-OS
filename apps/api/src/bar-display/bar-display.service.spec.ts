import { Test, TestingModule } from '@nestjs/testing';
import { BarDisplayService } from './bar-display.service';

describe('BarDisplayService', () => {
  let service: BarDisplayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BarDisplayService],
    }).compile();

    service = module.get<BarDisplayService>(BarDisplayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
