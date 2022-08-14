import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import appEpics from 'modules/app/epics';
import refDataEpics from './reference-data/epics';

import { AppActions } from './app/actions';
import { RefDataActions } from './reference-data/actions';
import { WsActions } from './../core/transport/actions';
import { TickerActions } from './ticker/actions';

import { refDataReducer } from './reference-data/reducer';
import { tickerReducer } from './ticker/reducer';

export const rootEpic = combineEpics(appEpics, refDataEpics);

export const rootReducer = combineReducers({
  refData: refDataReducer,
  ticker: tickerReducer,
});

export type Actions = AppActions | RefDataActions | WsActions | TickerActions;

export type RootState = ReturnType<typeof rootReducer>;
