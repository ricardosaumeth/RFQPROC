import { RootState } from 'modules/root';
import { createSelector } from 'reselect';

const refDataState = (state: RootState) => state.refData;

export const getCurrencies = createSelector(refDataState, refData => refData.currencies);
