import React from 'react'
import Tab1 from './tab1'
// import Tab2 from '../verify/tab2'
// import Tab3 from '../verify/tab3'
import axios from '../util/axios'
import getCookie from '../util/cookie'
import { Tab, Button } from 'semantic-ui-react'

// const filterDocument = (doc, typeId) => {
//   let documents = []
//   doc.filter(({path, type_id: typeId, id}) => {
//     documents[typeId - 1] = {
//       id, path
//     }
//   })
//   return documents
// }

class Verify extends React.Component {
  state = {
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
    image: '',
    fblink: '',
    fileType: [],
    comment: '',
    question: 0
  }

  async componentDidMount () {
    let { token } = await getCookie({ req: false })
    let { data } = await axios.get(`/registrants/${this.props.url.query.user_id}`, {
      Authorization: `Bearer ${token}`
    })
    await this.fetchData()
    await this.setState({ profile: data[0] })
    // await this.setState({ documents: filterDocument(this.state.profile.documents) })
    // await this.getFileType()
    // await this.fetchCountQuestion()
  }

  // setComment = (comment) => {
  //   this.setState({
  //     comment
  //   })
  // }

  // async getFileType () {
  //   let fileType = []
  //   await this.state.documents.map(({path}, i) => {
  //     fileType[i] = path.substr(path.length - 3, path.length)
  //   })
  //   await this.setState({
  //     fileType: fileType
  //   })
  // }

  // async handleParentPermission (value, status) {
  //   let {token} = await getCookie({req: false})
  //   let headers = {
  //     Authorization: `Bearer ${token}`
  //   }
  //   await axios.put(`/documents/${this.state.documents[1].id}`, {
  //     isApprove: value,
  //     comment: this.state.comment
  //   }, headers)
  //   this.setState({ parentPermission: status, comment: '' })
  // }

  // async handleTransript (value, status) {
  //   let {token} = await getCookie({req: false})
  //   let headers = {
  //     Authorization: `Bearer ${token}`
  //   }
  //   await axios.put(`/documents/${this.state.documents[2].id}`, {
  //     isApprove: value,
  //     comment: this.state.comment
  //   }, headers)
  //   this.setState({ transcript: status, comment: '' })
  // }

  async fetchData () {
    let { token } = await getCookie({ req: false })
    let { data: {data} } = await axios.get(`/users/${this.props.url.query.user_id}`, {
      Authorization: `Bearer ${token}`
    })
    this.setState({
      image: `https://graph.facebook.com/v2.12/${data.provider_acc}/picture?height=1000&width=1000`,
      fblink: `https://facebook.com/${data.provider_acc}`
    })
  }

  render () {
    const panes = [
      { menuItem: 'ข้อมูลน้อง',
        render: () => <Tab.Pane attached={false}>
          <Tab1
            question={this.state.question}
            image={this.state.image}
            info={this.state.profile} facebook={this.state.fblink} />
        </Tab.Pane> }
      // ,
      // { menuItem: 'ปพ.1',
      //   render: props => <Tab.Pane attached={false}>
      //     <Tab2
      //       question={this.state.question}
      //       comment={this.state.comment}
      //       setComment={this.setComment}
      //       fileType={this.state.fileType[2]}
      //       image={this.state.image}
      //       path={this.state.documents[2].path}
      //       info={this.state.profile}
      //       status={this.state.transcript}
      //       button={<ButtonTranscript />} />
      //   </Tab.Pane> },
      // { menuItem: 'ใบอนุญาติ',
      //   render: props => <Tab.Pane attached={false}>
      //     <Tab3
      //       question={this.state.question}
      //       comment={this.state.comment}
      //       setComment={this.setComment}
      //       fileType={this.state.fileType[1]}
      //       image={this.state.image}
      //       path={this.state.documents[1].path}
      //       info={this.state.profile}
      //       status={this.state.parentPermission}
      //       button={<ButtonParentPermission />} />
      //   </Tab.Pane> }
    ]

    // const ButtonParentPermission = () => (
    //   <Button.Group>
    //     {this.state.parentPermission === 'reject' ? <Button color='red' >Reject </Button> : <Button onClick={() =>
    //       this.handleParentPermission(0, 'reject')} >Reject </Button>}
    //     <Button.Or />
    //     {this.state.parentPermission === 'approve' ? <Button color='green' >Approved </Button> : <Button onClick={() => this.handleParentPermission(1, 'approve')}>Approved </Button>}
    //   </Button.Group>
    // )

    // const ButtonTranscript = () => (
    //   <Button.Group>
    //     {this.state.transcript === 'reject' ? <Button color='red' >Reject </Button> : <Button onClick={() => this.handleTransript(0, 'reject')} >Reject </Button>}
    //     <Button.Or />
    //     {this.state.transcript === 'approve' ? <Button color='green' >Approved </Button> : <Button onClick={() => this.handleTransript(1, 'approve')}>Approved </Button>}
    //   </Button.Group>
    // )

    return (
      <div className='row'>
        <Tab className='col-12' menu={{ pointing: true }} panes={panes} />
      </div>
    )
  }
}

export default Verify
