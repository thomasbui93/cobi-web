import * as React from 'react'
import { InterfaceMenuItem, getMenuItems } from '../../services/menu'
import { Menu } from './Menu';

export interface InterfaceNavigationProps {
  setNavigation: (isExpanded: boolean) => void,
  isExpanded: boolean
}

export class Navigation extends React.Component<InterfaceNavigationProps>{
  constructor(props: InterfaceNavigationProps) {
    super(props)
    this.toggleNavigation = this.toggleNavigation.bind(this)
  }
  public toggleNavigation() {
    this.props.setNavigation(!this.props.isExpanded)
  }
  public render() {
    const menuItems: InterfaceMenuItem[] = getMenuItems()
    return (
      <div className={`navigation ${this.props.isExpanded ? '' : 'is-collapsed'}`}>
        <div className='navigation__header'>
          <div className={`toggle hamburger hamburger--squeeze ${this.props.isExpanded ? 'is-active': ''}`}
            onClick={this.toggleNavigation}>
            <div className='hamburger-box'>
              <div className='hamburger-inner'/>
            </div>
          </div>
        </div>
        <div className='navigation__content'>
        { menuItems.length > 0 ? <Menu menuItems={menuItems}/> : '' }
        </div>
      </div>
    )
  }
}