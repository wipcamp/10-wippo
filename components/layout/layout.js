import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import Header from './header'
import { Container, Grid } from 'semantic-ui-react'
import Footer from './footer'

const StyledLayout = styled.div`
  font-family: 'Prompt';
  html, body, h1, button, h3, h4, h6 {
    font-family: 'Prompt';
  }
`

const SubHeader = styled.div`
  padding: 50px 25px 0 0px;
`
const SubHeaderText = styled.h3`
  font-weight: 500;
  font-size: 1.6em;
  color: #3f4047;
`
injectGlobal`
  .fullpage{
    min-height:86vh;
  }
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
      <StyledLayout>
        <Header />
        <div className='container-fluid fullpage'>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <SubHeader>
                  <SubHeaderText className='mb-3'>{this.props.subheadertext}</SubHeaderText>
                </SubHeader>
              </div>
            </div>
            {this.props.children}
          </div>
        </div>
        <Footer />
      </StyledLayout>
    )
  }
}
export default Layout

export const ContainerWarpper = styled.div`
  min-height: 100vh;
`
export const Wrapper = styled.div`
  min-height:100vh;
  justify-content:center;
  align-items:flex-start;
  display:flex;
  flex-direction: column;
  padding: 0 2em;
  color: #fff;

  h1, h3, h6 {
    margin: 0;
  }
  h3, h6 {
    font-style: italic;
  }
  h6 {
    margin-top: .5em;
  }

  @media (min-width: 768px) {
    color: #676c7b;
    h6 {
      color: #bdbcbc;
    }
  }
`
export const BackgroundWrapper = StyledLayout.extend`
  width:100%;
  height:100vh;
  max-height:100vh;
`
export const DevBackground = styled.div`
  background-image: url('/static/img/wipcamp.jpg');
  background-size: cover;
  background-position: bottom center;
  padding: 0;
`
export const Faded = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;
  opacity: .25;
  padding: 0;
`
export const Background = styled.div`
  background: linear-gradient(135deg, #00c5dc 30%, #716aca 100%);
  @media (min-width: 768px) {
    background: #fff;
  }
`

export class IndexTemplate extends React.Component {
  render () {
    return (
      <BackgroundWrapper className={`container-fluid`}>
        <ContainerWarpper className='row'>
          <DevBackground className='col-12 col-md-6'>
            <Faded />
          </DevBackground>
          <Background className='col-12 col-md-6'>
            {this.props.children}
          </Background>
        </ContainerWarpper>
      </BackgroundWrapper>
    )
  }
}
