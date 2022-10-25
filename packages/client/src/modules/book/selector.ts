import { createSelector } from 'reselect';
import { memoize } from 'lodash';
import { RootState } from 'modules/root';
import { Ticker } from 'modules/ticker/types/Ticker'
import { tradesSelector } from 'modules/trades/selector';

const bookSelector = (state: RootState) => state.book;

export const getRawBook = createSelector(bookSelector, book => book);

export const getDepth = createSelector(tradesSelector, trades =>
  memoize((symbol: string) => {
    const trades_: Ticker[] = trades?.currency?.filter((order: Ticker) => order.currency === symbol);

    return {
      trades: trades_
    };
  })
)
