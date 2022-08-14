import { getCurrencies } from './../reference-data/selector';
import { isEmpty, memoize } from 'lodash';
import { RootState } from 'modules/root';
import { createSelector } from 'reselect';

const tickerSelector = (state: RootState) => {
  return state.ticker;
};

export const getTicker = createSelector(tickerSelector, ticker => memoize((symbol: string) => ticker[symbol]));

export const getTickers = createSelector(getCurrencies, tickerSelector, (currencies, ticker) => {
  if (!isEmpty(ticker)) {
    return currencies.map(currency => ({
      ...ticker[currency],
    }));
  }
});
