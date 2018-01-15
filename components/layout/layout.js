import React from 'react'
import styled from 'styled-components'
import TopNav from './topnav'
import Menu from './menu'
import Dropdown from './dropdown'
import dropdown from './dropdown';
const Logo = styled.div`
  height:80px;
  background-color:#282a3c;
`
const SubHeader = styled.div`
  padding:50px 50px 0 50px;
`
const SubHeaderText = styled.h3`
  font-weight:500;
  font-size:1.2em;
  color:#3f4047;
  font-family: 'Roboto', sans-serif;
`
const ContentContainer = styled.div`
  padding:30px 50px;
`
const LeftNav = styled.div`
  height:100vh;
  background-color: #2c2e3e;
`
const DropdownContainer = styled.div`
  padding-left:955px;
  position:absolute
`
const Mainbox = styled.div`
  background-color:#f8f9fa;
  min-height:100%;
`

class Layout extends React.Component{
  constructor(props){
    super(props)
    this.state={
      dropdown:false
    }
    this.toggleDropdown = this.toggleDropdown.bind(this)
  }

  toggleDropdown(){
    this.setState({
      dropdown:!this.state.dropdown
    })
  }

  render(){
    return(
    <div className='container-fluid px-0'>
      <div className='row no-gutters'>
        <LeftNav className='col-1'>
          <Logo />
          <Menu />
        </LeftNav>
        <div className='col'>
          <TopNav clickHandeler={this.toggleDropdown}/>
          <DropdownContainer>
            <Dropdown name='wipper'isOpen={this.state.dropdown}/>
          </DropdownContainer>
          <Mainbox>
            <SubHeader>
              <SubHeaderText>{this.props.subheadertext}</SubHeaderText>
            </SubHeader>
            <ContentContainer>
              {this.props.children}
            </ContentContainer>
          </Mainbox>
        </div>
      </div>
    </div>
  )
  }
}

// const Layout = (props) => (
  // <div className='container-fluid px-0'>
  //   <div className='row no-gutters'>
  //     <LeftNav className='col-1'>
  //       <Logo />
  //       <Menu />
  //     </LeftNav>
  //     <div className='col'>
  //       <TopNav />
  //       <DropdownContainer>
  //         <Dropdown name='wipper'isOpen={droupdown}/>
  //       </DropdownContainer>
  //       <SubHeader>
  //         <SubHeaderText>{props.subheadertext}</SubHeaderText>
  //       </SubHeader>
  //       <ContentContainer>
  //         {props.children}
  //       </ContentContainer>
  //     </div>
  //   </div>
  // </div>
// )
export default Layout
