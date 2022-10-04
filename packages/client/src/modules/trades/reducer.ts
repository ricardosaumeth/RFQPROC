import { Actions } from 'modules/root';
import { Ticker } from '../ticker/types/Ticker';
import { isHeaderRow } from 'core/transport/utils';
import { WsMessage, WS_ACTION_TYPES } from '../../core/transport/actions';

export const MAX_TRADES = 6;

type TradeState = Ticker[];

export interface TradesState {
  [currencies: string]: TradeState;
}

const initialState: TradesState = {};

function updateState(state: any, action: WsMessage) {
  const [currency, timestamp, bid, ask, lastBid, lastAsk, id] = action.payload;

  const newOrUpdatedTrade = { currency, timestamp, bid, ask, lastBid, lastAsk, id };
  
  if (state?.currency && Array.isArray(state?.currency)) {
    const existingTradeIndex = state.currency.findIndex((t: Ticker) => t.id === id);
    if (existingTradeIndex >= 0) {
      return state.currency;
    } else {
      return [newOrUpdatedTrade, ...state.currency];
    }
  }

  return [newOrUpdatedTrade];
}

export function tradesReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case WS_ACTION_TYPES.WS_MESSAGE: {
      if (isHeaderRow(action.payload)) {
        return state;
      }

      const updatedState = updateState(state, action);
     
      return {
        ...state,
        currency: updatedState.splice(0, MAX_TRADES), // only keep the top x trades, so we don't eventually fill up the memory
      };
    }

    default:
      return state;
  }
}

export default tradesReducer;
