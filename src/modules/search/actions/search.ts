import { createAction } from 'redux-actions'
import { getDoneAction, getErrorAction, getRequestAction } from '../../../common/utils/action'
import { searchActionType } from '../actions/type'

export const requestList = (requestInfo?: any) => {
  return {
    type: getRequestAction(searchActionType.prefix),
    payload: {
      requestInfo
    }
  }
}

export const doneRequesting = createAction(
  getDoneAction(searchActionType.prefix),
  ({ items }: {items: any[]}) => items
)

export const failLoading = createAction(
  getErrorAction(searchActionType.prefix),
  (error: boolean) => error
)