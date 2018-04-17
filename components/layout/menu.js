import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import { Menu } from 'semantic-ui-react'
import Link from 'next/link'

const StyledMenu = styled(Menu)`
  background:transparent !important;
  border:0 !important;
  box-shadow:none !important;
`
const StyledLink = styled.a`
  font-family: 'Prompt';
  cursor: pointer;
  padding:.92857143em 1.64285714em !important;
  font-size:1.1em !important;
  color:#fff !important;
  border-radius: 4px !important;
  &:hover{
    background:rgb(58, 165, 212) !important;
  }
  &:active{
    background:rgb(42, 150, 197) !important;
  }
  &:before{
    width:0 !important;
  }
`
injectGlobal`
  .ui.menu .item{
    padding:0;
  }
`
// const MenuNames = ['Dashboard', 'Document', 'Itim Management']
export const MenuNames = [
  {
    menuName: 'Dashboard',
    link: '/dashboard'
  },
  // {
  //   menuName: 'Document',
  //   link: '/approve'
  // },
  // {
  //   menuName: 'Check Answer',
  //   link: '/checkanswer'
  // },
  // {
  //   menuName: 'Itim Management',
  //   link: '/itim'
  // },
  {
    menuName: 'Approve Slip',
    link: '/slip'
  },
  {
    menuName: 'Camper Management',
    link: '/camper'
  },
  {
    menuName: 'Logout',
    link: '/logout'
  }
]

class MyMenu extends React.Component {
  render () {
    return (
      <StyledMenu>
        {
          MenuNames.map((menu, i) => menu.menuName !== 'Logout' ? <Menu.Item key={i}>
            <Link href={`${menu.link}`}><StyledLink>{menu.menuName}</StyledLink></Link>
          </Menu.Item> : <span />
          )
        }
      </StyledMenu>
    )
  }
}

export default MyMenu
