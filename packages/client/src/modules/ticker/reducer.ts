import { Actions } from 'modules/root';
import { Ticker } from './types/Ticker';
import { isHeaderRow } from 'core/transport/utils';
import { WS_ACTION_TYPES } from './../../core/transport/actions';

export interface TickerState {
  [currency: string]: Ticker;
}

const initialState: TickerState = {};

export function tickerReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case WS_ACTION_TYPES.WS_MESSAGE: {
      if (isHeaderRow(action.payload)) {
        return state;
      }

      const [currency, timestamp, bid, ask, lastBid, lastAsk, id] = action.payload;
      return {
        ...state,
        [currency]: {
          currency,
          timestamp,
          bid,
          ask,
          lastBid,
          lastAsk,
          id,
        },
      };
    }

    default:
      return state;
  }
}

export default tickerReducer;
