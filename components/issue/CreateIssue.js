import React from 'react'
import Modal from './Modal'
import PropTypes from 'prop-types'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { actions as createActions } from '../../store/modules/issue.create'
import { problemTypes } from './dropdown.json'
import Select from 'react-select'

const GroupBtn = ({ toggle, className, clear }) => (
  <div className={className}>
    <button
      type='button'
      className='btn btn-warning mr-2'
      onClick={clear}
    >Clear field</button>
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

const CreateIssue = ({
  setField,
  toggleModal,
  clearAll,
  createIssue,
  create: {
    topic,
    desc,
    type,
    priority,
    isSolve,
    assignTo,
    showModal,
    staffs,
    roleteams
  }
}) => (
  <Modal
    show={showModal}
    toggle={toggleModal}
    title='Create Issue ::'
  >
    <form onSubmit={createIssue}>
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
              value={topic}
              onChange={e => setField('topic', e.target.value)}
            />
            <label htmlFor='topic-input'>Topic</label>
          </div>
          <div className='form-group'>
            <label htmlFor='desc-input'>รายละเอียด (Description)<sup className='text-danger'>*</sup></label>
            <textarea
              id='desc-input'
              className='form-control'
              placeholder='Description here ..'
              required
              rows='4'
              value={desc}
              onChange={e => setField('desc', e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='row mt-1'>
        <div className='col-6 col-md-4'>
          <div className='form-group'>
            <label htmlFor='problem-type-input'>ประเภท (Type)<sup className='text-danger'>*</sup></label>
            <select
              className='form-control'
              id='problem-type-input'
              required
              value={type}
              onChange={e => setField('type', e.target.value)}
            >
              <option value=''>โปรดเลือก</option>
              {
                problemTypes.map(d => (
                  <option key={d.id} value={d.id} >{d.name}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className='col-6 col-md-4'>
          <div className='form-group'>
            <label htmlFor='priority-input'>ความสำคัญ (Priotity)<sup className='text-danger'>*</sup></label>
            <select
              className='form-control'
              id='priority-input'
              required
              value={priority}
              onChange={e => setField('priority', e.target.value)}
            >
              <option value=''>โปรดเลือก</option>
              <option value='3'>น้อย</option>
              <option value='2'>ปานกลาง</option>
              <option value='1'>สูง</option>
            </select>
          </div>
        </div>
        <div className='col-12'>
          <div className='form-group'>
            <label htmlFor='priority-input'>กำหนด (Assign to)<sup className='text-danger'>*</sup></label>
            <Select
              value={assignTo}
              removeSelected
              multi
              onChange={e => setField('assignTo', e)}
              options={[
                ...roleteams.map((d, i) => ({value: { ...d, id: i + 1, type: 'roleteam' }, label: `ทีม ${d.description}`})),
                ...staffs.map((s) => {
                  const profile = s.profile
                  console.log(s)
                  console.log(profile)
                  let label = `${s.user_id}`
                  if (profile) {
                    label += `${profile.first_name} ${profile.last_name} (${profile.nickname})`
                  }
                  return {
                    value: { ...s, type: 'staff' },
                    label
                  }
                })
              ]}
            />
          </div>
        </div>
        <div className='col-12'>
          <span className='text-danger'>หมายเหตุ: เวลาอ้างอิงตามเวลาที่สร้างโพสต์</span>
        </div>
        <div className='col-12 px-0'>
          <hr />
          <GroupBtn
            className='px-3 text-right'
            toggle={toggleModal}
            clear={clearAll}
          />
        </div>
      </div>
    </form>
  </Modal>
)

CreateIssue.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  create: PropTypes.shape({
    topic: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    assignTo: PropTypes.array.isRequired,
    showModal: PropTypes.bool.isRequired
  })
}

export default compose(
  connect(
    state => ({
      create: state.createIssue
    }),
    { ...createActions }
  ),
  lifecycle({
    componentWillReceiveProps (nextProps) {
      if (!this.props.create.finish && nextProps.create.finish) {
        this.props.insertAssign()
      }
    }
  })
)(CreateIssue)
