import WebSocket, { WebSocketServer } from 'ws';

let wss: WebSocket.Server<WebSocket.WebSocket>;
let socket: WebSocket.WebSocket;
let isConnected: boolean = false;

export function setConnection(server: WebSocket.ServerOptions | undefined) {
  wss = new WebSocketServer(server);
  console.log(`Listening on port: ${server?.port}`);
}

export function sendQueuesToWebSocket(message: string) {
  if (!isConnected) {
    wss.on('connection', function (ws) {
      console.info('Websocket connection opened');

      ws.on('error', function (error: string) {
        console.log(`Error: ${error}`);
        ws.send(error);
      });

      socket = ws;
      ws.send(JSON.parse(message));
    });
    isConnected = true;
  } else if (isConnected) {
    socket?.send(JSON.parse(message));
  }
}
