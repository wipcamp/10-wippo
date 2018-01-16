import React from 'react'
import styled from 'styled-components'
import List from '../components/list'
import Droupdown from './droupdown'

const TopNav = styled.div`
  width:100%;
  height:80px;
  box-shadow:0px 1px 15px 1px rgba(69, 65, 78, 0.1);
  display:flex;
`
const Logo = styled.div`
  height:80px;
  background-color:#282a3c;
`
const UnorderedList = styled.ul`
  list-style:none;
  padding:40px 0 30px 0;
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
const AvatarImg = styled.img`
  border-radius:50%;
  max-width:50px;
  border : 1px solid #333;
  margin:15px;
`

const Layout = (props) => (
  <div className='container-fluid px-0'>
    <div className='row no-gutters'>
      <div className='col-1 h-100vh sidenav-bg'>
        <Logo />
        <UnorderedList>
          <List active icon='car' text='Dashboard' />
          <List icon='coffee' text='eiei2' />
          <List icon='bullhorn' text='eiei3' />
          <List icon='dollar-sign' text='eiei4' />
        </UnorderedList>
      </div>
      <div className='col'>
        <TopNav>
          <Droupdown className='ml-auto' name={'WIPPER'} isOpen={true}/>
          <div className='ml-auto' >
            <AvatarImg src='/static/img/avata-mockup.jpg' />
          </div>
        </TopNav>
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
