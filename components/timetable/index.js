import React from 'react'
import BigCalendar from 'react-big-calendar'
import Modal from './Modal'
import moment from 'moment'
import {DateEvent} from './view'
import axios from '../util/axios'
import getCookie from '../util/cookie'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      typeView: 'week',
      showDate: new Date(2018, 5, 2),
      eventList: [],
      isOpen: false,
      token: '',
      event: {
        eventName: '',
        description: '',
        location: '',
        start: '',
        end: '',
        createBy: ''
      }
    }
    this.toggle = this.toggle.bind(this)
    this.viewChangeHandeler = this.viewChangeHandeler.bind(this)
    this.dateChangeHadeler = this.dateChangeHadeler.bind(this)
  }

  async componentWillMount () {
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))
  }

  async componentDidMount () {
    let {token} = await getCookie({req: false})
    let {data} = await axios.get('/timetables', {
      Authorization: `Bearer ${token}`
    })
    this.setState({eventList: this.castEventList(data)})
    console.log('eventList', this.state.eventList)
  }

  castEventList (nonEventList) {
    let eventList = []
    nonEventList.map((e) => {
      let event = {
        eventId: e.id,
        eventName: e.event,
        description: e.description,
        location: e.location,
        start: new Date(e.start_on),
        end: new Date(e.finish_on),
        createBy: e.created_id
      }
      eventList.push(event)
    })
    return eventList
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
    return (
      <div>
        {console.log('DateEvent', DateEvent)}
        {this.state.isOpen ? <Modal
          isOpen
          title={'test'}
          toggle={this.toggle}
          event={this.state.event}
        /> : null }
        <BigCalendar
          events={this.state.eventList}
          components={{
            event: DateEvent
          }}
          views={['month', 'day', 'week']}
          view={this.state.typeView}
          step={60}
          onView={this.viewChangeHandeler}
          onNavigate={this.dateChangeHadeler}
          onSelectEvent={this.toggle}
          date={this.state.showDate}
        />
      </div>
    )
  }
}
