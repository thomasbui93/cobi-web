import * as React from 'react'
import { Link } from 'react-router-dom'

export class SearchItem extends React.Component<any> {
  public render() {
    return (
      <div className='search__item' >
        {
          this.props.item.thumbnail ?
            <div className="search__thumbnail">
              <img src={this.props.item.thumbnail} alt={this.props.item.title} />
            </div> : ''
        }
        <div className='search__info'>
          <div className='search__title'>{this.props.item.title}</div>
          <div className='search__description'>{this.props.item.description}</div>
        </div>
        <div className='search__action'>
          <Link to={`/content/${this.props.item.key}`}>Continue Reading</Link>
        </div>
      </div>
    )
  }
}