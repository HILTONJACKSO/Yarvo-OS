import { Module } from '@nestjs/common';
import { OrderWebsocketGateway } from './order-websocket.gateway';

@Module({
  providers: [OrderWebsocketGateway]
})
export class OrderWebsocketModule {}
