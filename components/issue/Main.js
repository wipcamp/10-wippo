import React from 'react'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { actions as issueActions } from '../../store/modules/issue'
import IssueList from './IssueList'
import Sidebar from './Sidebar'
import Layout from '../layout/layout'
import { StickyContainer, Sticky } from 'react-sticky'

const MainIssue = (props) => (
  <Layout subheadertext='Issue Management'>
    <div className='row'>
      <div className='col-12 col-md-3'>
        <StickyContainer>
          <Sticky>
            {
              (p) => <Sidebar dis={p.distanceFromTop} />
            }
          </Sticky>
        </StickyContainer>
      </div>
      <div className='col-12 col-md-9'>
        <h2>Issue list | {`Day 1 (${props.issue.date})`}</h2>
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
