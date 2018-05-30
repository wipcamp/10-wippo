import React from 'react'
import Header from '../layout/header'
import { StyledLayout } from '../layout/layout'
import CamperTable from './CamperTable'

const Main = () => (
  <StyledLayout>
    <Header />
    <div className='my-4 container-fluid'>
      <div className='row'>
        <div className='col-12'>
          <h1>Camper Manangement</h1>
        </div>
        <div className='col-12'>
          <CamperTable />
        </div>
      </div>
    </div>
  </StyledLayout>
)

export default Main
