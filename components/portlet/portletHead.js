import React from 'react'
import styled from 'styled-components'

const Head = styled.div`
border-bottom:1px solid #ebedf2;
padding: 6px;
font-size: 24px;
`

const PortletHeader = props => (
  <div>
    <Head>
      {props.children}
    </Head>
  </div>
)

export default PortletHeader
