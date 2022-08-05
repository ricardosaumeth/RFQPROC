import { REF_DATA_ACTION_TYPES } from './actions';
import { Actions } from 'modules/root';

interface RefDataState {
  currencies: string[];
}

const initialState: RefDataState = {
  currencies: [],
};

export const refDataReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case REF_DATA_ACTION_TYPES.REF_DATA_LOAD_ACK: {
      const { currencies } = action.payload;
      return {
        ...state,
        currencies,
      };
    }

    default:
      return state;
  }
};

export default refDataReducer;
