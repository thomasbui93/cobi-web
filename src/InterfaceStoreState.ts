import { RouterState } from 'connected-react-router'
import { InterfaceSearchState } from './modules/search/reducers/search';
import { InterfaceFilterState } from './modules/search/reducers/filter';

export interface InterfaceStoreState {
  search: InterfaceSearchState,
  filter: InterfaceFilterState,
  router: RouterState
}