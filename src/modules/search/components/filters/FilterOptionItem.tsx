import * as React from 'react'
import { InterfaceFilterOption } from './InterfaceFilterOption'
import { InputValueType } from './InterfaceFilterState'

export interface InterfaceFilterOptionProps {
  option: InterfaceFilterOption,
  updateValue: (value: InputValueType) => any,
  isActive: boolean
}

export class FilterOptionItem extends React.Component<InterfaceFilterOptionProps> {
  constructor(props: InterfaceFilterOptionProps) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  public onClick() {
    this.props.updateValue(this.props.option.value)
  }

  public render() {
    return <div
      onClick={this.onClick}
      className={`filter-item__option ${this.props.isActive ? 'is-active' : ''}`}>
      {this.props.option.label}
    </div>
  }
}