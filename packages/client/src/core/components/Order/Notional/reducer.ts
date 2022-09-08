import { NOTIONAL_VALUE_ACTION_TYPES } from './action';
import { Actions } from 'modules/root';

const initialState = {
  value: '1,000.000',
};

export const notionalValueReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case NOTIONAL_VALUE_ACTION_TYPES.NOTIONAL_VALUE: {
      const { value } = action.payload;
      return {
        ...state,
        value,
      };
    }

    default:
      return state;
  }
};

export default notionalValueReducer;
