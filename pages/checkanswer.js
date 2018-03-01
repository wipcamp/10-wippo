import React from 'react'
import Layout from '../components/layout/layout'
import Selectanswer from '../components/checkanswer/Selectanswer'
import styled from 'styled-components'

const Formcontainer = styled.div`
  margin-top:100px;
`
const CheckAnswer = () => (
  <Layout subheadertext='Check Answer'>
    <div className='container'>
      <div className='jumbotron'>
        <Selectanswer />
      </div>
    </div>
  </Layout>
)

export default CheckAnswer
