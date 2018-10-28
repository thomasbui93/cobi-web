import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { InterfaceFilterTextProps, FilterText } from '../components/filters/FilterText'
import { FilterMultiSelect } from '../components/filters/FilterMultiSelect'
import { Loader } from '../../../components/core/Loader/Loader'
import { requestList } from '../actions/search'
import { InterfaceSearchState } from '../reducers/search'
import { SearchItem } from '../components/item/SearchItem'
import { InterfaceFilterMultiProps } from '../components/filters/InterfaceFilterMultiProps'
import { FilterToggle } from '../components/filters/FilterToggle'
import { requestFilters } from '../actions/filter'
import { InterfaceFilterState } from '../reducers/filter'
import { InterfaceStoreState } from '../../../InterfaceStoreState'
import { InputValueType } from '../components/filters/InterfaceFilterState'
import { updateQuery, getArrayOfQuery } from '../../../common/utils/query'
import { push } from 'connected-react-router'
import { Pagination } from '../components/pagination/Pagination'
import { Button } from '../../../components/core/Button/Button'

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
  initList: () => void,
  initFilter: () => void
}

export interface InterfaceFilterListState {
  appliedFilters: InputValueType[],
  isOpen: boolean,
  isAllowedRequest: boolean
}

export class FilteredList extends React.Component<InterfaceFilteredListProps, InterfaceFilterListState>{
  public state: InterfaceFilterListState = {
    appliedFilters: [],
    isOpen: false,
    isAllowedRequest: false
  }

  constructor(props: InterfaceFilteredListProps) {
    super(props)
    this.applyFilter = this.applyFilter.bind(this)
    this.setPaginate = this.setPaginate.bind(this)
    this.toggleMobilePanel = this.toggleMobilePanel.bind(this)
    this.applyAllFilters = this.applyAllFilters.bind(this)
  }

  public componentDidUpdate(prevProps: InterfaceFilteredListProps, prevState: InterfaceFilterListState) {
    if (prevProps.isLoading !== this.props.isLoading) {
      this.setState({
        isAllowedRequest: false
      })
    }
  }

  public componentDidMount() {
    const initialAppliedFilters = this.props.initialAppliedFilters
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
      return
    }
    if (typeof value === 'undefined') {
      delete appliedFilters[label]
    } else {
      appliedFilters[label] = value
      this.setState({
        appliedFilters
      })
    }
    this.setState({
      isAllowedRequest: true
    })
  }

  public applyAllFilters() {
    this.props.applyFilter(this.state.appliedFilters)
    this.setState({
      isOpen: false
    })
  }

  public renderFilter({ type, ...data }: InterfaceFilterItem) {
    const initialValue = this.props.initialAppliedFilters[data.name]
    const props = {
      initialValue: initialValue ? initialValue : '',
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
    this.applyFilter('page', page)
    this.applyAllFilters()
  }

  public toggleMobilePanel() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  public render() {
    return (
      <div className='filtered-list__wrapper container'>
        <div className='filtered-list__header' onClick={this.toggleMobilePanel}>Filter Options</div>
        <div className={`filtered-list__panel ${this.state.isOpen ? 'is-open': ''}`}>
          <div className='filtered-list__mobile-head'>
            <div className='filtered-list__mobile-title'>Filters</div>
            <div className='filtered-list__mobile-close' onClick={this.toggleMobilePanel}>
              <i className='material-icons'>close</i>
            </div>
          </div>
          <div className='filtered-list__filters'>
            { this.props.filterError ? 'Error while getting filter' : ''}
            { this.props.isFilterLoading ? 'Fetching filters...' : ''}
            { this.props.filters.map(this.renderFilter.bind(this))}
          </div>
          <div className='filtered-list__bottom'>
            <Button disabled={!this.state.isAllowedRequest} onClick={this.applyAllFilters}>Apply filter</Button>
          </div>
        </div>
        <div className='filtered-list__content'>
          <div className='filtered-list'>
            {this.props.error ? 'Error while loading the search result' : ''}
            {this.props.isLoading ? <Loader /> : ''}
            {
              this.props.items.map(item => <SearchItem item={item} key={item.key} />)
            }
          </div>
          <Pagination setPagination={this.setPaginate} current={this.props.page} last={this.props.total} />
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
      dispatch(requestList(criteria))
    },
    initList() {
      dispatch(requestList())
    },
    initFilter() {
      dispatch(requestFilters())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilteredList)