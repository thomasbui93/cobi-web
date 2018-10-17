import * as React from 'react'
import { connect } from 'react-redux'
import { InterfaceFilterTextProps, FilterText } from '../components/filters/FilterText';
import { InterfaceFilterRadioProps, FilterRadio } from '../components/filters/FilterRadio';
import { Loader } from 'src/components/core/Loader/Loader';

export enum FILTER_TYPE {
  TEXT = 'TEXT',
  RADIO = 'RADIO'
}

export interface InterfaceFilterItem extends InterfaceFilterTextProps, InterfaceFilterRadioProps {
  type: FILTER_TYPE
}

export interface InterfaceFilteredListProps {
  filters: InterfaceFilterItem[],
  updateFilter: (name: string, value: string) => any,
  items: any[],
  isListLoading: boolean
}

export class FilteredList extends React.Component<InterfaceFilteredListProps>{
  public renderFilter({type, ...data}: InterfaceFilterItem) {
    switch (type) {
      case FILTER_TYPE.TEXT:
        return <FilterText {...data} />
      case FILTER_TYPE.RADIO:
        return <FilterRadio {...data} />
      default:
        return <FilterText {...data} />
    }
  }

  public render() {
    return (
      <div className='filtered-list'>
        <div className='filtered-list__panel'>
          { this.props.filters.map(this.renderFilter.bind(this)) }
        </div>
        <div className='filtered-list__list'>
          { this.props.isListLoading ? <Loader />: '...' }
        </div>
      </div>
    )
  }
}

export const mapStateToProps = () => {
  return {}
}

export const mapDispatchToProps = () => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(FilteredList)