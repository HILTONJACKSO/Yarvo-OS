import { Test, TestingModule } from '@nestjs/testing';
import { OrderFolioPostingController } from './order-folio-posting.controller';

describe('OrderFolioPostingController', () => {
  let controller: OrderFolioPostingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderFolioPostingController],
    }).compile();

    controller = module.get<OrderFolioPostingController>(OrderFolioPostingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
