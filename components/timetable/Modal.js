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

export default (isOpen, eventName, description, location, startOn, finishOn, createBy, handleDate) => {
  return (
    <Modal show title={'Edit Event::'} >
      <div className='container' >
        <form>
          <div className='row'>
            <div className='col-6'>
              Name
              <input type={'text'} className={'form-control'} />
            </div>
            <div className='col-6'>
            description
              <input type={'textarea'} className={'form-control'} />
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
            location
              <input type={'text'} className={'form-control'} />
            </div>
            <div className='col-6'>
              createBy
              <input type={'text'} className={'form-control'} />
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
            StartOn
              <DatePicker
                selected={startOn}
                onChange={handleDate}
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
                selected={startOn}
                onChange={handleDate}
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
            <ButtonContainer>
              <button className='btn btn-danger'>cancel</button>
            </ButtonContainer>
          </div>
        </form>
      </div>
    </Modal>
  )
}
