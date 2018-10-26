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
import { InterfaceStoreState } from '../../../InterfaceStoreState';
import { InputValueType } from '../components/filters/InterfaceFilterState'
import { updateQuery, getArrayOfQuery } from '../../../common/utils/query';
import { push } from 'connected-react-router'
import { Pagination } from '../components/pagination/Pagination';

export enum FILTER_TYPE {
  TEXT = 'text',
  MULTI = 'select',
  TOGGLE = 'toggle'
}

export interface InterfaceFilterItem extends InterfaceFilterTextProps, InterfaceFilterMultiProps {
  type: FILTER_TYPE
}

export interface InterfaceFilteredListProps extends InterfaceFilterState, InterfaceSearchState {
  initialAppliedFilters: InputValueType[],
  applyFilter: (criteria: InputValueType[]) => any,
  initList: () => any,
  initFilter: () => any
}

export interface InterfaceFilterListState {
  appliedFilters: InputValueType[]
}

export class FilteredList extends React.Component<InterfaceFilteredListProps, InterfaceFilterListState>{
  public state: InterfaceFilterListState = {
    appliedFilters: []
  }

  constructor(props: InterfaceFilteredListProps) {
    super(props)
    this.applyFilter = this.applyFilter.bind(this)
    this.setPaginate = this.setPaginate.bind(this)
  }

  public componentDidMount() {
    const initialAppliedFilters = this.props.initialAppliedFilters;
    this.setState({
      appliedFilters: initialAppliedFilters
    })
    Object.keys(initialAppliedFilters).length > 0 ?
      this.props.applyFilter(initialAppliedFilters) : this.props.initList()
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
    this.props.applyFilter(appliedFilters)
  }

  public renderFilter({ type, ...data }: InterfaceFilterItem) {
    const initialValue = this.props.initialAppliedFilters[data.name]
    const props = {
      initialValue,
      onChange: this.applyFilter,
      key: data.name
    }
    switch (type) {
      case FILTER_TYPE.TEXT:
        return <FilterText {...data} {...props} />
      case FILTER_TYPE.MULTI:
        return <FilterMultiSelect {...data} {...props} />
      case FILTER_TYPE.TOGGLE:
        return <FilterToggle {...data} {...props} />
      default:
        return <FilterText {...data} {...props} />
    }
  }

  public renderList() {
    return this.props.items.map(item => <SearchItem item={item} key={item.key} />)
  }

  public setPaginate(page: number) {
    return this.applyFilter('page', page);
  }

  public render() {
    return (
      <div className='filtered-list'>
        <div className='filtered-list__panel'>
          {this.props.filterError ? 'Error while getting filter' : ''}
          {this.props.isFilterLoading ? 'Fetching filters...' : ''}
          {this.props.filters.map(this.renderFilter.bind(this))}
        </div>
        <Pagination setPagination={this.setPaginate} current={this.props.page} last={this.props.total} />
        <div className='filtered-list__list'>
          {this.props.error ? 'Error while loading the search result' : ''}
          {this.props.isLoading ? <Loader /> : ''}
          {
            this.props.items.map(item => <SearchItem item={item} key={item.key} />)
          }
        </div>
      </div>
    )
  }
}

export const mapStateToProps = ({ search, filter, router }: InterfaceStoreState) => {
  return {
    items: search.items,
    isLoading: search.isLoading,
    error: search.error,
    filters: filter.filters,
    isFilterLoading: filter.isFilterLoading,
    filterError: filter.filterError,
    page: isNaN(Number(search.page)) ? 1 : Number(search.page),
    total: search.total,
    initialAppliedFilters: getArrayOfQuery(router.location.search)
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    applyFilter(criteria: InputValueType[]) {
      dispatch(push(updateQuery(criteria)))
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