import { ConnectionStatus } from './../../core/transport/types/ConnectionStatus';
import { getCurrencies } from '../reference-data/selector';
import { Actions } from 'modules/root';
import { TickerAction } from './../ticker/actions';
import { RefDataAction, REF_DATA_ACTION_TYPES } from './../reference-data/actions';
import { RootState } from './../root';
import { Dependencies } from './../redux/store';
import { Epic, ofType, combineEpics } from 'redux-observable';
import { switchMap, take, mergeMap, filter } from 'rxjs/operators';
import { APP_ACTION_TYPES } from './actions';
import { merge, of, from } from 'rxjs';
import { WS_ACTION_TYPES, WsConnectionStatusChanged } from 'core/transport/actions';

const bootstrap: Epic<Actions, Actions, RootState, Dependencies> = (action$, state$, { connection }) =>
  action$.pipe(
    ofType(APP_ACTION_TYPES.BOOTSTRAP_APP),
    switchMap(() => {
      console.log('Boostrap App');
      connection.connect();

      return action$.pipe(
        ofType(WS_ACTION_TYPES.WS_CONNECTION_STATUS_CHANGED),
        filter(action => (action as WsConnectionStatusChanged).payload === ConnectionStatus.Connected),
        switchMap(() =>
          merge(
            of(RefDataAction.refDataLoad()),
            action$.pipe(
              ofType(REF_DATA_ACTION_TYPES.REF_DATA_LOAD_ACK),
              take(1),
              mergeMap(() => {
                const currencies = getCurrencies(state$.value);
                const tickerActions = currencies.map(currency =>
                  TickerAction.subscribeToSymbol({
                    symbol: currency,
                  })
                );
                return merge(from(tickerActions));
              })
            )
          )
        )
      );
    })
  );

export default combineEpics(bootstrap);
