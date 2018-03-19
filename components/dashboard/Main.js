import React from 'react'
import Layout from '../../components/layout/layout'
import CheckAnswerChart from '../../components/dashboard/CheckAnswerChart'
import Phase1 from '../../components/dashboard/Phase1'
class Main extends React.Component {
  render () {
    return (
      <Layout subheadertext='Dashboard'>
        <div className='row'>
          <div className='col'>
            <CheckAnswerChart />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <Phase1 />
          </div>
        </div>
      </Layout>
    )
  }
}
export default Main
