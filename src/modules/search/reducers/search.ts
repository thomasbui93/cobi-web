import { InterfaceAction } from '../../../common/type/InterfaceAction'
import { composeErrorState, composeLoadingState } from '../../../common/utils/state';
import { getDoneAction, getErrorAction, getRequestAction } from '../../../common/utils/action';
import { searchActionType } from '../actions/type';

export interface InterfaceSearchState {
  items: any[],
  isLoading: boolean,
  error: boolean,
}

const initialState: InterfaceSearchState = {
  isLoading: false,
  items: [],
  error: false
}

export const searchReducer = (state = initialState, { type, payload }: InterfaceAction): InterfaceSearchState => {
  switch (type) {
    case getDoneAction(searchActionType.prefix):
      return {
        ...state,
        error: false,
        isLoading: false,
        items: payload.items
      }
    case getErrorAction(searchActionType.prefix):
      return composeErrorState(state)
    case getRequestAction(searchActionType.prefix):
      return composeLoadingState(state)
    default:
      return state
  }
}