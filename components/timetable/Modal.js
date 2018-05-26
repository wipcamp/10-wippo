import React from 'react'
import Modal from '../issue/Modal'
import DatePicker from 'react-datepicker'
import styled from 'styled-components'

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
      isOpen: props.isOpen,
      toggle: props.toggle,
      event: {
        eventName: props.event.eventName,
        description: props.event.description,
        location: props.event.location,
        startOn: props.event.startOn,
        finishOn: props.event.finishOn,
        createBy: props.event.createBy
      }
    }
    this.handelFinish = this.handelFinish.bind(this)
    this.handelStart = this.handelStart.bind(this)
  }

  handelStart (date) {
    this.setState({startOn: date})
  }

  handelFinish (date) {
    this.setState({finishOn: date})
  }

  render () {
    return (
      <Modal show={this.state.isOpen} title={'Edit Event::'} toggle={this.state.toggle} >
        <div className='container' >
          <form>
            <div className='row'>
              <div className='col-6'>
                Name
                <input type={'text'} className={'form-control'} value={this.state.event.eventName} />
              </div>
              <div className='col-6'>
              description
                <input type={'textarea'} className={'form-control'} value={this.state.event.description} />
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
              location
                <input type={'text'} className={'form-control'} value={this.state.event.location} />
              </div>
              <div className='col-6'>
                createBy
                <input type={'text'} className={'form-control'} value={this.state.event.startOn} />
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
              StartOn
                <DatePicker
                  selected={this.state.event.startOn}
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
                  selected={this.state.event.startOn}
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
  }
}
