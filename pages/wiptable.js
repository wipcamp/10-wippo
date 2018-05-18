import React from 'react'
import Layout from '../components/layout/layout'

const Breadcrumb = () => (
  <ol className='breadcrumb'>
    <li className='breadcrumb-item active'>WIPTable</li>
  </ol>
)

export default () => (
  <Layout subheadertext={<Breadcrumb />}>
    calendar comming soooooooooooon!
  </Layout>
)
