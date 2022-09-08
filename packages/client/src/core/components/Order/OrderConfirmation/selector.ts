import { RootState } from 'modules/root';
import { createSelector } from 'reselect';

const orderSelector = (state: RootState) => {
  return state?.sendOrder;
};

export const getOrder = createSelector(orderSelector, order => order);
