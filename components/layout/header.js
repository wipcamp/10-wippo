import React from 'react'
import {compose, withState, lifecycle} from 'recompose'
import styled, { injectGlobal } from 'styled-components'
import { Container, Grid } from 'semantic-ui-react'
import Menu from './menu.js'
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
`
const MemberName = styled.span`
  color:#3eb9f3;
`
const AvatarImg = styled.img.attrs({
  src: props => props.img
})`
  border-radius:50%;
  max-width:50px;
  border : 1px solid #333;
  margin:15px;
`
injectGlobal`
  .nav-bg{
    background:#5eb9e2;
  }
`
const Header = ({user: {provider_acc: providerAcc, account_name: accountName}}) => (
  <div>
    <Container fluid>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <HeaderBox>
                <Logo />
                <UserBox>
                  <GreetingMember>Hello, <MemberName>{accountName}</MemberName></GreetingMember>
                  <AvatarImg img={`https://graph.facebook.com/v2.12/${providerAcc}/picture?height=1000&width=1000`} />
                </UserBox>
              </HeaderBox>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container> {/* End Container */}
      <Grid className='nav-bg'>
        <Grid.Row>
          <Container>
            <Grid.Column>
              <Menu />
            </Grid.Column>
          </Container>
        </Grid.Row>
      </Grid>
    </Container>
  </div>
)
export default compose(
  withState('user', 'setUser', {
  }),
  lifecycle({
    async componentDidMount () {
      let user = await JSON.parse(window.localStorage.getItem('user'))
      this.props.setUser(user)
    }
  })
)(Header)
