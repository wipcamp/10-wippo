import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Prioritise = styled.div.attrs({
  className: 'mx-3 p-1 rounded'
})`
  display: inline-block;
  ${props => props.level === 1 ? `
    background: red;
    color: white;
  ` : props.level === 2 ? `
    background: orange;
    color: white;    
  ` : props.level === 3 && `
    background: green;
    color: white;
  `}
`

const IssueItem = ({
  data: {
    topic
  }
}) => (
  <div className='row my-2'>
    <div className='col-12 border pt-2 pb-1'>
      <b>หัวข้อ:</b> {topic}
    </div>
    <div className='col-12 bg-secondary py-1'>
      <div className=' text-white'>
        วัน 30 May 2018 เวลา 18:00:01
        <Prioritise level={3}>ปานกลาง</Prioritise>
        <div className='d-inline-block float-right'>
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
    updated_at: PropTypes.string
  })
}

export default IssueItem
