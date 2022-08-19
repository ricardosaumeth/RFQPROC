import { RootState } from 'modules/root';
import { createSelector } from 'reselect';

const tradeSelector = (state: RootState) => {
  return state.tradeSelected;
};

export const getTradeSelected = createSelector(tradeSelector, trade => trade);
