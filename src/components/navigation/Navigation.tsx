import * as React from 'react'
import { Link } from 'react-router-dom'
import { InterfaceMenuItem, getMenuItems } from '../../services/menu'

export interface InterfaceNavigationProps {
  setNavigation: (isExpanded: boolean) => void,
  isExpanded: boolean
}

export class Navigation extends React.Component<InterfaceNavigationProps>{
  constructor(props: InterfaceNavigationProps) {
    super(props)
    this.toggleNavigation = this.toggleNavigation.bind(this)
  }

  public renderMenuItem(menuItem:any) {
    return <div className='menu-item' key={menuItem.key}>
      <div className='menu-item__link'>
        <Link to={menuItem.url}>{menuItem.title}</Link>
      </div>
      {
        menuItem.children && menuItem.children.length > 0 ?
        <div className='menu-item__list'>
          { menuItem.children.map(this.renderMenuItem.bind(this)) }
        </div> : ''
      }
    </div>
  }

  public renderMenu(menuItems:any) {
    return menuItems.map(this.renderMenuItem.bind(this))
  }

  public toggleNavigation() {
    this.props.setNavigation(!this.props.isExpanded)
  }

  public render() {
    const menuItems: InterfaceMenuItem[] = getMenuItems()
    return (
      <div className={`navigation ${this.props.isExpanded ? '' : 'is-collapsed'}`}>
        <div onClick={this.toggleNavigation}>Toggle</div>
        <div>
        { menuItems.length > 0 ? this.renderMenu(menuItems) : '' }
        </div>
      </div>
    )
  }
}