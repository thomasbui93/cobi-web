import * as React from 'react'

export interface InterfaceFilterTextProps {
  title: string,
  initialValue: string,
  onChange: any
}

export class FilterText extends React.Component<InterfaceFilterTextProps> {
  public onChange(event: any) {
    this.props.onChange(this.props.title, event.target.value)
  }
  public render() {
    return (
      <div className='filter--text'>
        <input type='text' 
          defaultValue={this.props.initialValue}
          onChange={this.onChange}
          />
      </div>
    )
  }
}