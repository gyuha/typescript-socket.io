import { Server } from 'http';
import * as socketio from 'socket.io';
import * as events from 'events';
import * as url from 'url';

export class Chat {
  private io: SocketIO.Server;
  private ev: events;

  public constructor(server: Server) {
    this.io = socketio(server);
    this.listen();
    this.ev = new events.EventEmitter();

    return this;
  }

  private listen(): void {
    this.io.on('connect', (socket: socketio.Socket) => {
      let _this = this;
      const u = url.parse(socket.handshake.url, true);
      let ch: string = String(u.query.ch);
      console.log('TCL: Chat -> ch', ch);

      socket.join(ch);
      socket.on('message', (data: any) => {
        console.log('TCL: Message -> data', data);
        _this.onMessage(socket, ch, data);
      });
      socket.on('disconnect', this.onDisconnect);
    });
  }

  private onMessage(socket: any, ch: string, data: any) {
    socket.broadcast.to(ch).emit('message', data);
  }

  private onDisconnect(m: any) {
    console.log('TCL: SocketIO -> privateonDisconnect -> m', m);
  }
}
