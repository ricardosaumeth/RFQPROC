import { WsAction } from './actions';
import { AppActions } from 'modules/app/actions';
import { Dispatch, Middleware } from 'redux';
import { Connection } from './Connection';
import { fromStringToArray } from './utils';

const createWsMiddleware =
  ({ connection }: { connection: Connection }): Middleware =>
  store =>
  (next: Dispatch) =>
  (action: AppActions) => {
    connection.onReceive(data => {
      const parsedData = fromStringToArray(JSON.parse(data));
      let meta = undefined;
      next(WsAction.wsMessage(parsedData, meta));
    });
    return next(action);
  };

export default createWsMiddleware;
