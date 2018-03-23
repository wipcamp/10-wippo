import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.div`
  width:100%;
  background-color:#5eb9e2;
  text-align:center;
  font-weight:bold;
  color:#fff;
  padding-top:8px;
  padding-bottom:8px;
  margin-top:50px;
`

const Footer = () => (
  <div>
    <FooterContainer>Made with ❤ by 10 Developer</FooterContainer>
  </div>
)

export default Footer
