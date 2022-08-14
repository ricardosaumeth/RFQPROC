import { createEpicMiddleware } from 'redux-observable';
import { compose, createStore, applyMiddleware } from 'redux';
import createWsMiddleware from 'core/transport/middleware';
import { WsConnectionProxy } from 'core/transport/WsConnectionProxy';
import { Connection } from 'core/transport/Connection';
import { WsAction } from 'core/transport/actions';
import { rootEpic, rootReducer, Actions, RootState } from 'modules/root';
import { ConnectionStatus } from 'core/transport/types/ConnectionStatus';

const connectionProxy = new WsConnectionProxy('ws://localhost:8000');

const connection = new Connection(connectionProxy);

const dependencies = {
  connection,
};

export type Dependencies = typeof dependencies;

const epicMiddleware = createEpicMiddleware<Actions, Actions, RootState, Dependencies>({ dependencies });

const wsMiddleware = createWsMiddleware({ connection });

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(wsMiddleware, epicMiddleware)));

  connection.onConenct(() => {
    store.dispatch(WsAction.wsConnectionStatusChanged(ConnectionStatus.Connected));
    console.log('Connected');
  });

  epicMiddleware.run(rootEpic);

  return store;
}
