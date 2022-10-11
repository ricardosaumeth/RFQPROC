import { RootState } from 'modules/root';
import { getTradeSelected } from 'modules/selection/selector';
import { createSelector } from 'reselect';

const refDataState = (state: RootState) => state.refData;

export const getCurrencies = createSelector(refDataState, refData => refData.currencies);

export const getCurrentCurrency = (state: RootState) => {
  const currencies = getCurrencies(state);
  const tradeSelected = getTradeSelected(state);
  const currentCurrency = tradeSelected.currency?.currency ? (tradeSelected.currency?.currency as string) : currencies[0];
  return currentCurrency;
}
