import { from, of} from 'rxjs'
import { ofType, ActionsObservable } from 'redux-observable'
import { switchMap, map, catchError } from 'rxjs/operators'
import { InterfaceAction } from '../../../common/type/InterfaceAction'
import { getRequestAction, getErrorAction} from '../../../common/utils/action'
import { filterActionType } from '../actions/type'
import { filterApi } from '../../../services/api/search'
import { doneLoadingFilters } from '../actions/filter'

export const filterEpic =  (action$: ActionsObservable<InterfaceAction>) =>  action$.pipe(
  ofType(getRequestAction(filterActionType.prefix)),
  switchMap(
    () => from(filterApi())
    .pipe(
      map(doneLoadingFilters),
      catchError(() => of({
        type: getErrorAction(filterActionType.prefix)
      }))
    )
  ),
);