import { REF_DATA_ACTION_TYPES } from './../../modules/reference-data/actions';
import { Actions, RootState } from 'modules/root';
import { Dependencies } from '../../modules/redux/store';
import { Epic, ofType, combineEpics } from 'redux-observable';
import { filter, switchMap } from 'rxjs/operators';
import { EMPTY, from } from 'rxjs';
import { WsConnectionStatusChanged, WS_ACTION_TYPES } from './actions';
import { ConnectionStatus } from './types/ConnectionStatus';

const bootstrap: Epic<Actions, never, RootState, Dependencies> = (action$, state$, { connection }) =>
  action$.pipe(
    ofType(REF_DATA_ACTION_TYPES.REF_DATA_LOAD_ACK),
    switchMap(() => {
      connection.connect();

      return action$.pipe(
        ofType(WS_ACTION_TYPES.WS_CONNECTION_STATUS_CHANGED),
        filter(action => (action as WsConnectionStatusChanged).payload === ConnectionStatus.Connected),
        switchMap(() => EMPTY)
      );
    })
  );

export default combineEpics(bootstrap);
