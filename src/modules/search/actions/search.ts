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
  ({ items, meta }: { items: any[], meta: any }) => ({
    items,
    meta
  })
)

export const failLoading = createAction(
  getErrorAction(searchActionType.prefix),
  (error: boolean) => error
)