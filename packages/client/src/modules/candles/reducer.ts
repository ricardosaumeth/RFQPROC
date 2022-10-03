import { CANDLE_ACTION_TYPES } from './actions';
import { Actions } from 'modules/root';
import { isHeaderRow } from 'core/transport/utils';
import { WsMessage } from './../../core/transport/actions';
import { isEmpty } from 'lodash';

const MAX_TRADES = 300;

export interface CandlesState {
  [currency: string]: any;
}

const initialState: CandlesState = {};

/**
 * create a candle for the first time
 * @param state
 * @param action
 * @returns
 */
function createFirstEntryReducer(state: CandlesState, action: any) {
  const { close, open, high, low, volume, timestamp } = action;
  return [
    {
      close,
      open,
      high,
      low,
      volume,
      timestamp,
    },
  ];
}

function oneMinueCandleReducer(state: CandlesState, action: any) {
  const { close, open, high, low, volume, timestamp } = action;

  const updatedState = state?.slice();
  if (updatedState.length >= MAX_TRADES) {
    updatedState.shift();
  }

  updatedState.push({ close, open, high, low, volume, timestamp });
  return updatedState;
}

export function candlesReducer(state = initialState, action: any) {
  switch (action.type) {
    case CANDLE_ACTION_TYPES.CANDLE_SUBSCRIBE_TO_SYMBOL: {
      if (isHeaderRow(action.payload?.symbol)) {
        return state;
      }

      const { data, symbol } = action.payload;
      if (!isEmpty(data)) {
        const symbolReducer = isEmpty(state) ? createFirstEntryReducer : oneMinueCandleReducer;
        const result = symbolReducer(state[symbol], data);
        console.log(state);
        return {
          ...state,
          [symbol]: result,
        };
      }
      return state;
    }

    default:
      return state;
  }
}

export default candlesReducer;
