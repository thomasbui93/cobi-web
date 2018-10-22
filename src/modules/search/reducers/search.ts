import { InterfaceAction } from '../../../common/type/InterfaceAction'
import { composeErrorState, composeLoadingState } from 'src/common/utils/state';
import { getDoneAction, getErrorAction, getRequestAction } from 'src/common/utils/action';
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
        items: payload
      }
    case getErrorAction(searchActionType.prefix):
      return composeErrorState(state)
    case getRequestAction(searchActionType.prefix):
      return composeLoadingState(state)
    default:
      return state
  }
}