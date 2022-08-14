import { WS_ACTION_TYPES } from './../../core/transport/actions';
import { Actions } from 'modules/root';
import { Ticker } from './types/Ticker';

export interface TickerState {
  [currency: string]: Ticker;
}

const initialState: TickerState = {};

export function tickerReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case WS_ACTION_TYPES.WS_MESSAGE: {
      const [currency, timestamp, bid, ask] = action.payload;
      return {
        ...state,
        [currency]: {
          currency,
          timestamp,
          bid,
          ask,
        },
      };
    }

    default:
      return state;
  }
}

export default tickerReducer;
