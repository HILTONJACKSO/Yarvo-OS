import { Module, Global } from '@nestjs/common';
import { AppWebsocketGateway } from './app-websocket.gateway';

@Global()
@Module({
  providers: [AppWebsocketGateway],
  exports: [AppWebsocketGateway],
})
export class WebsocketModule {}
