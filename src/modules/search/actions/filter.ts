import { createAction } from 'redux-actions'
import { getDoneAction, getErrorAction, getRequestAction } from '../../../common/utils/action'
import { filterActionType } from '../actions/type'

export const requestFilters = createAction(
  getRequestAction(filterActionType.prefix)
)

export const doneLoadingFilters = createAction(
  getDoneAction(filterActionType.prefix),
  (filterItems: any[]) => ({ filters: filterItems })
)

export const failLoadingFilters = createAction(
  getErrorAction(filterActionType.prefix),
  () => ({ filterError: true })
)