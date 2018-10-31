import * as React from 'react'
import { Calendar } from '../components/Calendar';

export class CalendarEvents extends React.Component {
  public render() {
    return <div>
      <Calendar initialDate={new Date()}/>
    </div>
  }
}