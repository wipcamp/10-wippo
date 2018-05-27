import React from 'react'
import Modal from '../issue/Modal'
import DatePicker from 'react-datepicker'
import styled from 'styled-components'
import moment from 'moment'

const ButtonContainer = styled.div`
  padding:8px;
  padding-top:50px;  
  margin: auto;
  width: 50%;
`

/*
Event
eventName:''
description: '',
location: '',
startOn: '',
finishOn: '',
createBy: '',
*/

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: this.props.isOpen,
      toggle: props.toggle,
      eventName: props.event.eventName,
      description: props.event.description,
      location: props.event.location,
      start: moment(props.event.startOn),
      end: moment(props.event.finishOn),
      createBy: props.event.createBy
    }
    this.handelFinish = this.handelFinish.bind(this)
    this.handelStart = this.handelStart.bind(this)
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
    console.log('Handel Start', date)
    this.setState({start: moment(date)})
  }

  handelFinish (date) {
    console.log('Handel Start', date)
    this.setState({end: moment(date)})
  }
  render () {
    return (
      <Modal show={this.props.isOpen} title={'Edit Event::'} toggle={this.state.toggle} >
        <div className='container' >
          {console.log(this.state)}
          <form>
            <div className='row'>
              <div className='col-6'>
                Name
                <input type={'text'} className={'form-control'} readOnly value={this.state.eventName} />
              </div>
              <div className='col-6'>
              description
                <input type={'textarea'} className={'form-control'} readOnly value={this.state.description} />
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
              location
                <input type={'text'} className={'form-control'} readOnly value={this.state.location} />
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
