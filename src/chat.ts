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
      socket.broadcast.emit('message', { message: 'hi' });
      console.log('connenct');
      var _this = this;
      socket.on('message', (data: any) => {
        _this.onMessage(socket, data);
      });
      socket.on('disconnect', this.onDisconnect);
    });
  }

  private onMessage(socket: any, data: any) {
    socket.broadcast.emit('message', data);
  }

  private onDisconnect(m: any) {
    console.log('TCL: SocketIO -> privateonDisconnect -> m', m);
  }
}
