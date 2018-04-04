import React from 'react'
import Layout from '../components/layout/layout'
import Tab1 from '../components/slip/Tab1'
import Tab2 from '../components/slip/Tab2'
import axios from '../components/util/axios'
import getCookie from '../components/util/cookie'
import { Grid, Tab, Button } from 'semantic-ui-react'

const Breadcrumb = () => <ol className='breadcrumb'>
  <li className='breadcrumb-item'><a href='/slip'>ApproveSlip</a></li>
  <li className='breadcrumb-item active' aria-current='page'>Verify</li>
</ol>

class Verifyslip extends React.Component {
  state = {
    doc: {
      profile: {
        profile_registrant: {
          user_id: 0,
          telno_personal: 0
        }
      }
    },
    image: '',
    fbLink: '',
    fileType: ''
  }

  async componentDidMount () { // TRUE FETCH METHOD! 1 Time Fetch All data is there
    let { token } = await getCookie({ req: false })
    let { data } = await axios.get(`/slip/90`, {
      Authorization: `Bearer ${token}`
    })
    await this.setState({doc: data})
    await this.setState({
      image: `https://graph.facebook.com/v2.12/${data.profile.user.provider_acc}/picture?height=1000&width=1000`,
      fbLink: `https://facebook.com/${data.profile.user.provider_acc}`
    })
    await this.getFileType()
    console.log('state', this.state)
  }

  async getFileType () {
    // await this.state.doc.map(({path}, i) => {
    //   fileType[i] = path.substr(path.length - 3, path.length)
    // })
    let path = await this.state.doc.path
    console.log('path', path)
    let fileType = path.split('.')
    await this.setState({
      fileType: fileType[fileType.length - 1]
    })
  }

  async handleParentPermission (value, status) {
    let {token} = await getCookie({req: false})
    let headers = {
      Authorization: `Bearer ${token}`
    }
    await axios.put(`/documents/${this.state.documents[1].id}`, {
      isApprove: value,
      comment: this.state.comment
    }, headers)
    this.setState({ parentPermission: status, comment: '' })
  }

  async handleTransript (value, status) {
    let {token} = await getCookie({req: false})
    let headers = {
      Authorization: `Bearer ${token}`
    }
    await axios.put(`/documents/${this.state.documents[2].id}`, {
      isApprove: value,
      comment: this.state.comment
    }, headers)
    this.setState({ transcript: status, comment: '' })
  }

  render () {
    const panes = [
      { menuItem: 'ข้อมูลน้อง',
        render: () => <Tab.Pane attached={false}>
          <Tab1
            fullName={`${this.state.doc.profile.first_name} ${this.state.doc.profile.last_name}`}
            image={this.state.image}
            profile={this.state.doc.profile}
            info={this.state.doc.profile.profile_registrant}
            facebook={this.state.fbLink}
          />
        </Tab.Pane> },
      { menuItem: 'Slip',
        render: props => <Tab.Pane attached={false}>
          <Tab2
            fullName={`${this.state.doc.profile.first_name} ${this.state.doc.profile.last_name}`}
            comment={this.state.doc.approve_reason}
            setComment={this.setComment}
            fileType={this.state.fileType}
            image={this.state.image}
            path={this.state.doc.path}
            profile={this.state.doc.profile}
            status={this.state.doc.is_approve}
            button={<ButtonTranscript />} />
        </Tab.Pane> }
    ]

    const ButtonTranscript = () => (
      <Button.Group>
        {this.state.doc.is_approve === 0 ? <Button color='red' >Reject </Button>
          : <Button>Reject </Button>
        }
        <Button.Or />
        {this.state.parentPermission === 1 ? <Button color='green' >Approved </Button>
          : <Button>Approved </Button>}
      </Button.Group>
    )

    return (
      <Layout subheadertext={<Breadcrumb />}>
        <Grid.Row>
          <Tab className='col-12' menu={{ pointing: true }} panes={panes} />
        </Grid.Row>
      </Layout>
    )
  }
}

export default Verifyslip
