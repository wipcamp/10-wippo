import React from 'react'
import styled from 'styled-components'
import { Container, Grid } from 'semantic-ui-react'

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
  src: 'https://cdn.worldvectorlogo.com/logos/wordpress-icon.svg'
})`
max-width:60px;
`
const GreetingMember = styled.span`
  color:#b1b5c1;
  font-weight:600;
`
const MemberName = styled.span`
  color:#3eb9f3;
`
const AvatarImg = styled.img.attrs({
  src: '/static/img/avata-mockup2.jpg'
})`
  border-radius:50%;
  max-width:50px;
  border : 1px solid #333;
  margin:15px;
`

const Header = () => (
  <div>
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <HeaderBox>
              <Logo />
              <UserBox>
                <GreetingMember>Hello, <MemberName>Farang</MemberName></GreetingMember>
                <AvatarImg />
              </UserBox>
            </HeaderBox>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </div>
)
export default Header
