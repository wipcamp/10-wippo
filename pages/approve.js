import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout/layout'
import XLportlet from '../components/portlet/xlportlet'
import Mportlet from '../components/portlet/mportlet'
import PortletHeader from '../components/portlet/portletHead'

const Badge = styled.span`
  margin-right:4px;
`

const Approve = () =>
  (
    <div>
      <Layout subheadertext={'approve'}>
        <Mportlet>
          บฝ
        </Mportlet>
        <Mportlet>
          ฝู้ปกครอง
        </Mportlet>
        <XLportlet>
          <PortletHeader>
            Camper
          </PortletHeader>
          <table className='table table-hover'>
            <thead className='thead-ligth'>
              <tr>
                <th>#</th>
                <th>
                  firstname
                </th>
                <th>
                  lastname
                </th>
                <th>
                  status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  1011
                </th>
                <th>DekDok</th>
                <th>Kamdor</th>
                <th><Badge className='badge badge-success'>บพ.</Badge><Badge className='badge badge-danger'>ผู้ปกครอง.</Badge></th>
              </tr>
            </tbody>
          </table>
        </XLportlet>
      </Layout>
    </div>
  )
export default Approve
