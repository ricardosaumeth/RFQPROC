import { Dependencies } from 'modules/redux/store';
import { Actions, RootState } from 'modules/root';
import { RefDataAction } from 'modules/reference-data/actions';
import { REF_DATA_ACTION_TYPES, RefDataLoadAck, RefDataLoadNack } from './actions';
import { Epic, combineEpics, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { of } from 'rxjs';

export const loadRefData: Epic<Actions, RefDataLoadAck | RefDataLoadNack, RootState, Dependencies> = (
  action$,
  state$,
  { connection }
) =>
  action$.pipe(
    ofType(REF_DATA_ACTION_TYPES.REF_DATA_LOAD),
    switchMap(() => {
      return fromFetch('/data/currencies.json').pipe(
        switchMap(result => {
          return result.json();
        }),
        map(result =>
          RefDataAction.refDataLoadAck({
            currencies: result as string[],
          })
        ),
        catchError(() => of(RefDataAction.refDataLoadNack()))
      );
    })
  );

export default combineEpics(loadRefData);
