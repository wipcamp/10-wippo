import React from 'react'
import Modal from '../issue/Modal'

export default (isOpen, eventName, description, location, startOn, finishOn, createBy) => {
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
            </div>
            <div className='col-6'>
            StartOn
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
            FinishOn
            </div>
            <div className='col-6'>
            CreateBy
            </div>
          </div>
        </form>
      </div>
    </Modal>
  )
}
