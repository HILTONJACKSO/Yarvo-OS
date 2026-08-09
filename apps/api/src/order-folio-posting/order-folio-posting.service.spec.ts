import { Test, TestingModule } from '@nestjs/testing';
import { OrderFolioPostingService } from './order-folio-posting.service';

describe('OrderFolioPostingService', () => {
  let service: OrderFolioPostingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderFolioPostingService],
    }).compile();

    service = module.get<OrderFolioPostingService>(OrderFolioPostingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
