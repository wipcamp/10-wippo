import React from 'react'
import axios from '../../components/util/axios'
import getCookie from '../../components/util/cookie'
import Layout from '../../components/layout/layout'

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      teamNames: [],
      user_id: ''
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
    this.submitTeam()
  }

  handleUserId (e) {
    this.setState({
      user_id: e.target.value
    })
  }

  async submitTeam () {
    let {token} = await getCookie({req: false})
    let headers = {
      Authorization: `Bearer ${token}`
    }
    let userId = this.state.user_id
    let temp = await axios.get(`/userroles/user_id/${100012}`, headers)
    console.log(temp)
  }

  render () {
    return (
      <Layout subheadertext='Assign Team'>
        <div className='row'>
          <div className='col'>
            <h1>assign team</h1>
            <form>
              <input type='text' id='user_id' onChange={(e) => this.handleUserId(e)} />
              <br />
              <select name='name' id='name'>
                {this.state.teamNames.map((element) => {
                  return <option>{element.display_name}</option>
                })}
              </select>
              <button>Confirm</button>
            </form>
          </div>
        </div>
      </Layout>
    )
  }
}
export default Main
