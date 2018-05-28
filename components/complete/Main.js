import React from 'react'
import {Wrapper, IndexTemplate} from '../layout/layout'

export default class Main extends React.Component {
  render () {
    return (
      <IndexTemplate>
        <Wrapper>
          <h1>Register Complete!</h1>
          <h3>Download Application on PlayStore!</h3>
          <br />
          <div className='row'>
            <div className='col-12'>
              <a href='https://play.google.com/store/apps/details?id=sit.kmutt.wipmobile' className='btn btn-lg btn-success mr-3'>
                <i className='fab fa-android mr-3' />
              Download Android on PlayStore
              </a>
              <a href='/' className='btn btn-lg btn-primary'>Home</a>
            </div>
          </div>
        </Wrapper>
      </IndexTemplate>
    )
  }
}
