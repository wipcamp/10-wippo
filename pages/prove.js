import React from 'react'
import Layout from '../components/layout/layout'
import Tab1 from '../components/prove/tab1'
import Tab2 from '../components/prove/tab2'
import Tab3 from '../components/prove/tab3'
import axios from '../utils/axios'
import { Tab } from 'semantic-ui-react'

class Prove extends React.Component {
  
  async componentWillMount() {
    const {data} = await axios.get('/profiles/' + this.props.url.query.user_id)
    console.log(data)
  }

  // static async getInitialProps ({ query }) {
  //   return query
  // }

  render () {
    const panes = [
      { menuItem: 'ข้อมูลน้อง', render: () => <Tab.Pane attached={false}><Tab1 /></Tab.Pane> },
      { menuItem: 'ปพ.1', render: () => <Tab.Pane attached={false}><Tab2 /></Tab.Pane> },
      { menuItem: 'ใบอนุญาติ', render: () => <Tab.Pane attached={false}><Tab3 /></Tab.Pane> }
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
