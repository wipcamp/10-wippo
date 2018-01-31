import React from 'react'
import { injectGlobal } from 'styled-components'
import { Menu } from 'semantic-ui-react'

injectGlobal`
  .menu-bg{
    background:transparent !important;
    border:0 !important;
    box-shadow:none !important;
  }
  .menu-bg .item{
    padding:.92857143em 1.64285714em;
    font-size:1.1em;
  }
  .menu-bg .item.active{
    background:rgb(58, 165, 212) !important;
  }
  .menu-bg .item:before{
    width:0 !important;
  }
`

const MyMenu = () => (
  <Menu className='menu-bg'>
    <Menu.Item active>
      Dashboard
    </Menu.Item>
    <Menu.Item>
      Document
    </Menu.Item>
    <Menu.Item>
      Itim Management
    </Menu.Item>
  </Menu>
  
)
export default MyMenu
