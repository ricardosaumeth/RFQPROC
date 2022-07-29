import amqp, { Connection, Channel } from 'amqplib/callback_api';
import { setConnection, sendQueuesToWebSocket } from './ws';

setConnection({ port: 8000, perMessageDeflate: false });

const config = {
  protocol: 'amqp',
  hostname: 'localhost',
  port: 5672,
  username: 'guest',
  password: 'guest',
  locale: 'en_US',
  frameMax: 0,
  heartbeat: 60,
  vhost: '/',
};

amqp.connect(config, (connError: string, connection: Connection) => {
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

    channel.consume(
      queue,
      msg => {
        if (msg !== null) {
          channel.ack(msg);
          sendQueuesToWebSocket(msg.content.toString());
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
