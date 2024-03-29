import { RootState } from './../root';
import { createSelector } from 'reselect';
import { memoize } from 'lodash';

const candlesSelector = (state: RootState) => state.candles;

export const getCandles = createSelector(candlesSelector, candles => memoize((symbol: string) => candles[symbol]));
