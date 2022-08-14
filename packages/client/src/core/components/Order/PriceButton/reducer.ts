import { Direction } from 'modules/trades/types';
import { SEND_ORDER_ACTION_TYPES } from './action';
import { Actions } from 'modules/root';
import { Ticker } from 'modules/ticker/types/Ticker';

export interface OrderConfirmationState {
  currency?: Ticker;
  direction?: Direction;
  notionalValue?: { value: string };
}

const initialState: OrderConfirmationState = {};

export const sendOrderReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case SEND_ORDER_ACTION_TYPES.SEND_ORDER: {
      const { currency, direction, notionalValue } = action.payload;
      return {
        ...state,
        currency,
        direction,
        notionalValue,
      };
    }

    default:
      return state;
  }
};

export default sendOrderReducer;
