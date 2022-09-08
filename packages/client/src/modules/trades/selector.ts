import { RootState } from './../root';
import { createSelector } from 'reselect';

const tradesSelector = (state: RootState) => state.trades;

export const getTrades = createSelector(tradesSelector, trade => {
  if (trade?.currency && Array.isArray(trade?.currency)) {
    return trade?.currency;
  } else {
    return [];
  }
});
