import { Ticker } from './../ticker/types/Ticker';
import { createAction, ActionUnion } from 'modules/redux/utils';

export enum SELECTION_CURRENCY_ACTION_TYPES {
  SELECTION_CURRENCY = 'SELECTION/SELECT_CURRENCY',
}

export interface SelectionCurrencyActionPayload {
  currency?: Ticker;
  openModal: boolean;
}

export const SelectionActions = {
  selectCurrency: createAction<SELECTION_CURRENCY_ACTION_TYPES.SELECTION_CURRENCY, SelectionCurrencyActionPayload>(
    SELECTION_CURRENCY_ACTION_TYPES.SELECTION_CURRENCY
  ),
};

export type SelectionActions = ActionUnion<typeof SelectionActions>;
export type SelectCurrency = ReturnType<typeof SelectionActions.selectCurrency>;
