// app.gateway.ts

import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventEmitter2 } from '@nestjs/event-emitter';

@WebSocketGateway({ cors: { origin: '*' } })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private eventEmitter: EventEmitter2) {}

  afterInit(server: Server) {
    this.eventEmitter.on('comment.new', (comment) => {
      console.log(
        `In gateway, event: ${'comment.new'} comment: ${JSON.stringify(
          comment,
        )}`,
      );

      this.server.emit('comment.new', comment);
    });
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected'); // log when a client connects
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected'); // log when a client disconnects
  }
}
