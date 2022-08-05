import { WsAction } from 'core/transport/actions';
import ticker from './reducer';

describe('TickerReducer', () => {
  it('should handle update', () => {
    const [currency, timestamp, bid, ask] = ['GX1 Index', '2017-03-27T13:28:28.000', '11960.5', '11961'];
    const meta = undefined;
    const action = WsAction.wsMessage([currency, timestamp, bid, ask], meta);
    const result = ticker(undefined, action);

    expect(result).toEqual({
      [currency]: {
        currency,
        timestamp,
        bid,
        ask,
      },
    });
  });
});
