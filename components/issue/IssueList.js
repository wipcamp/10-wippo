import React from 'react'
import IssueItem from './IssueItem'
import PropTypes from 'prop-types'

const IssueList = ({ list, loading }) => (
  <div>
    {loading && <div className='text-center'>Loading...</div>}
    {
      list.map((d, i) => (
        <IssueItem data={d} key={i} />
      ))
    }
  </div>
)

IssueList.propTypes = {
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

export default IssueList
