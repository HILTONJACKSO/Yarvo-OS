import { Test, TestingModule } from '@nestjs/testing';
import { CapacityControlService } from './capacity-control.service';

describe('CapacityControlService', () => {
  let service: CapacityControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CapacityControlService],
    }).compile();

    service = module.get<CapacityControlService>(CapacityControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
