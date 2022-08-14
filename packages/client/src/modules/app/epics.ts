import { ConnectionStatus } from './../../core/transport/types/ConnectionStatus';
import { Actions } from 'modules/root';
import { RefDataAction, RefDataActions } from './../reference-data/actions';
import { RootState } from './../root';
import { Dependencies } from './../redux/store';
import { Epic, ofType, combineEpics } from 'redux-observable';
import { switchMap, filter } from 'rxjs/operators';
import { APP_ACTION_TYPES } from './actions';
import { from } from 'rxjs';
import { WS_ACTION_TYPES, WsConnectionStatusChanged } from 'core/transport/actions';

const bootstrap: Epic<Actions, RefDataActions, RootState, Dependencies> = (action$, state$, { connection }) =>
  action$.pipe(
    ofType(APP_ACTION_TYPES.BOOTSTRAP_APP),
    switchMap(() => {
      console.log('Boostrap App');
      connection.connect();

      return action$.pipe(
        ofType(WS_ACTION_TYPES.WS_CONNECTION_STATUS_CHANGED),
        filter(action => (action as WsConnectionStatusChanged).payload === ConnectionStatus.Connected),
        switchMap(() => from([RefDataAction.refDataLoad()]))
      );
    })
  );

export default combineEpics(bootstrap);
