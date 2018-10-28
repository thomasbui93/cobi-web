import { InterfaceAction } from '../../../common/type/InterfaceAction'
import { composeErrorState, composeLoadingState } from '../../../common/utils/state';
import { getDoneAction, getErrorAction, getRequestAction } from '../../../common/utils/action';
import { searchActionType } from '../actions/type';

export interface InterfaceSearchState {
  items: any[],
  isLoading: boolean,
  error: boolean,
  page: number,
  total: number
}

const initialState: InterfaceSearchState = {
  isLoading: false,
  items: [],
  error: false,
  page: 1,
  total: 0
}

export const searchReducer = (state = initialState, { type, payload }: InterfaceAction): InterfaceSearchState => {
  switch (type) {
    case getDoneAction(searchActionType.prefix):
      return {
        ...state,
        error: false,
        isLoading: false,
        items: payload.items,
        page: payload.meta.page,
        total: payload.meta.total
      }
    case getErrorAction(searchActionType.prefix):
      return composeErrorState(state)
    case getRequestAction(searchActionType.prefix):
      return composeLoadingState(state)
    default:
      return state
  }
}