import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  box-shadow : 0px 1px 15px 1px rgba(81, 77, 92, 0.08);
  width:100% !important;
  padding:1.8em 1.5em 1em 1.5em;
  letter-spacing:.028em;
  position:relative;
  min-height:130px;
  overflow:hidden;
`
const HeroText = styled.h1`
  font-size:3.5em;
  margin:0;
  display:block;
  align-self:bottom;
  color:#40A6D2;
`
const Icon = styled.img`
  max-width:100px;
  position:absolute;
  bottom:0;
  left:-2em;
  opacity:0.3;
`

const Portlet = props => (
  <div>
    <Box>
      <p className='text-right mb-0'>{props.title}</p>
      <HeroText className='text-right'>{props.herotext}</HeroText>
      <Icon src={props.image} />
    </Box>
  </div>
)

export default Portlet
