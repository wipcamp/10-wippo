import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { actions as issueActions } from '../../store/modules/issue'
import Header from '../layout/header'
import IssueList from './IssueList'

const MainIssue = (props) => (
  <div>
    <Header />
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <button onClick={props.getIssue}>getIssue</button>
          <IssueList list={props.issue.issueList} />
        </div>
      </div>
    </div>
  </div>
)

export default compose(
  connect(
    state => ({
      issue: state.issue
    }),
    { ...issueActions }
  )
)(MainIssue)
