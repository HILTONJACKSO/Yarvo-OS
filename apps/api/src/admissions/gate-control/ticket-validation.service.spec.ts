import { Test, TestingModule } from '@nestjs/testing';
import { TicketValidationService } from './ticket-validation.service';

describe('TicketValidationService', () => {
  let service: TicketValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketValidationService],
    }).compile();

    service = module.get<TicketValidationService>(TicketValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
