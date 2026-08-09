import { Test, TestingModule } from '@nestjs/testing';
import { GateControlService } from './gate-control.service';

describe('GateControlService', () => {
  let service: GateControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GateControlService],
    }).compile();

    service = module.get<GateControlService>(GateControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
