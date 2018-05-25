import React from 'react'
import BigCalendar from 'react-big-calendar'
import Modal from './Modal'
import moment from 'moment'
import events from './events'

export default class Timetable extends React.Component {
  constructor (...props) {
    super(props)
    this.state = {
      selectedEvent: {
        id: 0,
        desc: '',
        startDate: {},
        endDate: {},
        location: '',
        createBy: ''
      },
      isOpen: false,
      event: {
        eventName: '',
        description: '',
        location: '',
        startOn: '',
        finishOn: '',
        createBy: ''
      }
    }
  }
  componentWillMount () {
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))
  }

  toggle () {
    this.setState({isOpen: !this.state.isOpen})
  }

  hadelStart(date){
    this.setState({})
  }

  render () {
    const toggleFunction = () => {
      this.setState({isOpen: !this.state.isOpen})
    }
    let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
    return (
      <div>
        {/* Modal Props {isOpen, event, toggle, handelStart, handelFin} */}
        <Modal
          isOpen={this.state.isOpen}
          title={'test'}
          toggle={toggleFunction}
          event={this.state.event}
          handelStart={}
          handelFin
        />
        <BigCalendar
          events={events}
          views={allViews}
          view={'week'}
          step={60}
          showMultiDayTimes
          date={new Date(2018, 5, 3)}
        />
      </div>
    )
  }
}
