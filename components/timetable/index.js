import React from 'react'
import BigCalendar from 'react-big-calendar'
import Modal from './Modal'
import moment from 'moment'
import events from './events'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      typeView: 'week',
      showDate: new Date(2018, 5, 2),
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
    this.toggle = this.toggle.bind(this)
    this.viewChangeHandeler = this.viewChangeHandeler.bind(this)
    this.dateChangeHadeler = this.dateChangeHadeler.bind(this)
  }

  componentWillMount () {
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))
  }

  renderComponent () { // Test function can render Inside JSX
    return (
      <div>
        <h1>Rendered Component</h1>
      </div>
    )
  }

  toggle (e, sync) {
    this.setState({isOpen: !this.state.isOpen, event: e})
  }

  viewChangeHandeler (e) {
    console.log('E : ', e)
    this.setState({typeView: e})
    console.log('state :', this.state.typeView)
    // Callback fired when the view value changes.
  }

  dateChangeHadeler (e) {
    // Callback fired when the date value changes.
    console.log('dateChangeHadeler', e)
    this.setState({showDate: e})
  }

  render () {
    let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
    return (
      <div>
        {this.state.isOpen ? <Modal
          isOpen
          title={'test'}
          toggle={this.toggle}
          event={this.state.event}
        /> : null }
        <BigCalendar
          events={events}
          views={allViews}
          view={this.state.typeView}
          step={60}
          onView={this.viewChangeHandeler}
          onNavigate={this.dateChangeHadeler}
          showMultiDayTimes
          onSelectEvent={this.toggle}
          date={this.state.showDate}
        />
      </div>
    )
  }
}
