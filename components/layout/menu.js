import React from 'react'
import styled from 'styled-components'
import List from './menulist'
const UnorderedList = styled.ul`
  list-style:none;
  padding:40px 0 30px 0;
`
const Menu = () => (
  <UnorderedList>
    <List active icon='chart-line' text='Dashboard' />
    <List icon='check-square' text='Approve Document' />
    <List icon='file-word' text='Check Answer' />
    <List icon='user' text='Itim Management' />
    <List icon='user-secret' text='Staff Management' />
  </UnorderedList>
)
export default Menu
