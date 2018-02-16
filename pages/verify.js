import React from 'react'
import Layout from '../components/layout/layout'
import Tab1 from '../components/verify/tab1'
import { Tab } from 'semantic-ui-react'

class Prove extends React.Component {
  render () {
    const panes = [
      { menuItem: 'ข้อมูลน้อง', render: () => <Tab.Pane attached={false}><Tab1 /></Tab.Pane> },
      { menuItem: 'ปพ.1', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
      { menuItem: 'ใบอนุญาติ', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> }
    ]

    return (
      <div>
        <Layout>
          <Tab menu={{ pointing: true }} panes={panes} />
        </Layout>
      </div>
    )
  }
}

export default Prove
