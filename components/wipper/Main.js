import React from 'react'
import DatatableCard from './DatatableCard'
import StaffApprove from './StaffApprove'
class Main extends React.Component {
  render () {
    return (
      <div>
        {
          this.props.url.query.id ? (
            <StaffApprove id={this.props.url.query.id} />
          ) : (
            <DatatableCard />
          )
        }
      </div>
    )
  }
}

export default Main
