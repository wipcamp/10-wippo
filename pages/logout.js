import React from 'react'
import {IndexTemplate, Wrapper} from '../components/layout/layout'
import {logout} from '../components/util/auth'

export default class Logout extends React.Component {
  componentDidMount () {
    logout()
  }
  render () {
    return (
      <IndexTemplate>
        <Wrapper className='row'>
          <div className='col-12 flex-column d-flex justify-content-center align-items-start'>
            <h1>Logout</h1>
            <h3>Success</h3>
            <h6>Made with ♥ by 10 I'm Developer.</h6>
            <a href='/' className='mt-4 btn btn-primary btn-lg'>Home</a>
          </div>
        </Wrapper>
      </IndexTemplate>
    )
  }
}
