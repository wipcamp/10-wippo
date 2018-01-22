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

const Badge = styled.span`
margin-right:4px;
`

const BadgeRef = styled.span`
font-size:16px;
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
              <BadgeRef>
                <Badge className='badge badge-pill badge-success'>Sucess</Badge>
                <Badge className='badge badge-pill badge-warning'>Pending</Badge>
                <Badge className='badge badge-pill badge-danger'>Reject</Badge>
              </BadgeRef>
            </PortletHeader>
            <ApproveTable />
          </XLportlet>
        </div>
      </Layout>
    </div>
  )
export default Approve
