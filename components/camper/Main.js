import React from 'react'
import Layout from '../layout/layout'
import CamperTable from './CamperTable'

const Main = () => (
  <Layout subheadertext='Camper Management'>
    <div className='row'>
      <div className='col-12'>
        <CamperTable />
      </div>
    </div>
  </Layout>
)

export default Main
