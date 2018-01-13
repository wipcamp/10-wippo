import React from 'react'
import styled from 'styled-components'
// import Dropdown from './dropdown'
const TopNavBox = styled.div`
  width:100%;
  height:80px;
  box-shadow:0px 1px 15px 1px rgba(69, 65, 78, 0.1);
  display:flex;
`
const AvatarImg = styled.img`
  border-radius:50%;
  max-width:50px;
  border : 1px solid #333;
  margin:15px;
`
const TopNav = () => (
  <TopNavBox>
    {/* <Dropdown name={'WIPPER'} /> */}
    <div className='ml-auto'>
      <AvatarImg src='/static/img/avata-mockup2.jpg' />
    </div>
  </TopNavBox>
)
export default TopNav
