import React from 'react'
import Layout from '../components/layout/layout'
import Mportlet from '../components/portlet/mportlet'
import PortletHeader from '../components/portlet/portletHead'

const Approve = () =>
  (
    <div>
      <Layout subheadertext={'approve'}>
        <Mportlet className='ml-auto'>
          <PortletHeader>
            Camper
          </PortletHeader>
          Table of camper
        </Mportlet>
      </Layout>
    </div>
  )
export default Approve
