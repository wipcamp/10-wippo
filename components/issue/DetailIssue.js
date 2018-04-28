import React from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal'

const DetailIssue = ({ show }) => (
  <Modal
    show={show}
    title={`Detail Issue ::`}
  >
    <h2>หัวข้อ: lorem</h2>
    <div className='form-group'>
      <label htmlFor='issue-desc'>Detail:</label>
      <textarea
        className='form-control'
        id='issue-desc'
        rows='4'
        readOnly
      />
    </div>
    <div className='row'>
      <div className='col-4'>
        ประเภท: xx
      </div>
      <div className='col-4'>
        ความสำคัญ: สูง
      </div>
      <div className='col-4'>
        แก้ปัญหาแล้ว
      </div>
    </div>
    <div className='row'>
      <div className='col-12'>
        assign to:
      </div>
      <div className='col-12 px-0'>
        <hr />
        <div className='px-3 text-right'>
          <button
            className='btn btn-warning mr-2'
          >Edit Issue Log</button>
          <button
            type='button'
            className='btn btn-secondary'
            // onClick={}
          >Close</button>
        </div>
      </div>
    </div>
  </Modal>
)

DetailIssue.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    topic: PropTypes.string,
    description: PropTypes.string,
    report_id: PropTypes.number, // wipid
    is_solve: PropTypes.number, // 0 | 1
    not_solve: PropTypes.number, // 0 | 1
    problem_type_id: PropTypes.number,
    priority_id: PropTypes.number,
    created_at: PropTypes.string,
    updated_at: PropTypes.string
  })
}

export default DetailIssue
