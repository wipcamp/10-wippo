import React from 'react'
import styled from 'styled-components'

const TopNavBox = styled.div`
  width:100%;
  height:80px;
  box-shadow:0px 1px 15px 1px rgba(69, 65, 78, 0.1);
  display:flex;
  background-color:#fff;
`
const AvatarImg = styled.img`
  border-radius:50%;
  max-width:50px;
  border : 1px solid #333;
  margin:15px;

`

const avata = '/static/img/avata-mockup2.jpg'

const TopNav = props => (
  <TopNavBox>
    <div className='ml-auto' onClick={props.clickHandeler}>
      <AvatarImg src={avata} />
    </div>
  </TopNavBox>
)
export default TopNav
