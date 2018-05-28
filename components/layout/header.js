import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import Menu, { MenuNames } from './menu'
import Link from 'next/link'

injectGlobal`
  .nav-bg{
    background:#5eb9e2;
  }
`
const Logo = styled.img.attrs({
  src: '/static/img/logofinals.png'
})`
  max-height: 60px;
  width: auto;
`
const GreetingMember = styled.span`
  color:#b1b5c1;
  font-weight:600;
  text-align: center;
  font-size: 15px;
  text-align:right;
`
const MemberName = styled.span`
  color:#3eb9f3;
`
const AvatarImg = styled.img.attrs({
  src: props => props.img
})`
  cursor: pointer;
  border-radius:50%;
  max-width:50px;
  border : 1px solid #333;
  margin:15px;
  margin-left:0;
`
const UserId = styled.span`
  font-size: 20px;
  color: #ff9090;
`
const RelativeBlock = styled.div`
  position: relative;
`
const Dropdown = styled.div`
  text-align: center;
  padding: .7em 1em .3em;
  display: ${props => props.show ? 'block' : 'none'};
  min-height: 35px;
  width: 300px;
  right: -16px;
  bottom: -2.5em;
  background-color: #fff;
  position: absolute;
  border-radius: 5px;
  box-shadow: 1px 3px 13px 2px rgba(0, 0, 0, .1);
  z-index: 9999;
`
const List = styled.a`
  cursor: pointer;
  width: 100%;
  min-height: 20px;
  font-size: 1.5em;
  text-align: center;
  transition: .3s;
  color: #b1b5c1;
  &:hover {
    color: #000;
  }
`
const Arrow = styled.div`
  position: absolute;
  top: -1em;
  right: 2em;
  width: 0; 
  height: 0;
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
  border-bottom: 15px solid #fff;
`
const Button = [
  { name: 'Edit Profile', path: '/profile' },
  { name: 'Logout', path: '/logout' }
]
const ListRelative = styled.li`
  position:relative;
`
const StyledNav = styled.nav`
  @media (max-width: 991px){
    background:#5eb9e2;
  }
`
const MobileList = styled.p`
  font-size:1.2em;
  padding:0.5em 0;
  color:#3fa6d2;
  margin: 1em 0 !important;
`
const NavCollapseContainer = styled.div`
  background-color:#f9f9f9;
`

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      user: {},
      show: false,
      isOpen: false
    }
  }
  async componentDidMount () {
    let user = await JSON.parse(window.localStorage.getItem('user'))
    this.setUser(user)
  }

  setUser = (user) => {
    this.setState({
      user
    })
  }
  setShow = (show) => {
    this.setState({
      show
    })
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render () {
    return (
      <RelativeBlock>
        <StyledNav className='navbar navbar-expand-lg navbar-light'>
          <div className='container'>
            <Logo />
            <button onClick={this.toggle} className='navbar-toggler d-lg-none' type='button' data-toggle='collapse'>
              <span className='navbar-toggler-icon' />
            </button>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
              <ul className='navbar-nav ml-auto'>
                <ListRelative className='nav-item'>
                  <div className='row'>
                    <div className='col-9 align-self-center'>
                      <GreetingMember>
                        Hello, <MemberName>{this.state.user.account_name}</MemberName> <br />
                        <UserId>WIP ID : {this.state.user.id}</UserId>
                      </GreetingMember>
                    </div>
                    <div className='col-3'>
                      <AvatarImg onClick={() => this.setShow(!this.state.show)} img={`https://graph.facebook.com/v2.12/${this.state.user.provider_acc}/picture?height=1000&width=1000`} />
                    </div>
                  </div>
                  <Dropdown show={this.state.show}>
                    <Arrow />
                    {
                      Button.map(({name, path}) => <List key={name} href={path}>{name}</List>)
                    }
                  </Dropdown>
                </ListRelative>
              </ul>
            </div>
          </div>
        </StyledNav>
        {
          this.state.isOpen ? (
            <NavCollapseContainer className='container-fluid'>
              <div className='container'>
                <div className='row'>
                  <div className='col'>
                    {
                      MenuNames.map((menu, i) => <MobileList key={i}>
                        <Link href={`${menu.link}`}><a>{menu.menuName}</a></Link>
                      </MobileList>
                      )
                    }
                  </div>
                </div>
              </div>
            </NavCollapseContainer>
          ) : (<div />)
        }
        <div className='container-fluid d-none d-lg-block d-xl-block'>
          <div className='row nav-bg'>
            <div className='container'>
              <div className='row'>
                <div className='col'>
                  <Menu className='' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </RelativeBlock>
    )
  }
}

export default Header
