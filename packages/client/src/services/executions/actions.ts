import { ActionUnion, createAction } from 'modules/redux/utils';
import { Ticker } from 'modules/ticker/types/Ticker';
import { Direction } from 'modules/trades/types';

export enum EXECUTION_ACTION_TYPES {
  SEND_EXECUTION = 'SEND_EXECUTION',
}

export interface SendExecutionActionPayload {
  currency: Ticker;
  direction: Direction;
  notionalValue: { value: string };
}

export const ExecutionAction = {
  sendExecution: createAction<EXECUTION_ACTION_TYPES.SEND_EXECUTION, SendExecutionActionPayload>(
    EXECUTION_ACTION_TYPES.SEND_EXECUTION
  ),
};

export type ExecutionActions = ActionUnion<typeof ExecutionAction>;
export type SendExecutionAction = ReturnType<typeof ExecutionAction.sendExecution>;
