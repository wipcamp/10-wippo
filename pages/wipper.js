import React from 'react'
import Layout from '../components/layout/layout'
import WipperMain from '../components/wipper/Main'

class Wipper extends React.Component {
  render () {
    return (
      <Layout subheadertext=''>
        <div className='row'>
          <div className='col-12'>
            <WipperMain {...this.props} />
          </div>
        </div>
      </Layout>
    )
  }
}

export default Wipper
