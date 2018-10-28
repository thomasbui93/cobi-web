import * as React from 'react'

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
    if (this.inputValueRef.current && this.inputValueRef.current.value.length > 2) {
      this.props.onChange(this.props.name, this.inputValueRef.current.value)
    }
  }

  public render() {
    return (
      <div className='filter filter--text'>
        <div className='filter__title'>{this.props.label}</div>
        <div className='filter__block'>
          <input type='text'
            className='input--text'
            ref={this.inputValueRef}
            onChange={this.onChange}
            defaultValue={this.props.initialValue}
            />
        </div>
      </div>
    )
  }
}