import { ActionUnion, createAction } from 'modules/redux/utils';
import { ConnectionStatus } from './types/ConnectionStatus';

export enum WS_ACTION_TYPES {
  WS_SEND = 'WS_SEND',
  WS_MESSAGE = 'WS_MESSAGE',
  WS_CONNECTION_STATUS_CHANGED = 'WS_CONNECTION_STATUS_CHANGED',
  SUBSCRIBE_TO_CHANNEL_ACK = 'SUBSCRIBE_TO_CHANNEL_ACK',
  SUBSCRIBE_TO_CHANNEL_NACK = 'SUBSCRIBE_TO_CHANNEL_NACK',
}

export interface WsMessageActionMeta {
  channel: string;
  request?: any;
}

export interface SubscribeToChannelAckActionPayload {
  channel: string;
  channelId: number;
  request: any;
}

export interface SubscribeToChannelNackActionPayload {
  error: string;
}

export const WsAction = {
  wsSend: createAction<WS_ACTION_TYPES.WS_SEND, any>(WS_ACTION_TYPES.WS_SEND),
  wsMessage: createAction<WS_ACTION_TYPES.WS_MESSAGE, any, WsMessageActionMeta | undefined>(WS_ACTION_TYPES.WS_MESSAGE),
  wsConnectionStatusChanged: createAction<WS_ACTION_TYPES.WS_CONNECTION_STATUS_CHANGED, ConnectionStatus>(
    WS_ACTION_TYPES.WS_CONNECTION_STATUS_CHANGED
  ),
  subscribeToChannelAck: createAction<WS_ACTION_TYPES.SUBSCRIBE_TO_CHANNEL_ACK, SubscribeToChannelAckActionPayload>(
    WS_ACTION_TYPES.SUBSCRIBE_TO_CHANNEL_ACK
  ),
  subscribeToChannelNack: createAction<WS_ACTION_TYPES.SUBSCRIBE_TO_CHANNEL_NACK, SubscribeToChannelNackActionPayload>(
    WS_ACTION_TYPES.SUBSCRIBE_TO_CHANNEL_NACK
  ),
};

export type WsActions = ActionUnion<typeof WsAction>;
export type WsMessage = ReturnType<typeof WsAction.wsMessage>;
export type WsSend = ReturnType<typeof WsAction.wsSend>;
export type WsConnectionStatusChanged = ReturnType<typeof WsAction.wsConnectionStatusChanged>;
export type WsSubscribeToChannelAck = ReturnType<typeof WsAction.subscribeToChannelAck>;
export type WsSubscribeToChannelNack = ReturnType<typeof WsAction.subscribeToChannelNack>;
