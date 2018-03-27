import React from 'react'
import Layout from '../components/layout/layout'
import Itimlobby from '../components/checkanswer/Itimlobby'

const Breadcrumb = () => (
  <ol className='breadcrumb'>
    <li className='breadcrumb-item active'>CheckAnswer</li>
  </ol>
)
const CheckAnswer = () => (
  <Layout subheadertext={<Breadcrumb />}>
    <Itimlobby />
  </Layout>
)

export default CheckAnswer
