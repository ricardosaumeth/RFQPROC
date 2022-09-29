import { Epic, combineEpics, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { Dependencies } from 'modules/redux/store';
import { Actions, RootState } from 'modules/root';
import { EXECUTION_ACTION_TYPES, SendExecutionActionPayload } from './actions';
import { Direction } from 'modules/trades/types';
import { SendOrderActions, SEND_ORDER_ACTION_TYPES } from 'core/components/Order/OrderConfirmation/action';
import { from } from 'rxjs';
import { BookActions } from 'modules/book/actions';
import { ClientId } from 'settings/clientId';

const URL = 'https://rfqpoc.azurewebsites.net/RFQ';

export const sendExecution: Epic<Actions, Actions, RootState, Dependencies> = (action$, state$, { connection }) =>
  action$.pipe(
    ofType(EXECUTION_ACTION_TYPES.SEND_EXECUTION),
    switchMap(action => {
      return fromFetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createBodyMsg(action.payload)),
      }).pipe(
        switchMap(result => {
          return result.json();
        }),
        map(data => {
          if (action.payload.currency.id === data.clientTicketId) {
            return SendOrderActions.sendOrder({
              currency: action.payload.currency,
              direction: data.direction,
              notionalValue: action.payload.notionalValue,
            });
          }
          throw 'Trades are different!!!';
        }),
        catchError(err => {
          throw 'Error in source. Details: ' + err;
        })
      );
    })
  );

export const orderConfirmation: Epic<Actions, Actions, RootState, Dependencies> = action$ =>
  action$.pipe(
    ofType(SEND_ORDER_ACTION_TYPES.SEND_ORDER),
    switchMap(() => from([BookActions.bookLoadData()]))
  );

export default combineEpics(sendExecution, orderConfirmation);

function createBodyMsg(data: SendExecutionActionPayload) {
  const price = data.direction === Direction.Buy ? data.currency?.bid : data.currency?.ask;
  return {
    InstrumentName: data.currency.currency,
    clientId: ClientId.ubs,
    clientPrice: price,
    direction: data.direction,
    notionalAmount: data.notionalValue.value,
    clientTicketId: data.currency.id,
  };
}
