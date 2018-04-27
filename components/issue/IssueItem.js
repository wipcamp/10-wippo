import React from 'react'
import PropTypes from 'prop-types'
import Tag from './Tag'
import moment from 'moment'

const IssueItem = ({
  data: {
    topic,
    priority_id: priority,
    is_solve: isSolve,
    not_solve: notSolve,
    created_at: create
  }
}) => (
  <div className='row my-3 border'>
    <div className='col-12 text-white bg-secondary py-3' style={{fontSize: '120%'}}>
      <b>หัวข้อ:</b> {topic}
    </div>
    <div className='col-12 py-1' style={{backgroundColor: '#ddd'}}>
      <div className=''>
        {moment(create, 'yyyy-mm-dd hh:mm:ss GMT+7').format('วัน DD MMM YYYY เวลา hh:mm:ss')}
        <Tag priority={priority} />
        <div className='d-inline-block float-right'>
          <div className='mx-2 d-inline-block'>
            {(isSolve || notSolve)
              ? <span className='alert-success alert py-1'>แก้แล้ว</span>
              : <span className='alert py-1 alert-danger'>ยังไม่ได้แก้</span>}
          </div>
          <button className='btn btn-warning mr-1'>แก้ไข</button>
          <button className='btn btn-info mr-1'>ดูรายละเอียด</button>
        </div>
      </div>
    </div>
  </div>
)

IssueItem.propTypes = {
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

export default IssueItem
