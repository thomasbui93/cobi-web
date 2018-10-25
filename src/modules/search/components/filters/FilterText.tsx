import * as React from 'react'
import { Button } from '../../../../components/core/Button/Button';

export interface InterfaceFilterTextProps {
  label: string,
  name: string,
  initialValue: string,
  onChange: (label: string, changedValue: any) => any
}

export class FilterText extends React.Component<InterfaceFilterTextProps> {
  private inputValueRef : React.RefObject<HTMLInputElement>

  constructor(props: InterfaceFilterTextProps) {
    super(props)
    this.inputValueRef = React.createRef()
    this.onChange = this.onChange.bind(this)
  }
  public onChange() {
    if (this.inputValueRef.current && this.inputValueRef.current.value) {
      this.props.onChange(this.props.name, this.inputValueRef.current.value)
    }
  }
  public render() {
    return (
      <div className='filter--text'>
        <div>{this.props.label}</div>
        <input type='text'
          ref={this.inputValueRef}
          defaultValue={this.props.initialValue}
          />
        <Button onClick={this.onChange}>Apply</Button>
      </div>
    )
  }
}