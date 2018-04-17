import React from 'react'
import IndexPage from '../components/index/Main'

import { injectGlobal } from 'styled-components'

class Login extends React.Component {
  componentWillMount () {
    injectGlobal`
      html, body, h1, button, h3, h6 {
        font-family: 'Prompt' !important;
      }
    `
  }
  render () {
    return (
      <IndexPage />
    )
  }
}

export default Login
