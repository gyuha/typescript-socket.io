import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import { Chat } from './chat';

// import { Message } from './model';

export class ChatServer {
  public static readonly PORT: number = 4040;
  private app: express.Application;
  private server: Server;
  private port: string | number;
  private chat: Chat;

  public constructor() {
    this.initial();
    this.listen();
    this.chat = new Chat(this.server);
  }

  private initial() {
    this.app = express();
    this.app.use(express.static('./public'));
    this.server = createServer(this.app);
    this.port = process.env.PORT || ChatServer.PORT;
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}
