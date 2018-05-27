import React from 'react'
import Router from 'next/router'
import {Wrapper, IndexTemplate} from '../layout/layout'

export default class Main extends React.Component {
  componentDidMount () {
    setTimeout(() => {
      Router.push('/')
    }, 3000)
  }
  render () {
    return (
      <IndexTemplate>
        <Wrapper>
          <h1>Register Complete!</h1>
          <h3>Thanks for Register</h3>
          <h6>redirect to home...</h6>
        </Wrapper>
      </IndexTemplate>
    )
  }
}
