import React from 'react'
import styled from 'styled-components'
import TopNav from './topnav'
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

const DropdownContainer = styled.div`
  right: 224px;
  position: absolute;
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
        <TopNav clickHandeler={this.toggleDropdown} />
        <DropdownContainer>
          <Dropdown name='wipper' isOpen={this.state.dropdown} />
        </DropdownContainer>
        <SubHeader>
          <SubHeaderText>{this.props.subheadertext}</SubHeaderText>
        </SubHeader>
        <ContentContainer>{this.props.children}</ContentContainer>
      </div>
    )
  }
}
export default Layout
