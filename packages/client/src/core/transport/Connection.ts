import { ConnectionProxy } from './types/ConnectionProxy';

export class Connection {
  constructor(private connectionProxy: ConnectionProxy) {}

  connect() {
    this.connectionProxy.start();
  }

  disconenct() {
    this.connectionProxy.stop();
  }

  send(message: any): void {
    this.connectionProxy.send(message);
  }

  onConenct(callback: () => void) {
    this.connectionProxy.onConnect(callback);
  }

  onReceive(callback: (data: any) => void) {
    this.connectionProxy.onReceived(callback);
  }
}
