import React from 'react'
import Modal from '../issue/Modal'
import DatePicker from 'react-datepicker'
import styled from 'styled-components'
import moment from 'moment'
import axios from '.'

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
      isOpen: this.props.isOpen,
      toggle: props.toggle,
      eventId: props.event.eventId,
      eventName: props.event.eventName,
      description: props.event.description,
      location: props.event.location,
      start: moment(props.event.startOn),
      end: moment(props.event.finishOn),
      createBy: props.event.createBy
    }
    this.handelFinish = this.handelFinish.bind(this)
    this.handelStart = this.handelStart.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      eventName: nextProps.event.eventName,
      description: nextProps.event.description,
      location: nextProps.event.location,
      start: moment(nextProps.event.startOn),
      end: moment(nextProps.event.finishOn),
      createBy: nextProps.event.createBy
    })
  }

  handelStart (date) {
    this.setState({start: moment(date)})
  }

  handelFinish (date) {
    this.setState({end: moment(date)})
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
      <Modal show={this.props.isOpen} title={'Edit Event::'} toggle={this.state.toggle} >
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
                  selected={this.state.start}
                  onChange={this.handelStart}
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
                  selected={this.state.end}
                  onChange={this.handelFinish}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  dateFormat='LLL'
                  timeCaption='time'
                />
              </div>
            </div>
            <div className='row'>
              <ButtonContainer style={{textAlign: 'right'}}>
                <button className='btn btn-success'>save</button>
              </ButtonContainer>
            </div>
          </form>
        </div>
      </Modal>
    )
    // return (<div>Hi{console.log(this.state)}</div>)
  }
}
