import { connectRouter, routerMiddleware } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory'
import { applyMiddleware, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import {rootEpic, rootReducer} from './reducers'
export const history = createHistory()

export default () => {
  const epicMiddleware = createEpicMiddleware()
  const initialState = {}
  const enhancers: any = []
  const middleware = [
    epicMiddleware,
    routerMiddleware(history)
  ]

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  )

  const store: any = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composedEnhancers
  )

  epicMiddleware.run(rootEpic)

  return store
}