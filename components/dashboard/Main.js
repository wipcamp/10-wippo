import React from 'react'
import Layout from '../../components/layout/layout'
import Phase1 from '../../components/dashboard/Phase1'
// import Phase2 from '../../components/dashboard/Phase2'
class Main extends React.Component {
  render () {
    return (
      <Layout subheadertext='Dashboard'>
        <div className='row'>
          <div className='col'>
            <Phase1 />
          </div>
        </div>
        {/* <div className='row'>
          <div className='col'>
            <Phase2 />
          </div>
        </div> */}
      </Layout>
    )
  }
}
export default Main
