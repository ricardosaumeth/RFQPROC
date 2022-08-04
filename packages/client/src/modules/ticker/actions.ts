import { ActionUnion, createAction } from 'modules/redux/utils';

export enum TICKER_ACTION_TYPES {
  TICKER_SUBSCRIBE_TO_SYMBOL = 'TICKER_SUBSCRIBE_TO_SYMBOL',
}

export interface SubcribeToSymbolActionPayload {
  symbol: string;
}

export const TickerAction = {
  subscribeToSymbol: createAction<TICKER_ACTION_TYPES.TICKER_SUBSCRIBE_TO_SYMBOL, SubcribeToSymbolActionPayload>(
    TICKER_ACTION_TYPES.TICKER_SUBSCRIBE_TO_SYMBOL
  ),
};

export type TickerActions = ActionUnion<typeof TickerAction>;
export type SubscribeToTickerSymbolAction = ReturnType<typeof TickerAction.subscribeToSymbol>;
