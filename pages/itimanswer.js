import React from 'react'
import Layout from '../components/layout/layout'
import {Tab} from 'semantic-ui-react'
import Tab1 from '../components/verify/tab1'
import axios from '../components/util/axios'
import getCookie from '../components/util/cookie'


export default class Itimanswer extends React.Component {
  async componentWillMount () {
    let { token } = await getCookie({ req: false })
    let { data } = await axios.get(`/registrants/${this.props.url.query.user_id}`, {
      Authorization: `Bearer ${token}`
    })
    console.log('data', data[0])
    console.log('token', token)
  }

  render () {
    const Breadcrumb = () => <ol className='breadcrumb'>
      <li className='breadcrumb-item'><a href='/checkanswer'>checkanswer</a></li>
      <li className='breadcrumb-item active' aria-current='page'>ItimAnswer</li>
    </ol>

    const panes = [
      {menuItem: 'ข้อมูลน้อง',
        render: () => <Tab.Pane attached={false}>
          {/* <Tab1 /> */}
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