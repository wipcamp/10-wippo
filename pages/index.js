import React from 'react'
import styled from 'styled-components'
const Wrapper = styled.div`
  min-height:70vh;
  justify-content:center;
  align-items:center;
  display:flex;
  flex-direction: column;
`
const BackgroundWrapper = styled.div`
  background-image:url('/static/img/loginbg.png');
  background-size: cover;
  width:100%;
  height:100vh;
  max-height:100vh;
`
const Box = styled.div`
  box-shadow : 0px 1px 15px 1px rgba(81, 77, 92, 0.08);
  background:#fff;
  padding:2em;
  border-radius:5px;

`
const FacebookLogin = styled.div`
  background-image:url('https://webgradients.com/public/webgradients_png/028%20Plum%20Plate.png');
  border-radius:5px;
  padding: 1em 1.6em;
  color:white;
  font-size:1.2em;
`
const Topic = styled.h1`
  color:white;
  font-size:5em;
  text-shadow: -1px 0px 25px rgba(81, 77, 92, 0.6);
  text-align:center;
`
class Login extends React.Component {
  render () {
    return (
      <div>
        <BackgroundWrapper>
          <Wrapper>
            <Topic>WIPCAMP<br />MANAGEMENT</Topic>
            <Box><FacebookLogin>Login with facebook</FacebookLogin></Box>
          </Wrapper>
        </BackgroundWrapper>
      </div>
    )
  }
}
export default Login
