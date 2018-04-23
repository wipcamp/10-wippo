import React from 'react'
import PropTypes from 'prop-types'

const IssueItem = ({
  data: {
    topic
  }
}) => (
  <div className='row'>
    <div className='col-12 border py-3'>
      {topic}
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
