import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { InterfaceFilterTextProps, FilterText } from '../components/filters/FilterText';
import { FilterMultiSelect } from '../components/filters/FilterMultiSelect';
import { Loader } from '../../../components/core/Loader/Loader';
import { requestList } from '../actions/search';
import { InterfaceSearchState } from '../reducers/search';
import { SearchItem } from '../components/item/SearchItem';
import { InterfaceFilterMultiProps } from '../components/filters/InterfaceFilterMultiProps'
import { FilterToggle } from '../components/filters/FilterToggle';
import { requestFilters } from '../actions/filter'
import { InterfaceFilterState } from '../reducers/filter'
import { InterfaceStoreState } from 'src/InterfaceStoreState';
import { InputType } from 'zlib';
import { updateQuery } from 'src/common/utils/query';

export enum FILTER_TYPE {
  TEXT = 'text',
  MULTI = 'select',
  TOGGLE = 'toggle'
}

export interface InterfaceFilterItem extends InterfaceFilterTextProps, InterfaceFilterMultiProps {
  type: FILTER_TYPE
}

export interface InterfaceFilteredListProps extends InterfaceFilterState, InterfaceSearchState {
  applyFilter: (criteria: InputType[]) => any,
  initList: () => any,
  initFilter: () => any
}

export interface InterfaceFilterListState {
  appliedFilters: InputType[]
}

export class FilteredList extends React.Component<InterfaceFilteredListProps, InterfaceFilterListState>{
  public state: InterfaceFilterListState = {
    appliedFilters: []
  }

  constructor(props: InterfaceFilteredListProps) {
    super(props)
    this.applyFilter = this.applyFilter.bind(this)
  }

  public componentDidMount() {
    this.props.initList()
    this.props.initFilter()
  }
  
  public applyFilter(label: string, value: any) {
    const appliedFilters = this.state.appliedFilters
    if (appliedFilters[label] === value) {
      return;
    }
    if (typeof value === 'undefined') {
      delete appliedFilters[label]
    } else {
      appliedFilters[label] = value
      this.setState({
        appliedFilters
      })
    }
    history.pushState(appliedFilters, '', updateQuery(window.location.href, appliedFilters));
    this.props.applyFilter(appliedFilters)
  }

  public renderFilter({ type, ...data }: InterfaceFilterItem) {
    switch (type) {
      case FILTER_TYPE.TEXT:
        return <FilterText key={data.name} {...data} onChange={this.applyFilter}/>
      case FILTER_TYPE.MULTI:
        return <FilterMultiSelect key={data.name} {...data} onChange={this.applyFilter}/>
        case FILTER_TYPE.TOGGLE:
        return <FilterToggle key={data.name} {...data} onChange={this.applyFilter}/>
      default:
        return <FilterText key={data.name} {...data} onChange={this.applyFilter}/>
    }
  }

  public renderList() {
    return this.props.items.map(item => <SearchItem item={item} key={item.key}/>)
  }

  public render() {
    return (
      <div className='filtered-list'>
        <div className='filtered-list__panel'>
          { this.props.filterError ? 'Error while getting filter': ''}
          { this.props.isFilterLoading ? 'Fetching filters...' : ''}
          { this.props.filters.map(this.renderFilter.bind(this))}
        </div>
        <div className='filtered-list__list'>
          { this.props.error ? 'Error while loading the search result': ''}
          { this.props.isLoading ? <Loader /> : ''}
          { 
            this.props.items.map(item => <SearchItem  item={item} key={item.key}/>)
          }
        </div>
      </div>
    )
  }
}

export const mapStateToProps = ({ search, filter }: InterfaceStoreState ) => {
  return {
    items: search.items,
    isLoading: search.isLoading,
    error: search.error,
    filters: filter.filters,
    isFilterLoading: filter.isFilterLoading,
    filterError: filter.filterError
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    applyFilter(criteria: InputType[] ) {
      return dispatch(requestList(criteria))
    },
    initList() {
      return dispatch(requestList())
    },
    initFilter() {
      return dispatch(requestFilters())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilteredList)