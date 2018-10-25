import { InterfaceAction } from '../../../common/type/InterfaceAction'
import { composeErrorState, composeLoadingState } from '../../../common/utils/state';
import { getDoneAction, getErrorAction, getRequestAction } from '../../../common/utils/action';
import { filterActionType } from '../actions/type'

export interface InterfaceFilterState {
  filters: any[],
  isFilterLoading: boolean,
  filterError: boolean
}

const initialState: InterfaceFilterState = {
  isFilterLoading: false,
  filters: [],
  filterError: false
}

export const filterReducer = (state = initialState, { type, payload }: InterfaceAction): InterfaceFilterState => {
  switch (type) {
    case getDoneAction(filterActionType.prefix):
      return {
        ...state,
        filterError: false,
        isFilterLoading: false,
        filters: payload.filters
      }
    case getErrorAction(filterActionType.prefix):
      return composeErrorState(state)
    case getRequestAction(filterActionType.prefix):
      return composeLoadingState(state)
    default:
      return state
  }
}