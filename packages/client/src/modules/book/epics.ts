import { Dependencies } from 'modules/redux/store';
import { Actions, RootState } from 'modules/root';
import { Epic, combineEpics, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { of } from 'rxjs';
import { BookActions, BOOK_ACTION_TYPES } from './actions';
import { Order } from './types/order';
import { ClientId } from 'settings/clientId';

const clientId = ClientId.ubs;
const URL = `https://rfqwebapi.azurewebsites.net/rfq/client?clientId=${clientId}`;

export const loadBookData: Epic<Actions, Actions, RootState, Dependencies> = (action$, state$, { connection }) =>
  action$.pipe(
    ofType(BOOK_ACTION_TYPES.BOOK_DATA_LOAD),
    switchMap(() => {
      return fromFetch(URL).pipe(
        switchMap(result => {
          return result.json();
        }),
        map(result =>
          BookActions.bookDataLoadAck({
            orders: result as Order[],
          })
        ),
        catchError(() => of(BookActions.bookDataLoadNack()))
      );
    })
  );

export default combineEpics(loadBookData);
