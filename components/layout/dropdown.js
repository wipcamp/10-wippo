import React from 'react'
import styled from 'styled-components'
import ProfileList from './profilelist'

const Content = styled.div`
  display:block
  position: absolute;
  width: 200px;
  z-index: 1;
  background-color: #ffffff;
  box-shadow: 0px 0px 15px 0px rgba(69, 65, 78, 0.2);
`

const Title = styled.div`
  background-color: #9b59b6;
  padding: 4px;
`

const AccountName = styled.div`
  width: 100%;
  padding-left: 2px;
  font-size: 33px;
`
const Email = styled.div`
  color: #ecf0f1;
`
const Arrow = styled.div`
  margin-left:168px;
  width: 0; 
  height: 0; 
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  border-bottom: 16px solid #9b59b6;
  position: relative  ;
  z-index:1;
  `
const Header = props => (
  <div>
    <Title>
      <span>Hi! Wippo</span>
      <AccountName>{props.name}</AccountName>
      <Email>{props.mail}</Email>
    </Title>
  </div>
)

const Dropdown = props => {
  if(props.isOpen  == true ){
    return(
      <div>
        <Arrow/>
        <Content>
          <Header name='eggcat' mail='dev10@wip.camp' img={props.img} />
          <ProfileList icon='user'>
            <span>Wippo Profile</span>
          </ProfileList>
          <ProfileList icon='flag'>Activity</ProfileList>
          <ProfileList icon='comment'>Message</ProfileList>
          <ProfileList icon='life-ring'>Support</ProfileList>
        </Content>
      </div>
    )
  }else{
    return(
      <div/>
    )
  }
}
export default Dropdown
