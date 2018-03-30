import React from 'react'
import axios from '../../components/util/axios'
import getCookie from '../../components/util/cookie'
import Layout from '../../components/layout/layout'

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      teamNames: [],
      user_id: '',
      selectedTeamName: '',
      msg: ''
    }

    // this.handleUserId = this.handleUserId.bind(this)
  }

  async componentDidMount () {
    let {token} = await getCookie({req: false})
    let headers = {
      Authorization: `Bearer ${token}`
    }
    let teamNames = await axios.get('/roleteams', headers)
    await this.setState({
      teamNames: teamNames.data.data
    })
    console.log(this.state.teamNames)
    // this.submitTeam()
  }

  handleUserId (e) {
    this.setState({
      user_id: e.target.value
    })
  }

  handleTeamSelect (e) {
    this.setState({
      selectedTeamName: e.target.value
    })
  }

  async submitTeam () {
    let {token} = await getCookie({req: false})
    let headers = {
      Authorization: `Bearer ${token}`
    }
    let userId = this.state.user_id
    let teamName = this.state.selectedTeamName
    if (teamName.length === 0 || teamName === '-โปรดเลือก-') {
      this.setState({
        msg: 'กรุณาเลือกทีม'
      })
    } else {
      let res
      try {
        res = await axios.post(`/userroleteams`, {user_id: userId, name: teamName}, headers)
        if (res.data.status >= 200 && res.data.status < 300) {
          this.setState({ msg: 'สำเร็จ!' })
        } else {
          this.setState({ msg: `ล้มเหลว ( ${res.data.message} )` })
        }
      } catch (error) {
        this.setState({ msg: `ล้มเหลว ( ${error} )` })
      }
    }
  }

  render () {
    return (
      <Layout subheadertext='Assign Team'>
        <div className='row'>
          <div className='col'>
            <h1>assign team</h1>
            <p>{this.state.msg}</p>
            <input type='text' id='user_id' onChange={(e) => this.handleUserId(e)} />
            <br />
            <select name='name' id='name' onChange={(e) => this.handleTeamSelect(e)}>
              <option>-โปรดเลือก-</option>
              {this.state.teamNames.map((element) => {
                return <option>{element.display_name}</option>
              })}
            </select>
            <button onClick={(e) => this.submitTeam()}>Confirm</button>
          </div>
        </div>
      </Layout>
    )
  }
}
export default Main
