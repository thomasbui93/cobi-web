import * as React from 'react'

export interface InterfacePaginationProps {
  current: number,
  last: number,
  setPagination: (current: number) => void
}

export interface InterfacePaginationState {
  paginationRange: number[]
}

export class Pagination extends React.Component<InterfacePaginationProps, InterfacePaginationState> {
  public paginationSize: number = 2;
  public state: InterfacePaginationState = {
    paginationRange: this.getPaginationRange()
  }

  constructor(props: InterfacePaginationProps) {
    super(props)
    this.updatePrev = this.updatePrev.bind(this)
    this.updateNext = this.updateNext.bind(this)
  }

  public componentDidUpdate(prevProps: InterfacePaginationProps) {
    if (this.props.current !== prevProps.current || this.props.last !== prevProps.last) {
      this.setState({
        paginationRange: this.getPaginationRange()
      })
    }
  }

  public getSmallestPagination(): number {
    return this.props.current - this.paginationSize > 0 ?
      this.props.current - this.paginationSize : 1
  }

  public getLargestPaginagtion(): number {
    return (this.props.current + this.paginationSize) < this.props.last ?
      (this.props.current + this.paginationSize) : this.props.last
  }

  public getRange(smallest: number, largest: number): number[] {
    const range: number[] = []
    for (let i = smallest; i <= largest; i++) {
      range.push(i)
    }
    return range
  }

  public getPaginationRange(): number[] {
    const smallest = this.getSmallestPagination()
    const largest = this.getLargestPaginagtion()
    return this.getRange(smallest, largest)
  }

  public getPaginationItem(page: number) {
    const isCurrent = page === this.props.current
    const className = isCurrent ? 'pagination-item is-active' : 'pagination-item'
    const clickAction = this.onClickFactory(this, page)
    return <div className={className} onClick={clickAction} key={page}>
      {page}
    </div>
  }

  public isEnableLeft(): boolean {
    return this.state.paginationRange[0] > 1;
  }

  public isEnableRight(): boolean {
    return this.state.paginationRange[this.state.paginationRange.length - 1] < this.props.last;
  }

  public updatePrev(): void {
    const paginationRange = this.state.paginationRange
    const largest = paginationRange[paginationRange.length-1] - this.paginationSize
    const smallest = paginationRange[0] - this.paginationSize
    const range = this.getRange(Math.max(smallest, 1), largest);
    this.setState({
      paginationRange: range
    })
  }

  public updateNext(): void {
    const paginationRange = this.state.paginationRange
    const largest = paginationRange[paginationRange.length-1] + this.paginationSize
    const smallest = paginationRange[0] + this.paginationSize
    const range = this.getRange(smallest, Math.min(largest, this.props.last));
    this.setState({
      paginationRange: range
    })
  }

  public onClickFactory(context: this, page: number) {
    return (event: any) => context.props.setPagination(page)
  }

  public render() {
    return (
      <div className='pagination'>
        {
          this.isEnableLeft() ? <div className='pagination-item' onClick={this.updatePrev}>
            <i className='material-icons'>
              chevron_left
            </i>
          </div> : ''
        }
        {this.state.paginationRange.map(this.getPaginationItem.bind(this))}
        {
          this.isEnableRight() ? <div className='pagination-item' onClick={this.updateNext}>
            <i className='material-icons'>
              chevron_right
            </i>
          </div> : ''
        }
      </div>
    )
  }
}
