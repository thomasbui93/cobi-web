import * as React from 'react'

export interface InterfaceButtonPropsStrict {
  className?: string,
  disable?: boolean,
  type?: 'button' | 'submit'
}

export interface InterfaceButtonProps extends InterfaceButtonPropsStrict {
  [key: string]: any
}

export class Button extends React.Component<InterfaceButtonProps> {
  public static defaultProps: InterfaceButtonProps = {
    className: 'btn--primary',
    disable: false,
    type: 'button'
  }

  public render() {
    return <button type={this.props.type}
      className={`btn ${this.props.className}`}
      disabled={this.props.disable}>
      {this.props.children}
      </button>
  }
} 