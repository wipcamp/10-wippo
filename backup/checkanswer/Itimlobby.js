import React from 'react'
import ApproveTable from './ApproveTable'
import cookie from 'cookie'
import getCookie from '../util/cookie'
import api from '../util/axios'

export default class Itimlobby extends React.Component {
  async componentDidMount () {
    let { token } = getCookie({req: false})
    let { data: {accessToken} } = await api.post('/auth/refresh', {}, {
      Authorization: `Bearer ${token}`
    })
    document.cookie = cookie.serialize('token', accessToken, { maxAge: 60 * 60 })
  }
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