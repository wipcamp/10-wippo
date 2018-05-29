import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { actions as detailActions } from '../../store/modules/issue.detail'
import { actions as editActions } from '../../store/modules/issue.edit'
import Tag from './Tag'
import { problemTypes } from './dropdown.json'
import DetailAssign from './DetailAssign'

import Modal from './Modal'

const DetailIssue = ({
  toggleModal,
  detail,
  closeModal,
  setEdit,
  getEditAssigns,
  getEditStaffs,
  getEditRoleTeams
}) => {
  const {
    id,
    topic,
    desc,
    type,
    priority,
    isSolve,
    notSolve,
    time,
    reportId,
    showModal,
    assignTo,
    staffs,
    roleteams
  } = detail
  return (
    <Modal
      show={showModal}
      toggle={toggleModal}
      title={`Detail Issue ::`}
    >
      <div>
        <span>ID: {id}</span>
        <h3 className='mt-1'>หัวข้อ: {topic}</h3>
        <div className='form-group'>
          <label htmlFor='issue-desc'><b>Detail:</b></label>
          <textarea
            className='form-control'
            id='issue-desc'
            rows='4'
            readOnly
            value={desc}
          />
        </div>
        <div className='row'>
          <div className='col-4'>
            <b>ประเภท:</b> {problemTypes.find(d => type === d.id).name}
          </div>
          <div className='col-4'>
            <b>ความสำคัญ:</b> <Tag priority={priority} />
          </div>
          <div className='col-4'>
            <b>สถานะของปัญหา: </b>
            <span>{isSolve ? 'แก้ปัญหาแล้ว'
              : notSolve
                ? 'เพิกเฉยปัญหา'
                : 'ยังไม่ได้แก้ปัญหา'}</span>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <DetailAssign
              staffs={staffs}
              roleteams={roleteams}
              assignTo={assignTo}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <b>สร้างเมื่อ (Created at): </b>
            <span>{time}</span>
          </div>
          <div className='col-12'>
            <b>แจ้งโดย (Reported by): </b>
            <span>WIPID {reportId}</span>
          </div>
          <div className='col-12 px-0'>
            <hr />
            <div className='px-3 text-right'>
              <button
                className='btn btn-warning mr-2'
                onClick={() => {
                  closeModal()
                  getEditAssigns(id)
                  getEditRoleTeams()
                  getEditStaffs()
                  setEdit(detail)
                }}
              >Edit Issue Log</button>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={toggleModal}
              >Close</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

DetailIssue.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  detail: PropTypes.shape({
    showModal: PropTypes.bool.isRequired
  })
}

export default compose(
  connect(
    state => ({
      detail: state.detailIssue
    }),
    {
      ...detailActions,
      setEdit: editActions.initEdit,
      getEditAssigns: editActions.getAssigns,
      getEditRoleTeams: editActions.getRoleTeams,
      getEditStaffs: editActions.getStaffs
    }
  )
)(DetailIssue)
