import React from 'react'
import styled from 'styled-components'
import ProfileList from './profilelist'

const Content = styled.div`
  display: block;
  position: absolute;
  width: 250px;
  z-index: 1;
  background-color: #ffffff;
  box-shadow: 0px 0px 15px 1px rgba(69, 65, 78, 0.2);
`

const Title = styled.div`
  background-color: #9b59b6;
  padding: 4px;
`

const AccountName = styled.div`
  width: 100%;
  text-align: right;
  padding-right: 30px;
  font-size: 33px;
`
const Email = styled.span`
  color: #ecf0f1;
`
const Header = props => (
  <div>
    <Title>
      <span>Hi!</span>
      <AccountName>{props.name}</AccountName>
      <Email>{props.mail}</Email>
    </Title>
  </div>
)

const Dropdown = props => (
  <div>
    <Content>
      <Header name={props.name} mail='dev10@wip.camp' />
      <ProfileList icon='user'>
        <span>Wippo Profile</span>
      </ProfileList>
      <ProfileList icon='flag'>Activity</ProfileList>
      <ProfileList icon='comment'>Message</ProfileList>
      <ProfileList icon='life-ring'>Support</ProfileList>
    </Content>
  </div>
)
export default Dropdown
