import React from 'react'
import Layout from '../components/layout/layout'
import {Tab} from 'semantic-ui-react'
import axios from '../components/util/axios'
import getCookie from '../components/util/cookie'
import Answer from '../components/ItimAnswers/Answer'
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
    let users = await axios.get(`/users/${this.props.url.query.user_id}`, {
      Authorization: `Bearer ${token}`
    })
    let question = await axios.get(`/answers/${this.props.url.query.user_id}/count`, {
      Authorization: `Bearer ${token}`
    })
    await this.setState({ profile: data[0] })
    // await this.setState({ question: question })
    await this.setState({
      image: `https://graph.facebook.com/v2.12/${users.data.data.provider_acc}/picture?height=1000&width=1000`,
      question: question.data.data,
      fblink: `https://facebook.com/${data.provider_acc}`
    })
  }

  render () {
    const Breadcrumb = () => <ol className='breadcrumb'>
      <li className='breadcrumb-item'><a href='/checkanswer'>checkanswer</a></li>
      <li className='breadcrumb-item'><a href='/selectquestion'>Select Question</a></li>
      <li className='breadcrumb-item active' aria-current='page'>ItimAnswer</li>
    </ol>

    const info = {
      user_id: 1000038,
      nickname: 'Tae'
    }

    return (
      <Layout subheadertext={<Breadcrumb />}>
        <Answer question={'fuck'} info={info} fullName={'Keerati'} />
      </Layout>
    )
  }
}