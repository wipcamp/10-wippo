import React from 'react'
import ApproveTable from './ApproveTable'


export default class Itimlobby extends React.Component {
  render () {
    return (
      <div style={{width: '100%'}} >
        <div>
          <h1>Itim List</h1>
        </div>
        <ApproveTable />
      </div>
    )
  }
}