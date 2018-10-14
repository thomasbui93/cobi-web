import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

export const rootEpic = combineEpics()

export const rootReducer = combineReducers({
  router: routerReducer
})