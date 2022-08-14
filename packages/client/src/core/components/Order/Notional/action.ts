import { createAction, ActionUnion } from 'modules/redux/utils';

export enum NOTIONAL_VALUE_ACTION_TYPES {
  NOTIONAL_VALUE = 'NOTIONAL_VALUE',
}

interface NotionalValueActionPayload {
  value: string;
}

export const NotionalValueActions = {
  notionalValue: createAction<NOTIONAL_VALUE_ACTION_TYPES.NOTIONAL_VALUE, NotionalValueActionPayload>(
    NOTIONAL_VALUE_ACTION_TYPES.NOTIONAL_VALUE
  ),
};

export type NotionalValueActions = ActionUnion<typeof NotionalValueActions>;
export type NotionalValue = ReturnType<typeof NotionalValueActions.notionalValue>;
