import React from 'react'
import Mportlet from '../portlet/mportlet'
import styled from 'styled-components'

const Number = styled.div`
padding-top:22px;
padding-left:200px;
font-size:77px;
`
const ParentConfirmationPortlet = () => (
  <Mportlet>
    ใบอนุญาติผู้ปกครอง
    <Number>
      {160}
    </Number>
  </Mportlet>
)

export default ParentConfirmationPortlet
