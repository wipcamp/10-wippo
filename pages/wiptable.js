import React from 'react'
import Layout from '../components/layout/layout'
import Wipcalendar from '../components/timetable/Main'

const Breadcrumb = () => (
  <ol className='breadcrumb'>
    <li className='breadcrumb-item active'>WIPTable</li>
  </ol>
)

export default (props) => (
  <Layout subheadertext={<Breadcrumb />}>
    <Wipcalendar props={props} />
  </Layout>
)
