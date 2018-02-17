import React from 'react'
import injectGlobal from '../components/layout/injectGlobal'
import IndexPage from '../components/index/Main'

class Login extends React.Component {
  componentWillMount () {
    injectGlobal
  }
  render () {
    return (
      <IndexPage />
    )
  }
}

export default Login
