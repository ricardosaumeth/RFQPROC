import amqp, { Connection, Channel } from 'amqplib/callback_api';
import FileSystem from 'fs';

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

    let unprocessed = '';
    let csvTotalLines: string[] = [];
    const readStream = FileSystem.createReadStream(`./2013-05-21-futures_ticks.csv`);

    readStream.on('data', (chunk: string | Buffer) => {
      let chunkString = unprocessed + chunk.toString();
      unprocessed = '';
      let startIndex = 0;
      for (let ch = startIndex; ch < chunkString.length; ch++) {
        if (chunkString[ch] === '\n') {
          const line = chunkString.slice(startIndex, ch);
          channel.sendToQueue(queue, Buffer.from(JSON.stringify(line)));
          startIndex = ch + 1;
          csvTotalLines.push(line);
          // uncomment the log to see the lines. It will slow the process
          // console.log(`Sending line: ${line}`)
        }
      }
      if (chunkString[chunkString.length - 1] !== '\n') {
        unprocessed = chunkString.slice(startIndex);
      }
    });

    readStream.on('end', () => {
      console.log('All currencies sent!');
      console.log(`Total rows processed: ${csvTotalLines.length}`);
    });
  });
});
