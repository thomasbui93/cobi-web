import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import { searchEpic } from './modules/search/epics/search'
import { searchReducer } from './modules/search/reducers/search'

export const rootEpic = combineEpics(searchEpic)

export const rootReducer = combineReducers({
  search: searchReducer
})