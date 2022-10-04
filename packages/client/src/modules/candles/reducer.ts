import { CANDLE_ACTION_TYPES, CandleActions } from './actions';
import { isEmpty } from 'lodash';
import { Candle } from './types/Candle';

const MAX_CANDLES = 100;

export interface CandlesState {
  [currency: string]: any;
}

const initialState: CandlesState = {};

function snapshotCandleReducer(state: CandlesState, action: Candle) {
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

function updateReducer(state: CandlesState, action: Candle) {
  const { close, open, high, low, volume, timestamp } = action;
  const updatedState = state?.slice();

  updatedState.push({ close, open, high, low, volume, timestamp });
  // restrict number of candles so we don't eventully fill up the memory;
  return updatedState.slice(0, MAX_CANDLES);
}

export function candlesReducer(state = initialState, action: CandleActions) {
  switch (action.type) {
    case CANDLE_ACTION_TYPES.CANDLE_SUBSCRIBE_TO_SYMBOL: {
      const { data } = action.payload;
      if (!isEmpty(data)) {
        const { symbol } = data;
        const symbolReducer = isEmpty(state[symbol]) ? snapshotCandleReducer : updateReducer;
        const result = symbolReducer(state[symbol], data);

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
