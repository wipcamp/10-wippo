import React from 'react'
import {injectGlobal} from 'styled-components'
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
    fileType: '',
    status: null,
    comment: null
  }

  async componentDidMount () { // TRUE FETCH METHOD! 1 Time Fetch All data is there
    let { token } = await getCookie({ req: false })
    let { data } = await axios.get(`/slips/${this.props.url.query.docId}`, {
      Authorization: `Bearer ${token}`
    })
    await this.setState({doc: data})
    await this.setState({
      image: `https://graph.facebook.com/v2.12/${data.profile.user.provider_acc}/picture?height=1000&width=1000`,
      fbLink: `https://facebook.com/${data.profile.user.provider_acc}`
    })
    await this.getFileType()
    await this.setState({status: this.state.doc.is_approve, comment: this.state.doc.approve_reason})
    console.log('state', this.state)
  }

  async getFileType () {
    let path = await this.state.doc.path
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
    const buttonHandeler = async (e) => {
      let {token} = getCookie({req: false})
      const status = Number.parseInt(e.target.value)
      this.setState({status: status})
      console.log('status', this.state.status)
      await axios.post(`/slips/${this.state.doc.id}`,
        {
          is_approve: status,
          approve_reason: this.state.comment,
          _method: 'put'
        },
        {
          Authorization: `Bearer ${token}`
        })
    }

    const setComment = (e) => {
      this.setState({comment: e.target.value})
    }

    const ButtonTranscript = () => (
      <Button.Group>
        {this.state.status === 0 ? <Button color='red' >Reject </Button>
          : <Button onClick={buttonHandeler} value={0}>Reject </Button>
        }
        <Button.Or />
        {this.state.status === 1 ? <Button color='green' >Approved </Button>
          : <Button onClick={buttonHandeler} value={1} >Approved </Button>}
      </Button.Group>
    )

    const panes = [
      { menuItem: 'ข้อมูลส่วนตัว',
        render: () => <Tab.Pane attached={false}>
          <Tab1
            fullName={`${this.state.doc.profile.first_name} ${this.state.doc.profile.last_name}`}
            image={this.state.image}
            profile={this.state.doc.profile}
            info={this.state.doc.profile.profile_registrant}
            facebook={this.state.fbLink}
          />
        </Tab.Pane> },
      { menuItem: 'หลักฐานการโอนเงิน',
        render: props => <Tab.Pane attached={false}>
          <Tab2
            fullName={`${this.state.doc.profile.first_name} ${this.state.doc.profile.last_name}`}
            comment={this.state.comment}
            setComment={setComment}
            fileType={this.state.fileType}
            image={this.state.image}
            path={this.state.doc.path}
            profile={this.state.doc.profile}
            status={this.state.status}
            button={<ButtonTranscript />} />
        </Tab.Pane> }
    ]
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
