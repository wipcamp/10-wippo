import React from 'react'
import styled from 'styled-components'
import TopNav from './topnav'
import Menu from './menu'
import Dropdown from './dropdown'
const Logo = styled.div`
  height: 80px;
  background-color: #282a3c;
`
const SubHeader = styled.div`
  padding: 50px 50px 0 50px;
`
const SubHeaderText = styled.h3`
  font-weight: 500;
  font-size: 1.2em;
  color: #3f4047;
  font-family: 'Roboto', sans-serif;
`
const ContentContainer = styled.div`
  padding: 30px 50px;
`
const LeftNav = styled.div`
  position:fixed;
  height:100%;
  background-color: #2c2e3e;
  z-index:1;
  width:130px;
`
const DropdownContainer = styled.div`
  right: 224px;
  position: absolute;
`
const Mainbox = styled.div`
  height:100%;
  margin-left:130px;
  background-color: #f8f9fa;
`
class Layout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dropdown: false
    }
    this.toggleDropdown = this.toggleDropdown.bind(this)
  }

  toggleDropdown () {
    this.setState({
      dropdown: !this.state.dropdown
    })
  }

  render () {
    return (
      <div>
        <LeftNav>
          <Logo />
          <Menu />
        </LeftNav>
        <Mainbox >
          <TopNav clickHandeler={this.toggleDropdown} />
          <DropdownContainer>
            <Dropdown name='wipper' isOpen={this.state.dropdown} />
          </DropdownContainer>
          <SubHeader>
            <SubHeaderText>{this.props.subheadertext}</SubHeaderText>
          </SubHeader>
          <ContentContainer>{this.props.children}</ContentContainer>
        </Mainbox>
      </div>
    )
  }
}
export default Layout
