import { useState, useEffect } from 'react';
import { IMessageEvent, w3cwebsocket as ws } from 'websocket';

const client = new ws('ws://localhost:8000');

function App() {
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState('');

  useEffect(() => {
    client.onerror = function () {
      console.log('Connection Error');
    };
    client.onopen = function () {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = function (e: IMessageEvent) {
      console.log(e.data);
      setCounter((prevCounter) => prevCounter + 1);
      setData(e.data.toString());
    };
  }, []);

  return (
    <>
      <div>Currency | Timestamp | Bid | Ask</div>
      <div>{data}</div>
      <div>{counter}</div>
    </>
  );
}

export default App;
