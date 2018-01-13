import React from 'react'
import styled from 'styled-components'
import TopNav from './topnav'
import Menu from './menu'
const Logo = styled.div`
  height:80px;
  background-color:#282a3c;
`
const SubHeader = styled.div`
  padding:50px 50px 0 50px;
`
const SubHeaderText = styled.h3`
  font-weight:500;
  font-size:1.2em;
  color:#3f4047;
  font-family: 'Roboto', sans-serif;
`
const ContentContainer = styled.div`
  padding:30px 50px;
`
const LeftNav = styled.div`
  height:100vh;
  background-color: #2c2e3e;
`
const Layout = (props) => (
  <div className='container-fluid px-0'>
    <div className='row no-gutters'>
      <LeftNav className='col-1'>
        <Logo />
        <Menu />
      </LeftNav>
      <div className='col'>
        <TopNav />
        <SubHeader>
          <SubHeaderText>{props.subheadertext}</SubHeaderText>
        </SubHeader>
        <ContentContainer>
          {props.children}
        </ContentContainer>
      </div>
    </div>
  </div>
)
export default Layout
