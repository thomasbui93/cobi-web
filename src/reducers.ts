import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

export const rootEpic = combineEpics()

export const rootReducer = combineReducers({})