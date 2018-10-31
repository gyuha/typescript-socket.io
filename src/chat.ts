import { Server } from 'http';
import * as socketio from 'socket.io';

export class Chat {
  private io: SocketIO.Server;

  public constructor(server: Server) {
    this.io = socketio(server);
    this.listen();
    return this;
  }

  private listen(): void {
    this.io.on('connect', (socket: any) => {
      socket.on('message', this.onMessage);
      socket.on('disconnect', this.onDisconnect);
    });
  }

  private onMessage(m: any) {
    console.log('TCL: SocketIO -> privateonMessage -> m', m);
  }

  private onDisconnect(m: any) {
    console.log('TCL: SocketIO -> privateonDisconnect -> m', m);
  }
}
