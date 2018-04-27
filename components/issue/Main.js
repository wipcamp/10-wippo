import React from 'react'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { actions as issueActions } from '../../store/modules/issue'
import IssueList from './IssueList'
import Sidebar from './Sidebar'
import Layout from '../layout/layout'

const MainIssue = (props) => (
  <Layout subheadertext='Issue Management'>
    <div className='row'>
      <div className='col-12 col-md-3'>
        <Sidebar {...props} />
      </div>
      <div className='col-12 col-md-9'>
        <h2>Issue list | {`Day 1 (${props.issue.date})`}</h2>
        {
          props.issue.loading && <div className='text-center'>Loading...</div>
        }
        <IssueList list={props.issue.issueList} />
      </div>
    </div>
  </Layout>
)

export default compose(
  connect(
    state => ({
      issue: state.issue
    }),
    { ...issueActions }
  ),
  lifecycle({
    componentDidMount () {
      this.props.getIssue()
    },
    componentWillUnmount () {

    }
  })
)(MainIssue)
