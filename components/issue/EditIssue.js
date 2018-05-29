import React from 'react'
import PropTypes from 'prop-types'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { actions as editActions } from '../../store/modules/issue.edit'
import { problemTypes } from './dropdown.json'
import Select from 'react-select'

import Modal from './Modal'

const EditIssue = ({
  toggleModal,
  setField,
  changeSolveStatus,
  editIssue,
  edit: {
    id,
    topic,
    desc,
    priority,
    type,
    assignTo,
    isSolve,
    notSolve,
    time,
    reportId,
    showModal,
    roleteams,
    staffs
  }
}) => (
  <Modal
    show={showModal}
    toggle={toggleModal}
    title={`Edit Isue ::`}
  >
    <form
      method={`POST`}
      onSubmit={editIssue}
    >
      <div className='row'>
        <div className='col-12 mb-2'>
          <b>ID: </b>{id}
        </div>
        <div className='col-12'>
          <div className='form-label-group'>
            <input
              type='text'
              id='topic-input'
              className='form-control'
              placeholder='Topic'
              required
              autoComplete='off'
              value={topic}
              onChange={e => setField('topic', e.target.value)}
            />
            <label htmlFor='topic-input' className='font-weight-bold'>Topic</label>
          </div>
          <div className='form-group'>
            <label htmlFor='desc-input' className='font-weight-bold'>Description<sup className='text-danger'>*</sup></label>
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
            <label htmlFor='problem-type-input' className='font-weight-bold'>ประเภท (Type)<sup className='text-danger'>*</sup></label>
            <select
              className='form-control'
              id='problem-type-input'
              required
              value={type}
              onChange={e => setField('type', e.target.value)}
            >
              {
                problemTypes.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className='col-6 col-md-4'>
          <div className='form-group'>
            <label htmlFor='priority-input' className='font-weight-bold'>ความสำคัญ (Priotity)<sup className='text-danger'>*</sup></label>
            <select
              className='form-control'
              id='priority-input'
              required
              value={priority}
              onChange={e => setField('priority', e.target.value)}
            >
              <option value='3' >น้อย</option>
              <option value='2'>ปานกลาง</option>
              <option value='1'>สูง</option>
            </select>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-6'>
          <div className='form-group'>
            <label className='font-weight-bold'>สถานะของปัญหา<sup className='text-danger'>*</sup></label>
            <div className='mt-2'>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='solve-problem'
                  id='solve-problem-input1'
                  value='1'
                  required
                  checked={isSolve}
                  onChange={e => changeSolveStatus(e.target.value)}
                />
                <label
                  className='form-check-label'
                  htmlFor='solve-problem-input1'
                >แก้ปัญหาแล้ว</label>
              </div>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='solve-problem'
                  id='solve-problem-input2'
                  value='2'
                  checked={notSolve}
                  onChange={e => changeSolveStatus(e.target.value)}
                />
                <label
                  className='form-check-label'
                  htmlFor='solve-problem-input2'
                >เพิกเฉยปัญหา</label>
              </div>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='solve-problem'
                  id='solve-problem-input3'
                  value='0'
                  checked={!(isSolve || notSolve)}
                  onChange={e => changeSolveStatus(e.target.value)}
                />
                <label
                  className='form-check-label'
                  htmlFor='solve-problem-input3'
                >ยังไม่แก้ปัญหา</label>
              </div>
            </div>
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
                ...staffs.map((d) => ({value: { ...d, type: 'staff' }, label: `${d.user_id}: ${d.profile.first_name} ${d.profile.last_name} (${d.profile.nickname})`}))
              ]}
            />
          </div>
        </div>
        <div className='col-12'>
          <b>เวลาที่สร้าง (Created at):</b> {time}
        </div>
        <div className='col-12'>
          <b>ผู้สร้าง (Report By): </b>
          WIPPID {reportId}
        </div>
        <div className='col-12 px-0'>
          <hr />
          <div className='px-3 text-right'>
            <button
              className='btn btn-warning mr-2'
            >Save issue log</button>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={toggleModal}
            >Close</button>
          </div>
        </div>
      </div>
    </form>
  </Modal>
)

EditIssue.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  edit: PropTypes.shape({
    showModal: PropTypes.bool.isRequired
  })
}

export default compose(
  connect(
    state => ({
      edit: state.editIssue
    }),
    { ...editActions }
  ),
  lifecycle({
    componentWillReceiveProps (nextProps) {
      if (!this.props.edit.finish && nextProps.edit.finish) {
        this.props.editAssign()
      }

      if (!this.props.edit.changeform && this.props.edit.assignTo.length > 0 &&
        this.props.edit.roleteams.length > 0 && this.props.edit.staffs.length > 0) {
        let temp = this.props.edit.assignTo.map(data => {
          if (data.role_team_id === null) {
            return {
              ...nextProps.edit.staffs.find(staff => staff.user_id === data.assigned_id),
              type: 'staff'
            }
          } else {
            return {
              ...nextProps.edit.roleteams.find(role => role.id === data.role_team_id),
              type: 'roleteam'
            }
          }
        })
        temp = temp.map(data => {
          if (data.type === 'roleteam') {
            return {
              value: data,
              label: `ทีม ${data.description}`
            }
          } else {
            return {
              value: data,
              label: `${data.user_id}: ${data.profile.first_name} ${data.profile.last_name} (${data.profile.nickname})`
            }
          }
        })
        this.props.changeform(temp)
        // this.props.changeform()
      }
    }
  })
)(EditIssue)
