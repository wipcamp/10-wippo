import React from 'react'
import Layout from '../components/layout/layout'
import Tab1 from '../components/verify/tab1'
import Tab2 from '../components/verify/tab2'
import Tab3 from '../components/verify/tab3'
import axios from '../components/util/axios'
import getCookie from '../components/util/cookie'
import { Grid, Tab, Button } from 'semantic-ui-react'

const filterDocument = (doc, typeId) => {
  let documents = []
  doc.filter(({path, type_id: typeId, id}) => {
    documents[typeId - 1] = {
      id, path
    }
  })
  return documents
}

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
      documents: [],
      image: ''
    }
    this.handlePutData = this.handlePutData.bind(this)
  }

  async componentDidMount () {
    let { token } = await getCookie({ req: false })
    let { data } = await axios.get(`/registrants/${this.props.url.query.user_id}`, {
      Authorization: `Bearer ${token}`
    })
    this.fetchData()
    await this.setState({ profile: data[0] })
    console.log(this.state.profile)
    await this.setState({ documents: filterDocument(this.state.profile.documents) })
    console.log(filterDocument(this.state.profile.documents))
  }

  async handlePutData (...e) {
    // const data = Querystring.stringify({
    //   'is_approve': e.status
    // })
    // await axios.put('/approve/19', data)
    console.log(e)
  }

  async fetchData () {
    let { token } = await getCookie({ req: false })
    let { data: {data} } = await axios.get(`/users/${this.props.url.query.user_id}`, {
      Authorization: `Bearer ${token}`
    })
    this.setState({
      image: `https://graph.facebook.com/v2.12/${data.provider_acc}/picture?height=1000&width=1000`
    })
  }

  render () {
    const panes = [
      { menuItem: 'ข้อมูลน้อง',
        render: () => <Tab.Pane attached={false}>  
          <Tab1
            image={this.state.image}
            info={this.state.profile} />
        </Tab.Pane> },
      { menuItem: 'ปพ.1',
        render: props => <Tab.Pane attached={false}>
          <Tab2
            image={this.state.image}
            path={this.state.documents[2]}
            info={this.state.profile}
            status={this.state.transcript}
            button={<ButtonTranscript />} />
        </Tab.Pane> },
      { menuItem: 'ใบอนุญาติ',
        render: props => <Tab.Pane attached={false}>
          <Tab3
            image={this.state.image}
            path={this.state.documents[1]}
            info={this.state.profile}
            status={this.state.parentPermission}
            button={<ButtonParentPermission />} />
        </Tab.Pane> }
    ]

    const ButtonParentPermission = () => (
      <Button.Group>
        {this.state.parentPermission === 'reject' ? <Button color='red' >Reject </Button> : <Button onClick={() => this.setState({ parentPermission: 'reject' })} >Reject </Button>}
        <Button.Or />
        {this.state.parentPermission === '' ? <Button color='yellow' >Pending</Button> : <Button onClick={() => this.setState({ parentPermission: '' })}>Pending</Button>}
        <Button.Or />
        {this.state.parentPermission === 'approve' ? <Button color='green' >Approved </Button> : <Button onClick={() => this.setState({ parentPermission: 'approve' })}>Approved </Button>}
      </Button.Group>
    )

    const ButtonTranscript = () => (
      <Button.Group>
        {this.state.transcript === 'reject' ? <Button color='red' >Reject </Button> : <Button onClick={() => this.handlePutData(12, 0)} >Reject </Button>}
        <Button.Or />
        {this.state.transcript === '' ? <Button color='yellow' >Pending</Button> : <Button onClick={() => this.setState({ transcript: '' })}>Pending</Button>}
        <Button.Or />
        {this.state.transcript === 'approve' ? <Button color='green' >Approved </Button> : <Button onClick={() => this.setState({ transcript: 'approve' })}>Approved </Button>}
      </Button.Group>
    )

    return (
      <Layout subheadertext={`Approve System.`}>
        <Grid.Row>
          <Tab className='col-12' menu={{ pointing: true }} panes={panes} />
        </Grid.Row>
      </Layout>
    )
  }
}

export default Verify
