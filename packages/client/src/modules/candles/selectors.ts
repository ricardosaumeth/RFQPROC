import { RootState } from './../root';
import { getTrades } from './../trades/selector';
import { createSelector } from 'reselect';
import { memoize } from 'lodash';
import { tradesSelector } from 'modules/trades/selector';

export const getCandles = createSelector(tradesSelector, candles =>
  memoize((symbol: string) => {
    const result = candles?.currency?.filter((x: any) => {
      return x.currency === symbol;
    });

    return {
      bids: result,
    };
  })
);
