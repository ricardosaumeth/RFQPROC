import { createAction, ActionUnion } from '../redux/utils';
import { Order } from './types/order';

export enum BOOK_ACTION_TYPES {
  BOOK_DATA_LOAD = 'BOOK_DATA_LOAD',
  BOOK_DATA_LOAD_ACK = 'BOOK_DATA_LOAD_ACK',
  BOOk_DATA_LOAD_NACK = 'BOOK_DATA_LOAD_NACK',
}

interface BookDataLoadAckActionPayload {
  orders: Order[]
}

export const BookActions = {
  bookLoadData: createAction<BOOK_ACTION_TYPES.BOOK_DATA_LOAD>(BOOK_ACTION_TYPES.BOOK_DATA_LOAD),
  bookDataLoadAck: createAction<BOOK_ACTION_TYPES.BOOK_DATA_LOAD_ACK, BookDataLoadAckActionPayload>(
    BOOK_ACTION_TYPES.BOOK_DATA_LOAD_ACK
  ),
  bookDataLoadNack: createAction<BOOK_ACTION_TYPES.BOOk_DATA_LOAD_NACK>(BOOK_ACTION_TYPES.BOOk_DATA_LOAD_NACK),
};

export type BookActions = ActionUnion<typeof BookActions>;
export type BookLoadData = ReturnType<typeof BookActions.bookLoadData>;
export type BookDataLoadArc = ReturnType<typeof BookActions.bookDataLoadAck>;
export type BookDataLoadNack = ReturnType<typeof BookActions.bookDataLoadNack>;