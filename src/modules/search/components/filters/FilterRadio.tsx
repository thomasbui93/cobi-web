import * as React from 'react'

export interface InterfaceFilterOption {
  value: string,
  label: string
}

export interface InterfaceFilterRadioProps {
  initialValue: string,
  title: string,
  options: InterfaceFilterOption[],
  onChange: any
}

export class FilterRadio extends React.Component<InterfaceFilterRadioProps> {
  public onChange(event: any) {
    this.props.onChange(this.props.title, event.target.value)
  }
  public renderOption({value, label}: InterfaceFilterOption) {
    return (<div className='filter-option__radio'>
      <input
        type='radio' 
        name={this.props.title}
        onChange={this.onChange}
        checked={this.props.initialValue === value}
        value={value}
        id={`${this.props.title}__${value}`}
        />
      <label htmlFor={`${this.props.title}__${value}`}>{label}</label>
    </div>)
  }
  public render() {
    if (this.props.options.length === 0) {
      return ''
    }
    return this.props.options.map(this.renderOption.bind(this))
  }
}

