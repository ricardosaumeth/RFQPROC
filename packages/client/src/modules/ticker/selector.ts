import { isEmpty } from 'lodash';
import { RootState } from 'modules/root';
import { createSelector } from 'reselect';
import { getCurrencies } from './../reference-data/selector';

const tickerSelector = (state: RootState) => {
  return state.ticker;
};

export const getTickers = createSelector(getCurrencies, tickerSelector, (currencies, ticker) => {
  if (!isEmpty(ticker)) {
    let updatedTickers = [];
    updatedTickers = currencies.map(currency => ({
      ...ticker[currency],
    }));
    return updatedTickers?.filter(ticker => !isEmpty(ticker));
  } else {
    return [];
  }
});
