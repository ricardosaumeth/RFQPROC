import { Actions } from 'modules/root';
import { RefDataAction } from './../reference-data/actions';
import { RootState } from './../root';
import { Dependencies } from './../redux/store';
import { Epic, ofType, combineEpics } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { APP_ACTION_TYPES } from './actions';
import { from } from 'rxjs';
import { BookActions } from 'modules/book/actions';

const bootstrap: Epic<Actions, Actions, RootState, Dependencies> = (action$, state$, { connection }) =>
  action$.pipe(
    ofType(APP_ACTION_TYPES.BOOTSTRAP_APP),
    switchMap(() => {
      console.log('Boostrap App');
      return from([RefDataAction.refDataLoad(), BookActions.bookLoadData()]);
    })
  );

export default combineEpics(bootstrap);
