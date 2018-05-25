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
export default class Modal extends React.component {
  constructor (props) {
    // {isOpen, event, toggle}
    state = {
      isOpen: props.isOpen,
      toggle: null,
      event: {
        eventName: props.event.eventName,
        description: props.event.description,
        location: props.location,
        startOn: props.startOn,
        finishOn: props.finishOn,
        createBy: props.createBy
      }
    }
  }

  render () {
    return (
      <Modal show={isOpen} title={'Edit Event::'} toggle={toggle} >
        <div className='container' >
          <form>
            <div className='row'>
              <div className='col-6'>
                Name
                <input type={'text'} className={'form-control'} value={state.event.eventName} />
              </div>
              <div className='col-6'>
              description
                <input type={'textarea'} className={'form-control'} value={state.event.description} />
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
              location
                <input type={'text'} className={'form-control'} value={state.event.location} />
              </div>
              <div className='col-6'>
                createBy
                <input type={'text'} className={'form-control'} value={state.event.startOn} />
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
              StartOn
                <DatePicker
                  selected={state.event.startOn}
                  onChange={handelStart}
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
                  selected={state.event.startOn}
                  onChange={handelFinish}
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
