import { Test, TestingModule } from '@nestjs/testing';
import { OrderWebsocketGateway } from './order-websocket.gateway';

describe('OrderWebsocketGateway', () => {
  let gateway: OrderWebsocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderWebsocketGateway],
    }).compile();

    gateway = module.get<OrderWebsocketGateway>(OrderWebsocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
