import { Direction } from 'modules/trades/types';
import { Actions } from './../root';
import { Ticker } from './../ticker/types/Ticker';
import { SELECTION_CURRENCY_ACTION_TYPES } from './action';

export interface SelectionState {
  currency?: Ticker;
  isModalOpen?: boolean;
}

const initialState: SelectionState = {};

export const selectionReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case SELECTION_CURRENCY_ACTION_TYPES.SELECTION_CURRENCY: {
      const { currency, openModal: isModalOpen } = action.payload;

      return {
        ...state,
        currency,
        isModalOpen,
      };
    }

    default:
      return state;
  }
};

export default selectionReducer;
