import React from 'react'
import {compose, withState, lifecycle} from 'recompose'
import styled, { injectGlobal } from 'styled-components'
import { Container, Grid } from 'semantic-ui-react'
import Menu from './menu.js'

injectGlobal`
  .nav-bg{
    background:#5eb9e2;
  }
`

const HeaderBox = styled.div`
  height:90px;
  display:flex;
  align-items:center;
`
const UserBox = styled.div`
  margin-left:auto;
  display:flex;
  align-items: center;
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
  right: 1.5em;
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
  { name: 'Logout', path: '/logout' }
]

const StyledNav = styled.nav`
  @media (max-width: 991px){
    background:#5eb9e2;
  }
`

const Header = ({show, setShow, user: {id, provider_acc: providerAcc, account_name: accountName}}) => (
  // <RelativeBlock>
  //   <div className='container-fluid'>
  //     <div className='container'>
  //       <div className='row'>
  //         <div className='col-12 d-none d-lg-block'>
  //           <HeaderBox>
  //             <Logo />
  //             <UserBox>
  //               <GreetingMember>
  //                 Hello, <MemberName>{accountName}</MemberName> <br />
  //                 <UserId>WIP ID : {id}</UserId>
  //               </GreetingMember>
  //               <AvatarImg onClick={() => setShow(!show)} img={`https://graph.facebook.com/v2.12/${providerAcc}/picture?height=1000&width=1000`} />
  //               <Dropdown show={show}>
  //                 <Arrow />
  //                 {
  //                   Button.map(({name, path}) => <List key={name} href={path}>{name}</List>)
  //                 }
  //               </Dropdown>
  //             </UserBox>
  //           </HeaderBox>
  //         </div>
  //         <div className='col-12'>
  //           s
  //         </div>
  //       </div>
  //     </div> {/* End Container */}
  //     <div className='row nav-bg'>
  //       <div className='container'>
  //         <div className='col'>
  //           <Menu />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </RelativeBlock><RelativeBlock>
  //   <div className='container-fluid'>
  //     <div className='container'>
  //       <div className='row'>
  //         <div className='col-12 d-none d-lg-block'>
  //           <HeaderBox>
  //             <Logo />
  //             <UserBox>
  //               <GreetingMember>
  //                 Hello, <MemberName>{accountName}</MemberName> <br />
  //                 <UserId>WIP ID : {id}</UserId>
  //               </GreetingMember>
  //               <AvatarImg onClick={() => setShow(!show)} img={`https://graph.facebook.com/v2.12/${providerAcc}/picture?height=1000&width=1000`} />
  //               <Dropdown show={show}>
  //                 <Arrow />
  //                 {
  //                   Button.map(({name, path}) => <List key={name} href={path}>{name}</List>)
  //                 }
  //               </Dropdown>
  //             </UserBox>
  //           </HeaderBox>
  //         </div>
  //         <div className='col-12'>
  //           s
  //         </div>
  //       </div>
  //     </div> {/* End Container */}
  //     <div className='row nav-bg'>
  //       <div className='container'>
  //         <div className='col'>
  //           <Menu />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </RelativeBlock>
  <RelativeBlock>
    <StyledNav className='navbar navbar-expand-lg navbar-light'>
      <div className='container'>
        <Logo className='' />
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              {/* <Logo /> */}
            </li>
          </ul>
        </div>
      </div>
    </StyledNav>
  </RelativeBlock>
)
export default compose(
  withState('user', 'setUser', {}),
  withState('show', 'setShow', false),
  lifecycle({
    async componentDidMount () {
      let user = await JSON.parse(window.localStorage.getItem('user'))
      this.props.setUser(user)
    }
  })
)(Header)
