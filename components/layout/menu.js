import React from 'react'
import styled from 'styled-components'
import { Menu } from 'semantic-ui-react'

const StyledMenu = styled(Menu)`
  background:transparent !important;
  border:0 !important;
  box-shadow:none !important;
`
const StyledMenuItem = styled(Menu.Item)`
  padding:.92857143em 1.64285714em !important;
  font-size:1.1em !important;
  color:#fff !important;
  &:active{
    background:rgb(58, 165, 212) !important;
  }
  &:before{
    width:0 !important;
  }

  ${props => props.active === 'dashboard' && `
    background:rgb(58, 165, 212) !important;
  `}
`
const MenuNames = ['Dashboard', 'Document', 'Itim Management']

const ListMenu = MenuNames.map((MenuName) => <StyledMenuItem active={this.state.page} >{MenuName}</StyledMenuItem>)

class MyMenu extends React.Component {
  render () {
    return (
      <StyledMenu>
        {
          ListMenu
        }
      </StyledMenu>
    )
  }
}

export default MyMenu
