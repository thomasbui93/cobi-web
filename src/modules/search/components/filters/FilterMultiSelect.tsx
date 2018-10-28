import * as React from 'react'
import { InterfaceFilterOption } from './InterfaceFilterOption'
import { InterfaceFilterMultiProps } from './InterfaceFilterMultiProps'
import { InterfaceFilterState, InputValueType } from './InterfaceFilterState'
import { FilterOptionItem } from './FilterOptionItem'

export class FilterMultiSelect extends React.Component<InterfaceFilterMultiProps, InterfaceFilterState> {
  public state:InterfaceFilterState = {
    currentValue: this.props.initialValue.split(','),
    isOpen: true
  }

  constructor(props: InterfaceFilterMultiProps) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.toggleContent = this.toggleContent.bind(this)
  }

  public onChange(value: InputValueType) {
    const currentValue = new Set(this.state.currentValue);
    currentValue.has(value) ? currentValue.delete(value): currentValue.add(value);
    this.setState({
      currentValue: Array.from(currentValue)
    })
    this.props.onChange(this.props.name, Array.from(currentValue).join(','))
  }
  public renderOption(option: InterfaceFilterOption) {
    return <FilterOptionItem 
      key={option.value}
      option={option}
      isActive={this.state.currentValue.indexOf(option.value) > -1}
      updateValue={this.onChange}/>
  }
  public toggleContent() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  public render() {
    if (this.props.options.length === 0) {
      return ''
    }
    return <div className={`filter filter--multi-select ${this.state.isOpen ? 'is-active': ''}`}>
      <div className='filter__title' onClick={this.toggleContent}>
        <div>{this.props.label}</div>
        <i className='material-icons'>
          keyboard_arrow_down
        </i>
      </div>
      <div className='filter__content'>
        { this.props.options.map(this.renderOption.bind(this)) }
      </div>
    </div>
  }
}

