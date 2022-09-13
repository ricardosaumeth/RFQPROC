import { Direction } from 'modules/trades/types';
import { createAction, ActionUnion } from 'modules/redux/utils';
import { Ticker } from 'modules/ticker/types/Ticker';

export enum SEND_ORDER_ACTION_TYPES {
  SEND_ORDER = 'SEND_ORDER',
}

interface SendOrderActionPayload {
  currency: Ticker;
  direction: Direction;
  notionalValue: { value: string };
}

export const SendOrderActions = {
  sendOrder: createAction<SEND_ORDER_ACTION_TYPES.SEND_ORDER, SendOrderActionPayload>(
    SEND_ORDER_ACTION_TYPES.SEND_ORDER
  ),
};

export type SendOrderActions = ActionUnion<typeof SendOrderActions>;
export type SendOrder = ReturnType<typeof SendOrderActions.sendOrder>;
