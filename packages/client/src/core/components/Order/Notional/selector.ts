import { RootState } from 'modules/root';
import { createSelector } from 'reselect';

const notionalValueSelector = (state: RootState) => {
  return state?.notionalValue;
};

export const getNotionalValue = createSelector(notionalValueSelector, notionalValue => notionalValue);
