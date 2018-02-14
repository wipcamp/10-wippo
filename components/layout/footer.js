import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.div`
  width:100%;
  background-color:#5eb9e2;
  text-align:center;
  font-weight:bold;
  color:#fff;
  padding-top:5px;
  padding-bottom:5px;
  margin-top:50px;
`

const Footer = () => (
  <div>
    <FooterContainer>&lt;/&gt; with VScode</FooterContainer>
  </div>
)

export default Footer
