import { Epic, combineEpics, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { Dependencies } from 'modules/redux/store';
import { Actions, RootState } from 'modules/root';
import { EXECUTION_ACTION_TYPES, SendExecutionActionPayload } from './actions';
import { Direction } from 'modules/trades/types';
import { SendOrderActions } from 'core/components/Order/PriceButton/action';

const URL = 'https://rfqwebapi.azurewebsites.net/RFQ';

export const sendExecution: Epic<Actions, Actions, RootState, Dependencies> = (action$, state$, { connection }) =>
  action$.pipe(
    ofType(EXECUTION_ACTION_TYPES.SEND_EXECUTION),
    switchMap(action => {
      return fromFetch(URL, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createBodyMsg(action.payload)),
      }).pipe(
        switchMap(result => {
          return result.json();
        }),
        map(() => {
          return SendOrderActions.sendOrder({
            currency: action.payload.currency,
            direction: action.payload.direction,
            notionalValue: action.payload.notionalValue,
          });
        }),
        catchError(err => {
          throw 'Error in source. Details: ' + err;
        })
      );
    })
  );

export default combineEpics(sendExecution);

function createBodyMsg(data: SendExecutionActionPayload) {
  const price = data.direction === Direction.Buy ? data.currency?.bid : data.currency?.ask;
  return {
    InstrumentName: data.currency.currency,
    clientId: 'morgan stanley',
    clientPrice: price,
    direction: data.direction,
    notionalAmount: data.notionalValue.value,
    clientTicketId: data.currency.id,
  };
}
