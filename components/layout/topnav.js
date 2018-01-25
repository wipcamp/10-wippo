import React from 'react'
import styled from 'styled-components'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

const TopNavBox = styled.div`
  text-align:right;
  width:100%;
  height:80px;
  box-shadow:0px 1px 15px 1px rgba(69, 65, 78, 0.1);
  display:flex;
  justify-content:flex-end;
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
    <div onClick={props.clickHandeler}>
      <AvatarImg src={avata} />
    </div>
  </TopNavBox>
)
const state = { visible: true }
const sideBar = () => (
  <div>
    <Sidebar as={Menu} animation='push' direction='top' visible={state.visible} inverted>
      <Menu.Item name='home'>
        <Icon name='home' />
        Home
      </Menu.Item>
      <Menu.Item name='gamepad'>
        <Icon name='gamepad' />
        Games
      </Menu.Item>
      <Menu.Item name='camera'>
        <Icon name='camera' />
        Channels
      </Menu.Item>
    </Sidebar>
  </div>
)

export default sideBar
