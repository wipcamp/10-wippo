import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import FacebookLogin from 'react-facebook-login'
import {Wrapper, IndexTemplate} from '../layout/layout'
import { appId, fields, scope } from './facebook.json'
import {responser} from '../util/auth'

const Box = styled.div`
  margin: 2em 0;
`

const Login = () => (
  <Wrapper>
    <h1>WIP Camp #10</h1>
    <h3>Management System</h3>
    <h6>Made with ♥ by 10 I'm Developer.</h6>
    <Box>
      <FacebookLogin
        appId={appId}
        fields={fields}
        scope={scope}
        // onClick={() => setLoad(true)}
        callback={(res) => responser(res)}
        icon={<Icon name='facebook f' />}
        textButton={`Login with Facebook`}
        cssClass='btn btn-primary btn-lg animated fadeInUp blink'
        tag={`button`}
      />
    </Box>
  </Wrapper>
)

const Index = () => (
  <IndexTemplate>
    <Login />
  </IndexTemplate>
)

export default Index
