import React from 'react'
import styled from 'styled-components'
import { Sidebar, Menu, Icon } from 'semantic-ui-react'
import Dropdown from './dropdown'

const DropdownContainer = styled.div`
  right: 224px;
  position: absolute;
`
const AvatarImg = styled.img`
  border-radius:50%;
  max-width:50px;
  border : 1px solid #333;
  margin:15px;

`

const avata = '/static/img/avata-mockup2.jpg'

const state = { visible: true }
const sideBar = () => (
  <div>
    <Sidebar as={Menu} animation='push' direction='top' visible={state.visible} inverted>
      <Menu.Item name='home'>
        <Icon name='dashboard' />
        Dashboard
      </Menu.Item>
      <Menu.Item name='gamepad'>
        <Icon name='file word outline' />
        Approve Document
      </Menu.Item>
      <Menu.Item name='camera'>
        <Icon name='comments' />
        Check Answer
      </Menu.Item>
      <Menu.Item name='home'>
        <Icon name='users' />
        Itim Management
      </Menu.Item>
      <Menu.Item name='home'>
        <Icon name='user circle outline' />
        Staff  Management
      </Menu.Item>
      {/* <DropdownContainer>
        <Dropdown name='wipper' isOpen={state.dropdown} />
      </DropdownContainer> */}
    </Sidebar>
  </div>
)

export default sideBar
