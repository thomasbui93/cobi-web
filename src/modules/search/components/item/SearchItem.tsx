import * as React from 'react'
import { Link } from 'react-router-dom'

export class SearchItem extends React.Component<any> {
  public render() {
    return (
      <div className='search-item' >
        {
          this.props.item.image ?
            <div className="search-item__thumbnail">
              <img src={this.props.item.image} alt={this.props.item.title} />
            </div> : ''
        }
        <div className='search-item__info'>
          <div className='search-item__title'>{this.props.item.title}</div>
          <div className='search-item__description'>{this.props.item.description}</div>
          <div className='search-item__action'>
            <Link to={`/content/${this.props.item.key}`}>Continue Reading</Link>
          </div>
        </div>
      </div>
    )
  }
}