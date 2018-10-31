import * as React from 'react'
import * as dayjs from 'dayjs'

export interface InterfaceDateCellProps {
  date: Date,
  onSelectDate: (date: Date) => any
}

export class DateCell extends React.Component<InterfaceDateCellProps> {
  constructor(props: InterfaceDateCellProps) {
    super(props)
    this.onSelectDate = this.onSelectDate.bind(this)
  }

  public onSelectDate() {
    this.props.onSelectDate(this.props.date)
  }

  public isMonthVisible(date: Date) {
    return date.getDate() === 1
  }

  public render() {
    const { date } = this.props
    return <div className='date-cell' onClick={this.onSelectDate}>
      <div className='date-cell__content'>
        { this.isMonthVisible(date) ? dayjs(date).format('DD MMM') : date.getDate() }
      </div>
    </div>
  }
}