import amqp, { Connection, Channel } from 'amqplib/callback_api';
import { setConnection, sendQueuesToWebSocket } from './ws';

setConnection({ port: 8000, perMessageDeflate: true });

amqp.connect('amqp://localhost', (connError: string, connection: Connection) => {
  if (connError) {
    throw connError;
  }
  connection.createChannel((channelError: string, channel: Channel) => {
    if (channelError) {
      throw channelError;
    }

    const queue = 'Currencies';

    channel.assertQueue(queue, {
      durable: true,
    });

    channel.prefetch(3);

    channel.consume(
      queue,
      msg => {
        if (msg !== null) {
          setTimeout(() => {
            console.log(msg.content.toString());
            sendQueuesToWebSocket(msg.content.toString());
            channel.ack(msg);
          }, 100);
        } else {
          console.log('Consumer cancelled by server');
        }
      },
      {
        noAck: false,
      }
    );
  });
});
