import * as React from 'react'

export interface InterfacePaginationProps {
  current: number,
  last: number,
  setPagination: (current: number) => void
}

export class Pagination extends React.Component<InterfacePaginationProps> {
  public paginationSize: number = 5;
  public getSmallestPagination(): number {
    return this.props.current - this.paginationSize > 0 ?
      this.props.current - this.paginationSize : this.props.current
  }

  public getLargestPaginagtion(): number {
    return (this.props.current + this.paginationSize) < this.props.last ?
    (this.props.current + this.paginationSize) : this.props.last
  }

  public getPaginationRange(): number[] {
    const smallest = this.getSmallestPagination()
    const largest = this.getLargestPaginagtion()
    const range: number[] = []
    for (let i = smallest; i <= largest; i++) {
      range.push(i);
    }
    return range
  }

  public getPaginationItem(page: number) {
    const isCurrent = page === this.props.current
    const className = isCurrent ? 'pagination-item is-active' : 'pagination-item'
    const clickAction = this.onClickFactory(this, page)
    return <div className={className} onClick={clickAction} key={page}>
      {page}
    </div>
  }

  public onClickFactory(context: this, page: number) {
    return (event: any) => context.props.setPagination(page)
  }

  public render() {
    return (
      <div className='pagination'>
        {this.getPaginationRange().map(this.getPaginationItem.bind(this))}
      </div>
    )
  }
}
