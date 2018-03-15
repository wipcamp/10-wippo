import React from 'react'
import Layout from '../components/layout/layout'
import {Tab} from 'semantic-ui-react'
import axios from '../components/util/axios'
import getCookie from '../components/util/cookie'
import Tab1 from '../components/verify/tab1'

export default class Itimanswer extends React.Component {
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
    let question = await axios.get(`/answers/${this.props.url.query.user_id}/count`, {
      Authorization: `Bearer ${token}`
    })
    await this.setState({ profile: data[0] })
    this.setState({
      image: `https://graph.facebook.com/v2.12/${data.provider_acc}/picture?height=1000&width=1000`,
      question: question.data.data,
      fblink: `https://facebook.com/${data.provider_acc}`
    })
  }

  render () {
    const Breadcrumb = () => <ol className='breadcrumb'>
      <li className='breadcrumb-item'><a href='/checkanswer'>checkanswer</a></li>
      <li className='breadcrumb-item active' aria-current='page'>ItimAnswer</li>
    </ol>

    const panes = [
      {menuItem: 'ข้อมูลน้อง',
        render: () => <Tab.Pane attached={false}>
          <Tab1
            question={this.state.question}
            fullName={`${this.state.profile.first_name} ${this.state.profile.last_name}`}
            image={this.state.image}
            info={this.state.profile}
            facebook={this.state.fblink}
          />
        </Tab.Pane>
      }
    ]

    return (
      <Layout subheadertext={<Breadcrumb />}>
        ItimAnswer
        <Tab menu={{ pointing: true }} panes={panes} />
      </Layout>
    )
  }
}