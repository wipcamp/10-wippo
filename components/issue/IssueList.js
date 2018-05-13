import React from 'react'
import IssueItem from './IssueItem'
import PropTypes from 'prop-types'
import moment from 'moment'

const issueFilter = ({
  list,
  priority,
  time,
  date,
  solve,
  problemType
}) => {
  return list.filter(item => {
    let shouldReturn = true
    // filter by priority
    switch (priority) {
      case '1':
        if (item.priority_id !== 1) shouldReturn = false
        break
      case '2':
        if (item.priority_id !== 2) shouldReturn = false
        break
      case '3':
        if (item.priority_id !== 3) shouldReturn = false
        break
    }

    // filter by time
    if (time !== 'all') {
      let t1 = time.substring(0, 2)
      let h = moment(item.created_at).format('hh')
      if (t1 !== h) {
        shouldReturn = false
      }
    }

    // filter by date
    if (date !== 'all') {
      let dateMoment = moment(item.created_at).format('DD MMM YYYY')
      if (dateMoment !== date) {
        shouldReturn = false
      }
    }

    // filter by isSolve
    switch (solve) {
      case '1':
        if (!(item.is_solve || item.not_solve)) shouldReturn = false
        break
      case '0':
        if (item.is_solve || item.not_solve) shouldReturn = false
        break
    }

    // filter by problemType
    if (problemType !== 'all') {
      if (item.problem_type_id != problemType) {
        shouldReturn = false
      }
    }

    return shouldReturn
  })
}

const IssueList = ({
  list,
  loading,
  priority,
  time,
  date,
  solve,
  problemType
}) => (
  <div>
    {loading && <div className='text-center'>Loading...</div>}
    {
      issueFilter({
        list,
        priority,
        time,
        date,
        solve,
        problemType
      }).map((d, i) => (
        <IssueItem data={d} key={i} />
      ))
    }
  </div>
)

IssueList.propTypes = {
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  priority: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  solve: PropTypes.string.isRequired
}

export default IssueList
