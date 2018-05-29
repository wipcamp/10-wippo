import React from 'react'
import Modal from '../issue/Modal'
import DatePicker from 'react-datepicker'
import styled from 'styled-components'
import getCookie from '../util/cookie'
import moment from 'moment'
import axios from '../util/axios'

const ButtonContainer = styled.div`
  padding:8px;
  padding-top:50px;  
  margin: auto;
  width: 50%;
`

/*
Event
  eventId: e.id,
  eventName: e.event,
  description: e.description,
  location: e.location,
  start: moment(e.start_on),
  end: moment(e.finish_on),
  createBy: e.created_id
*/

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userToken: '',
      isOpen: this.props.isOpen,
      toggle: props.toggle,
      eventId: props.event.eventId,
      eventName: props.event.eventName,
      description: props.event.description,
      location: props.event.location,
      start: moment(props.event.startOn),
      end: moment(props.event.finishOn),
      createBy: props.event.createBy,
      roleId: props.event.role_team_id,
      createAt: props.event.create_at,
      updateAt: props.event.update_at,
      type: props.event.type,
      user: ''
    }
    this.handleFinish = this.handleFinish.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount () {
    this.setState({user: window.localStorage.getItem('user')})
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      eventId: nextProps.eventId,
      eventName: nextProps.eventName,
      description: nextProps.description,
      location: nextProps.location,
      start: moment(nextProps.startOn),
      end: moment(nextProps.finishOn),
      createBy: nextProps.createBy,
      roleId: nextProps.role_team_id,
      createAt: nextProps.create_at,
      updateAt: nextProps.update_at,
      type: nextProps.event.type
    })
  }

  handleStart (date) {
    this.setState({start: moment(date)})
  }

  handleFinish (date) {
    this.setState({end: moment(date)})
  }

  async handleSave (e) {
    e.preventDefault()
    let {token} = await getCookie({req: false})
    let event = await {
      eventId: this.state.eventId,
      event: this.state.eventName,
      description: this.state.description,
      location: this.state.location,
      start_on: await moment(this.state.startOn).format('YYYY-MM-DD HH:mm:ss'),
      finish_on: await moment(this.state.finishOn).format('YYYY-MM-DD HH:mm:ss'),
      created_id: this.state.createBy,
      role_team_id: this.state.roleId
    }
    let header = await {
      Authorization: `Bearer ${token}`
    }
    if (this.state.eventId === 0) {
      await axios.post(`/timetables/${this.state.eventId}`, event, header)
    } else {
      await axios.put(`/timetables/${this.state.eventId}`, event, header)
    }
  }

  async handleDelete (e) {
    await e.preventDefault()
    console.log('delete', e)
    let {token} = await getCookie({req: false})
    let header = await {
      Authorization: `Bearer ${token}`
    }
    await axios.delete(`/timetables/${this.state.eventId}`, header)
  }

  handleChange (e) {
    switch (e.target.id) {
      case 'eventName' :
        this.setState({eventName: e.target.value})
        break
      case 'description' :
        this.setState({description: e.target.value})
        break
      case 'location' :
        this.setState({location: e.target.value})
        break
      case 'start' :
        this.setState({start: e.target.value})
        break
      case 'end' :
        this.setState({end: e.target.value})
        break
    }
  }

  render () {
    return (
      <Modal show={this.props.isOpen} title={`${this.state.type} Event`} toggle={this.state.toggle} >
        <div className='container' >
          <form>
            <div className='row'>
              <div className='col-6'>
                Name
                <input type={'text'} className={'form-control'} id={'eventName'} value={this.state.eventName} onChange={this.handleChange} />
              </div>
              <div className='col-6'>
              description
                <input type={'textarea'} className={'form-control'} id={'description'} value={this.state.description} onChange={this.handleChange} />
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
              location
                <input type={'text'} className={'form-control'} id={'location'} value={this.state.location} onChange={this.handleChange} />
              </div>
              <div className='col-6'>
                createBy
                <input type={'text'} className={'form-control'} readOnly value={this.state.createBy} />
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
              StartOn
                <DatePicker
                  className={'form-control'}
                  selected={this.state.start}
                  onChange={this.handleStart}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  dateFormat='LLL'
                  timeCaption='time'
                />
              </div>
              <div className='col-6'>
              FinishOn
                <DatePicker
                  className={'form-control'}
                  selected={this.state.end}
                  onChange={this.handleFinish}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  dateFormat='LLL'
                  timeCaption='time'
                />
              </div>
            </div>
            <div className='row'>
              <ButtonContainer style={{textAlign: 'center'}}>
                <button className='btn btn-success' onClick={this.handleSave}>save</button>
              </ButtonContainer>
              <ButtonContainer style={{textAlign: 'center'}} >
                <button className='btn btn-danger' onClick={this.handleDelete} disabled={this.state.type === 'create'}>delete</button>
              </ButtonContainer>
            </div>
          </form>
        </div>
      </Modal>
    )
    // return (<div>Hi{console.log(this.state)}</div>)
  }
}
