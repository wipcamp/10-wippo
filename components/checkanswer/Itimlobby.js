import React from 'react'
import ApproveTable from './ApproveTable'
import axios from '../util/axios'
import getCookie from '../util/cookie'

export default class Itimlobby extends React.Component {
  render () {
    return (
      <div style={{width: '100%'}} >
        <div>
          <h1>Hi</h1>
        </div>
        <ApproveTable />
      </div>
    )
  }
}