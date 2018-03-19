import React from 'react'
import ApproveTable from './ApproveTable'
import axios from '../util/axios'
import getCookie from '../util/cookie'

export default class Itimlobby extends React.Component {
  async componentDidMount () {
    const question = []
    let { token } = await getCookie({ req: false })
    const teams = JSON.parse(
      window.localStorage.getItem('team')
    )
    teams.map(team => {
      let data = axios.get(`/answers/${team.role}`, {
        Authorization: `Bearer ${token}`
      })
      data.then(val => {
        question.push(val.data.data)
      })
    })
    console.log('Question', question)
  }
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