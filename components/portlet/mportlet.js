import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
box-shadow:0px 1px 15px 1px rgba(69, 65, 78, 0.08);
-webkit-box-shadow:0px 1px 15px 1px rgba(69, 65, 78, 0.08);
background-color:#fff;
margin-bottom:2.2rem;
padding:8px
`
const Mportlet = props => (
  <div>
    <Box>
      {props.children}
    </Box>
  </div>
)

export default Mportlet
