import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppWebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppWebsocketGateway');

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join_business')
  handleJoinBusiness(client: Socket, payload: { businessId: string }) {
    if (payload?.businessId) {
      client.join(payload.businessId);
      this.logger.log(`Client \${client.id} joined business room: \${payload.businessId}`);
    }
  }

  broadcast(event: string, data: any, businessId?: string) {
    if (this.server) {
      if (businessId) {
        this.server.to(businessId).emit(event, data);
      } else {
        // Fallback for system-wide broadcasts if needed
        this.server.emit(event, data);
      }
    }
  }
}
