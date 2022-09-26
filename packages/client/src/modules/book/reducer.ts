import { now } from 'lodash';
import { BookActions, BookDataLoadArc } from 'modules/book/actions';
import { BOOK_ACTION_TYPES } from './actions';
import { Order } from './types/order';

export interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

function snapshotReducer(state: OrderState, action: BookActions) {
  const { orders } = (action as BookDataLoadArc).payload;
  return orders.map(({ id, InstrumentName, clientId, clientPrice, clientTicketId, direction, notionalAmount }) => ({
    id,
    InstrumentName,
    clientId,
    clientPrice,
    clientTicketId,
    direction,
    notionalAmount,
    status: 'Done',
    tradeDate: new Date().toDateString()
  }));
}

export function bookReducer(state = initialState, action: BookActions) {
  switch (action.type) {
    case BOOK_ACTION_TYPES.BOOK_DATA_LOAD_ACK: {
      const ordersReducer = snapshotReducer(state, action);
      return {
        ...state,
        orders: ordersReducer,
      };
    }

    default:
      return state;
  }
}

export default bookReducer;
