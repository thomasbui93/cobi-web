import * as React from 'react'
import { getMonthDates } from '../../../common/utils/calendar'
import { DateCell } from './DateCell'

export interface InterfaceCalendarProps {
  initialDate: Date,
}

export interface InterfaceCalendarState {
  currentDate: Date,
  hasError: boolean
}

export class Calendar extends React.PureComponent<InterfaceCalendarProps, InterfaceCalendarState>{
  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public state: InterfaceCalendarState = {
    currentDate: this.props.initialDate,
    hasError: false
  }

  public getCalendarInfo(date: Date) {
    return {
      month: date.getMonth(),
      year: date.getFullYear()
    }
  }

  public renderRow(week: Date[], index: number) {
    return <div className='calendar-row' key={index}>
      {
        week.map(date => <DateCell
        key={date.getTime()}
        date={date}
        onSelectDate={this.onSelectDate} />)
      }
    </div>
  }

  public onSelectDate(date: Date) {
    return true
  }

  public render() {
    if (this.state.hasError) {
      return <div className='calendar'>
        {this.state.hasError ? 'Error while displaying calendar' : ''}
      </div>;
    }
    const { month, year }: { month: number, year: number } = this.getCalendarInfo(this.state.currentDate)
    const monthDates = getMonthDates(month, year);
    return (
      <div className='calendar'>
        { monthDates.map(this.renderRow.bind(this)) }
      </div>
    )
  }
}