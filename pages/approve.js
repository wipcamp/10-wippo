import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout/layout'
import XLportlet from '../components/portlet/xlportlet'
import Mportlet from '../components/portlet/mportlet'
import PortletHeader from '../components/portlet/portletHead'
import ProgressBar from '../components/progressbar'
import ApproveTable from '../components/approve/approveTable'

const Number = styled.div`
padding-top:22px;
padding-left:200px;
font-size:77px;
`

const Approve = () =>
  (
    <div>
      <Layout subheadertext={'approve'}>
        <div className='row'>
          <XLportlet>
            progressbar
            <ProgressBar width='80' />
          </XLportlet>
        </div>
        <div className='row'>
          <Mportlet>
            บฝ
            <Number>
              {160}
            </Number>
          </Mportlet>
          <Mportlet>
            ฝู้ปกครอง
            <Number>
              {160}
            </Number>
          </Mportlet>
        </div>
        <div className='row'>
          <XLportlet>
            <PortletHeader>
              Camper
            </PortletHeader>
            <ApproveTable />
          </XLportlet>
        </div>
      </Layout>
    </div>
  )
export default Approve
