import { FilterMultiSelect } from './FilterMultiSelect'
import { InputValueType } from './InterfaceFilterState'

export class FilterToggle extends FilterMultiSelect {
  public onChange(value: InputValueType) {
    const currentValue = value === this.state.currentValue[0] ? [] : [value];
    this.setState({
      currentValue
    })
    this.props.onChange(this.props.name, currentValue.join(','))
  }
}