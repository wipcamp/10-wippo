import React from 'react'
import Layout from '../components/layout/layout'
import TranscriptCard from '../components/approve/TranscriptCard'
import Parentconfirmation from '../components/approve/Parentconfirmation'
import DatatableCard from '../components/approve/DatatableCard'

const Approve = () =>
  (
    <div>
      <Layout subheadertext={'Approve System'}>
        <div className='row'>
          <div className='col'>
            <TranscriptCard />
          </div>
          <div className='col'>
            <Parentconfirmation />
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col'>
            <DatatableCard />
          </div>
        </div>
      </Layout>
    </div>
  )
export default Approve
