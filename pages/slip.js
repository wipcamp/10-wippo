import React from 'react'
import Layout from '../components/layout/layout'
import Notpaid from '../components/slip/NotpaidCard'
import ApproveTable from '../components/slip/ApproveTable'

const Breadcrumb = () => (
  <ol className='breadcrumb'>
    <li className='breadcrumb-item active'>CheckAnswer</li>
  </ol>
)
const Approve = () =>
  (
    <div>
      <Layout subheadertext={<Breadcrumb />}>
        <div className='row'>
          <div className='col'>
            {/* <Notpaid /> */}
          </div>
        </div>
        <div className='row mt-3'>
          <div style={{width: '100%', padding: '40px'}} className='col card'>
            <ApproveTable />
          </div>
        </div>
      </Layout>
    </div>
  )
export default Approve
