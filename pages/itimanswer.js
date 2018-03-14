import React from 'react'
import Layout from '../components/layout/layout'
import {Tab} from 'semantic-ui-react'

export default class Itimanswer extends React.Component {
  render () {
    const Breadcrumb = () => <ol className='breadcrumb'>
      <li className='breadcrumb-item'><a href='/checkanswer'>checkanswer</a></li>
      <li className='breadcrumb-item active' aria-current='page'>ItimAnswer</li>
    </ol>

    const panes = [
      {menuItem: 'ข้อมูลน้อง',
        render: () => <Tab.Pane attached={false}>
          <Tab1 />> 
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