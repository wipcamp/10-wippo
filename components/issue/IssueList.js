import React from 'react'
import IssueItem from './IssueItem'
import PropTypes from 'prop-types'

const IssueList = ({ list }) => (
  <div>
    {
      list.map((d, i) => (
        <IssueItem data={d} key={i} />
      ))
    }
  </div>
)

IssueList.propTypes = {
  list: PropTypes.array.isRequired
}

export default IssueList
