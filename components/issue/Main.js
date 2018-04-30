import React from 'react'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'

import { actions as issueActions } from '../../store/modules/issue'
import { actions as createActions } from '../../store/modules/issue.create'

import IssueList from './IssueList'
import Sidebar from './Sidebar'
import Layout from '../layout/layout'
import CreateIssue from './CreateIssue'
import DetailIssue from './DetailIssue'
import EditIssue from './EditIssue'

const MainIssue = (props) => (
  <Layout subheadertext='Issue Management'>
    <div className='row'>
      <div className='col-12 col-md-3'>
        <Sidebar {...props} />
      </div>
      <div className='col-12 col-md-9'>
        <h2>Issue list | {`Day 1 (${props.issue.date})`}</h2>
        <IssueList list={props.issue.issueList} loading={props.issue.loading}/>
      </div>
    </div>
    {props.modal1 && <CreateIssue />}
    {props.modal2 && <EditIssue />}
    {props.modal3 && <DetailIssue />}
  </Layout>
)

export default compose(
  connect(
    state => ({
      issue: state.issue,
      modal1: state.createIssue.showModal,
      modal2: state.editIssue.showModal,
      modal3: state.detailIssue.showModal
    }),
    {
      ...issueActions,
      toggleCreate: createActions.toggleModal
    }
  ),
  lifecycle({
    componentDidMount () {
      this.props.getIssue()
    },
    componentWillUnmount () {

    }
  })
)(MainIssue)
