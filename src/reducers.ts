import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import { searchEpic } from './modules/search/epics/search'
import { filterEpic } from './modules/search/epics/filter'
import { searchReducer } from './modules/search/reducers/search'
import { filterReducer } from './modules/search/reducers/filter'

export const rootEpic = combineEpics(
  searchEpic,
  filterEpic
)

export const rootReducer = combineReducers({
  search: searchReducer,
  filter: filterReducer
})