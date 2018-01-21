import React from 'react'
import styled from 'styled-components'
import TopNav from './topnav'
import Menu from './menu'
import Dropdown from './dropdown'
const Logo = styled.div`
  height:20px;
  background-color:#282a3c;
`
const SubHeader = styled.div`
  padding:50px 50px 10px 0px;
`
const SubHeaderText = styled.h3`
  font-weight:500;
  font-size:1.2em;
  color:#3f4047;
  font-family: 'Roboto', sans-serif;
`
const ContentContainer = styled.div`
  padding:30px 40px;
  margin-left:90px;
  `
const LeftNav = styled.div`
  height:100%;
  z-index:1;
  background-color: #2c2e3e;
`
const DropdownContainer = styled.div`
  padding-left:1062px;
  position:absolute
`
const Mainbox = styled.div`
  background-color:#f8f9fa;
  min-height:100%;
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
      <div className='container-fluid px-0'>
        <div className='row no-gutters'>
          <LeftNav className='position-fixed col-1'>
            <Logo />
            <Menu />
          </LeftNav>
          <div className='col'>
            <TopNav clickHandeler={this.toggleDropdown} />
            <DropdownContainer>
              <Dropdown name='wipper'isOpen={this.state.dropdown} />
            </DropdownContainer>
            <Mainbox>
              <ContentContainer>
                <SubHeader>
                  <SubHeaderText>{this.props.subheadertext}</SubHeaderText>
                </SubHeader>
                {this.props.children}
              </ContentContainer>
            </Mainbox>
          </div>
        </div>
      </div>
    )
  }
}
export default Layout
