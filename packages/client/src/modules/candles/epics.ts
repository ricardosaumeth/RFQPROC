import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { isEmpty } from 'lodash';
import { Actions } from 'modules/root';
import { RootState } from './../root';
import { Dependencies } from './../redux/store';
import { Epic, ofType, combineEpics } from 'redux-observable';
import { isHeaderRow } from 'core/transport/utils';
import { toTimestamp } from './utils';
import { CandleActions } from './actions';
import { getCurrentCurrency } from 'modules/reference-data/selector';
import { WsMessage, WS_ACTION_TYPES } from './../../core/transport/actions';

interface ICandles {
  [symbol: string]: {
    bid: number;
    timestamp: number;
    volume: number;
  }[];
}

let candles: ICandles = {};
let prevMinute = 0;

const candleEpics: Epic<Actions, Actions | never, RootState, Dependencies> = (action$, state$, { connection }) =>
  action$.pipe(
    ofType(WS_ACTION_TYPES.WS_MESSAGE),
    switchMap(action => {
      const symbol = getCurrentCurrency(state$.value);
      const data = createCandles(action as WsMessage, symbol as string);

      return from([
        CandleActions.subscribeToSymbol({
          data,
          symbol,
          timeframe: '5m',
        }),
      ]);
    })
  );

export default combineEpics(candleEpics);

/**
 *
 * @param action
 * @returns
 */
function createCandles(action: WsMessage, symbol: string) {
  const [currency, timestamp, bid, , , , , volume] = action.payload;

  if (isHeaderRow(action.payload)) {
    return [];
  }

  const date = new Date(timestamp);
  const currentMinute = date.getMinutes();

  if (currency === symbol) {
    if (prevMinute + 1 === currentMinute) {
      prevMinute = currentMinute;

      const firstElement = candles[currency][0];
      const lastElement = candles[currency].slice(candles[currency].length - 1);
      const close = lastElement[0].bid;
      const openValues = candles[currency]?.map(element => element.bid);
      const high = Math.max(...openValues);
      const low = Math.min(...openValues);
      const open = firstElement.bid;
      const timestamp = lastElement[0].timestamp;
      const volume = candles[currency]?.reduce((prev, curr) => {
        return prev + curr.volume;
      }, 0);
      
      // return a 1m candle
      return {
        timestamp,
        open,
        close,
        high,
        low,
        volume,
      };
    } else {
      prevMinute = currentMinute;

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
}
