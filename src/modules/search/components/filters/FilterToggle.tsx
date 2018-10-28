import { FilterMultiSelect } from './FilterMultiSelect'
import { InputValueType } from './InterfaceFilterState'

export class FilterToggle extends FilterMultiSelect {
  public onChange(value: InputValueType) {
    this.setState({
      currentValue: value === this.state.currentValue[0] ? [] : [value]
    })
    this.props.onChange(this.props.name, this.state.currentValue.join(','))
  }
}