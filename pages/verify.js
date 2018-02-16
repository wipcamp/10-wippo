import React from 'react'
import Layout from '../components/layout/layout'
import Tab1 from '../components/verify/tab1'
import Tab2 from '../components/verify/tab2'
import Tab3 from '../components/verify/tab3'
import axios from '../utils/axios'
import Querystring from 'query-string'
import { Tab, Button } from 'semantic-ui-react'

class Verify extends React.Component {
  constructor (props) {
    super()
    this.state = {
      profile: {
        profile_registrant: {
          activities: '',
          addr_dist: '',
          addr_prov: '',
          user_id: '',
          edu_name: ''
        }
      },
      parentPermission: '',
      transcript: ''
    }
    this.handlePutData = this.handlePutData.bind(this)
  }

  async componentWillMount () {
    const {data} = await axios.get('/profiles/' + this.props.url.query.user_id)
    await this.setState({profile: data})
    console.log(data)
  }

  async handlePutData (...e) {
    // const data = Querystring.stringify({
    //   'is_approve': e.status
    // })
    // await axios.put('/approve/19', data)
    console.log(e)
  }

  render () {
    const panes = [
      { menuItem: 'ข้อมูลน้อง', render: () => <Tab.Pane attached={false}><Tab1 info={this.state.profile} /></Tab.Pane> },
      { menuItem: 'ปพ.1', render: () => <Tab.Pane attached={false}><Tab2 info={this.state.profile} status={this.state.transcript} button={<ButtonTranscript />} /></Tab.Pane> },
      { menuItem: 'ใบอนุญาติ', render: () => <Tab.Pane attached={false}><Tab3 info={this.state.profile} status={this.state.parentPermission} button={<ButtonParentPermission />} /></Tab.Pane> }
    ]

    const ButtonParentPermission = () => (
      <Button.Group>
        {this.state.parentPermission === 'reject' ? <Button color='red' >Reject </Button> : <Button onClick={() => this.setState({parentPermission: 'reject'})} >Reject </Button>}
        <Button.Or />
        {this.state.parentPermission === '' ? <Button color='yellow' >Pending</Button> : <Button onClick={() => this.setState({parentPermission: ''})}>Pending</Button>}
        <Button.Or />
        {this.state.parentPermission === 'approve' ? <Button color='green' >Approved </Button> : <Button onClick={() => this.setState({parentPermission: 'approve'})}>Approved </Button>}
      </Button.Group>
    )

    const ButtonTranscript = () => (
      <Button.Group>
        {this.state.transcript === 'reject' ? <Button color='red' >Reject </Button> : <Button onClick={() => this.handlePutData(12, 0)} >Reject </Button>}
        <Button.Or />
        {this.state.transcript === '' ? <Button color='yellow' >Pending</Button> : <Button onClick={() => this.setState({transcript: ''})}>Pending</Button>}
        <Button.Or />
        {this.state.transcript === 'approve' ? <Button color='green' >Approved </Button> : <Button onClick={() => this.setState({transcript: 'approve'})}>Approved </Button>}
      </Button.Group>
    )

    return (
      <div>
        <Layout>
          <Tab menu={{ pointing: true }} panes={panes} />
        </Layout>
      </div>
    )
  }
}

export default Verify
