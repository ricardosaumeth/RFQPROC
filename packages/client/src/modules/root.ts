import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import appEpics from 'modules/app/epics';
import refDataEpics from './reference-data/epics';
import transportEpics from '../core/transport/epics';
import sendExecutionEpics from '../services/executions/epics';
import bookEpics from 'modules/book/epics';

import { AppActions } from './app/actions';
import { RefDataActions } from './reference-data/actions';
import { WsActions } from './../core/transport/actions';
import { TickerActions } from './ticker/actions';
import { SelectionActions } from './selection/action';
import { NotionalValueActions } from 'core/components/Order/Notional/action';
import { SendOrderActions } from 'core/components/Order/OrderConfirmation/action';
import { ExecutionActions } from '../services/executions/actions';
import { BookActions } from './book/actions';

import { refDataReducer } from './reference-data/reducer';
import { tickerReducer } from './ticker/reducer';
import { tradesReducer } from './trades/reducer';
import { selectionReducer } from './selection/reducer';
import { notionalValueReducer } from '../core/components/Order/Notional/reducer';
import { sendOrderReducer } from '../core/components/Order/OrderConfirmation/reducer';
import { bookReducer } from './book/reducer';

export const rootEpic = combineEpics(
  appEpics,
  refDataEpics,
  transportEpics,
  sendExecutionEpics,
  bookEpics
);

export const rootReducer = combineReducers({
  trades: tradesReducer,
  refData: refDataReducer,
  ticker: tickerReducer,
  tradeSelected: selectionReducer,
  notionalValue: notionalValueReducer,
  sendOrder: sendOrderReducer,
  book: bookReducer,
});

export type Actions =
  | AppActions
  | RefDataActions
  | WsActions
  | TickerActions
  | SelectionActions
  | NotionalValueActions
  | SendOrderActions
  | ExecutionActions
  | BookActions;

export type RootState = ReturnType<typeof rootReducer>;
