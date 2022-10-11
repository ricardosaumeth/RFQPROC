import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { isEmpty } from 'lodash';
import { Actions } from 'modules/root';
import { RootState } from './../root';
import { Dependencies } from './../redux/store';
import { Epic, ofType, combineEpics } from 'redux-observable';
import { isHeaderRow } from 'core/transport/utils';
import { toTimestamp } from './utils';
import { CandleActions, CandleData } from './actions';
import { WsMessage, WS_ACTION_TYPES } from './../../core/transport/actions';

interface ICandles {
  [symbol: string]: {
    bid: number;
    timestamp: number;
    volume: number;
  }[];
}

interface ISymbol {
  [symbol: string]: number;
}

let candles: ICandles = {};
let prevMinute: ISymbol = {};
let currentMinute: ISymbol = {};
let lastCandleCloseValue: ISymbol = {};

const candleEpics: Epic<Actions, Actions, RootState, Dependencies> = (action$, state$, { connection }) =>
  action$.pipe(
    ofType(WS_ACTION_TYPES.WS_MESSAGE),
    switchMap(action => {
      const data = create1MCandles(action as WsMessage);

      return from([
        CandleActions.subscribeToSymbol({
          data: data as CandleData,
          timeframe: '5m',
        }),
      ]);
    })
  );

export default combineEpics(candleEpics);

function create1MCandles(action: WsMessage) {
  const [currency, timestamp, bid, , , , , volume] = action.payload;

  if (isHeaderRow(action.payload)) {
    return undefined;
  }

  const date = new Date(timestamp);
  currentMinute[currency] = date.getMinutes();

  if (prevMinute[currency] + 1 === currentMinute[currency]) {
    prevMinute[currency] = currentMinute[currency];

    const firstElement = candles[currency][0];
    const lastElement = candles[currency].slice(candles[currency].length - 1);
    const close = lastElement[0].bid;
    const open = lastCandleCloseValue[currency] ? lastCandleCloseValue[currency] : firstElement.bid;
    const bidValues = candles[currency]?.map(element => element.bid);
    // chart looks better without the max and the min
    const high = open; //Math.max(...openValues);
    const low = close; //Math.min(...openValues);
    const timestamp = lastElement[0].timestamp;
    const volume = candles[currency]?.reduce((prev, curr) => {
      return prev + curr.volume;
    }, 0);

    lastCandleCloseValue[currency] = close;
    candles[currency] = [];

    // return a 1m candle
    return {
      timestamp,
      open,
      close,
      high,
      low,
      volume,
      symbol: currency,
    };
  } else {
    prevMinute[currency] = currentMinute[currency];

    // add a 1ms candle
    if (isEmpty(candles[currency])) {
      candles[currency] = [
        {
          bid: parseFloat(bid),
          timestamp: toTimestamp(timestamp),
          volume: parseFloat(volume),
        },
      ];
    } else {
      // update candles
      const _candles = candles[currency]?.slice();
      _candles?.push({
        bid: parseFloat(bid),
        timestamp: toTimestamp(timestamp),
        volume: parseFloat(volume),
      });
      candles[currency] = _candles;
    }
  }
}
