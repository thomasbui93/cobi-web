import { FilterMultiSelect } from './FilterMultiSelect'
import { InputValueType } from './InterfaceFilterState'

export class FilterToggle extends FilterMultiSelect {
  public onChange(value: InputValueType) {
    this.setState({
      currentValue: [value]
    })
    this.props.onChange(this.props.name, value)
  }
}