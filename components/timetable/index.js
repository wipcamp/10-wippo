import React from 'react'
import BigCalendar from 'react-big-calendar'
import Modal from './Modal'
import moment from 'moment'
import {DateEvent, getRoleTeamStyle} from './view'
import axios from '../util/axios'
import getCookie from '../util/cookie'
import styled from 'styled-components'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      typeView: 'week',
      showDate: new Date(2018, 5, 2),
      eventList: [],
      isOpen: false,
      token: '',
      userId: '',
      event: {
        eventId: '',
        eventName: '',
        description: '',
        location: '',
        start: '',
        end: '',
        role_team_id: '',
        createBy: '',
        type: 'edit'
      }
    }
    this.toggle = this.toggle.bind(this)
    this.viewChangeHandeler = this.viewChangeHandeler.bind(this)
    this.dateChangeHadeler = this.dateChangeHadeler.bind(this)
    this.newEvent = this.newEvent.bind(this)
  }

  async componentWillMount () {
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))
  }

  async componentDidMount () {
    let {token} = await getCookie({req: false})
    let {data} = await axios.get('/timetables', {
      Authorization: `Bearer ${token}`
    })
    let getUser = JSON.parse(window.localStorage.getItem('user'))
    this.setState({eventList: this.castEventList(data), user: getUser.id})
    console.log('UserState', this.state.user)
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
        role_team_id: e.role_team_id,
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
    this.setState({typeView: e})
    // Callback fired when the view value changes.
  }

  dateChangeHadeler (e) {
    // Callback fired when the date value changes.
    this.setState({showDate: e})
  }

  newEvent () {
    let event = {
      eventId: 0,
      eventName: '',
      description: '',
      location: '',
      start: moment(),
      end: moment(),
      role_team_id: '',
      createBy: this.state.user,
      type: 'create'
    }
    this.toggle(event, null)
  }

  render () {
    const FloatingContainer = styled.div`
position:fixed;
width:50px;
height:50px;
bottom:40px;
right:40px;
background-color:#0C9;
color:#FFF;
border-radius:50px;
text-align:center;
box-shadow: 2px 2px 3px #999;
padding-top: 13px;
font-size:25px;
`
    return (
      <div>
        <FloatingContainer>
          <a onClick={this.newEvent} type={'create'}><i className='fa fa-plus my-float' /></a>
        </FloatingContainer>
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
          formats={{ eventTimeRangeFormat: () => null }}
          views={['month', 'day', 'week']}
          view={this.state.typeView}
          step={60}
          onView={this.viewChangeHandeler}
          onNavigate={this.dateChangeHadeler}
          onSelectEvent={this.toggle}
          date={this.state.showDate}
          eventPropGetter={getRoleTeamStyle}
        />
      </div>
    )
  }
}
