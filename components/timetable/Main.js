import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import events from './events'

export default class Timetable extends React.Component {
  componentWillMount () {
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))
  }

  render () {
    let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
    return (
      <div>
        <BigCalendar
          events={events}
          views={allViews}
          step={60}
          showMultiDayTimes
          defaultDate={new Date(2015, 3, 1)}
        />
      </div>
    )
  }
}
