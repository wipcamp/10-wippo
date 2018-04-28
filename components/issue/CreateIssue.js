import React from 'react'
import Modal from './Modal'
import PropTypes from 'prop-types'

const GroupBtn = ({ toggle, className }) => (
  <div className={className}>
    <button
      className='btn btn-primary mr-2'
    >Create issue log</button>
    <button
      type='button'
      className='btn btn-secondary'
      onClick={toggle}
    >Close</button>
  </div>
)

const CreateIssue = ({ show, toggle }) => (
  <Modal
    show={show}
    toggle={toggle}
    title='Create Issue ::'
  >
    <form>
      <div className='row'>
        <div className='col-12'>
          <div className='form-label-group'>
            <input
              type='text'
              id='topic-input'
              className='form-control'
              placeholder='Topic'
              required
              autoFocus
              autoComplete='off'
            />
            <label htmlFor='topic-input'>Topic</label>
          </div>
          <div className='form-group'>
            <label htmlFor='desc-input'>Description</label>
            <textarea
              id='desc-input'
              className='form-control'
              placeholder='Description here ..'
              required
              rows='4'
            />
          </div>
        </div>
      </div>
      <div className='row mt-1'>
        <div className='col-6 col-md-4'>
          <div className='form-group'>
            <label htmlFor='problem-type-input'>ประเภท</label>
            <select
              className='form-control'
              id='problem-type-input'
              required
            >
              <option>xx</option>
              <option>yy</option>
            </select>
          </div>
        </div>
        <div className='col-6 col-md-4'>
          <div className='form-group'>
            <label htmlFor='priority-input'>ความสำคัญ (priotity)</label>
            <select
              className='form-control'
              id='priority-input'
              required
            >
              <option>น้อย</option>
              <option>ปานกลาง</option>
              <option>สูง</option>
            </select>
          </div>
        </div>
        <div className='col-6 col-md-4'>
          <div className='form-group'>
            <label>แก้ปัญหาหรือยัง</label>
            <div className='mt-2'>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='solve-problem'
                  id='solve-problem-input1'
                  value='1'
                  required
                />
                <label
                  className='form-check-label'
                  htmlFor='solve-problem-input1'
                >แก้แล้ว</label>
              </div>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='solve-problem'
                  id='solve-problem-input2'
                  value='0'
                />
                <label
                  className='form-check-label'
                  htmlFor='solve-problem-input2'
                >ยังไม่ได้แก้</label>
              </div>
            </div>
          </div>
        </div>
        <div className='col-12'>
          <div className='form-group'>
            <label htmlFor='assign-input'>Assign to</label>
            <input
              className='form-control'
              id='assign-input'
              required
            />
          </div>
        </div>
        <div className='col-12'>
          <span className='text-danger'>เวลาอ้างอิงตามเวลาที่โพสต์</span>
        </div>
        <div className='col-12 px-0'>
          <hr />
          <GroupBtn
            className='px-3 text-right'
            toggle={toggle}
          />
        </div>
      </div>
    </form>
  </Modal>
)

CreateIssue.propTypes = {
  toggle: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
}

export default CreateIssue
