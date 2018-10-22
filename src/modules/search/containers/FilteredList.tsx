import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { InterfaceFilterTextProps, FilterText } from '../components/filters/FilterText';
import { InterfaceFilterRadioProps, FilterRadio } from '../components/filters/FilterRadio';
import { Loader } from 'src/components/core/Loader/Loader';
import { requestList } from '../actions/search';
import { InterfaceSearchState } from '../reducers/search';
import { SearchItem } from '../components/item/SearchItem';

export enum FILTER_TYPE {
  TEXT = 'TEXT',
  RADIO = 'RADIO'
}

export interface InterfaceFilterItem extends InterfaceFilterTextProps, InterfaceFilterRadioProps {
  type: FILTER_TYPE
}

export interface InterfaceFilteredListCoreProps {
  filters: InterfaceFilterItem[],
}

export interface InterfaceFilteredListProps extends InterfaceFilteredListCoreProps, InterfaceSearchState {
  updateFilter: (name: string, value: string) => any,
  initList: () => any
}

export class FilteredList extends React.Component<InterfaceFilteredListProps>{
  public componentDidMount() {
    this.props.initList()
  }

  public renderFilter({ type, ...data }: InterfaceFilterItem) {
    switch (type) {
      case FILTER_TYPE.TEXT:
        return <FilterText {...data} />
      case FILTER_TYPE.RADIO:
        return <FilterRadio {...data} />
      default:
        return <FilterText {...data} />
    }
  }

  public renderList() {
    this.props.items.map(item => <SearchItem item={item} key={item.key}/>)
  }

  public render() {
    return (
      <div className='filtered-list'>
        <div className='filtered-list__panel'>
          {this.props.filters.map(this.renderFilter.bind(this))}
        </div>
        <div className='filtered-list__list'>
          {this.props.isLoading ? <Loader /> : '...'}
        </div>
      </div>
    )
  }
}

export const mapStateToProps = ({ search }: { search: InterfaceSearchState }) => {
  return {
    items: search.items,
    isLoading: search.isLoading,
    error: search.error
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateFilter(name: string, value: string) {
      return dispatch(requestList({
        name,
        value
      }))
    },
    initList() {
      return dispatch(requestList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilteredList)