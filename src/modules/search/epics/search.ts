import { from, of} from 'rxjs'
import { ofType, ActionsObservable } from 'redux-observable'
import { switchMap, map, catchError } from 'rxjs/operators'
import { InterfaceAction } from 'src/common/type/InterfaceAction'
import { getRequestAction, getErrorAction} from 'src/common/utils/action'
import { searchActionType } from '../actions/type'
import { searchApi } from 'src/services/api/search'
import { doneRequesting } from '../actions/search'

export const searchEpic =  (action$: ActionsObservable<InterfaceAction>) =>  action$.pipe(
  ofType(getRequestAction(searchActionType.prefix)),
  switchMap(
    ({ payload }: InterfaceAction) => from(searchApi(payload.requestInfo))
    .pipe(
      map(doneRequesting),
      catchError(() => of({
        type: getErrorAction(searchActionType.prefix)
      }))
    )
  ),
);