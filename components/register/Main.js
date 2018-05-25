import React from 'react'
import { compose, lifecycle, withProps } from 'recompose'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Router from 'next/router'

import {actions as registerActions} from '../../store/modules/register'
import FormRegis from './FormRegis'
import Alert from '../core/Alert'
import { validate } from '../core/validateForm'

const Image = styled.img`
  max-width: 340px;
`

const BackgroundContainer = styled.div`
  background-color: #5eb9e2;
  min-height: 100vh;
  height: auto;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
`

export const MainRegister = props => {
  const { regis } = props
  return (
    <div>
      <BackgroundContainer>
        <div className='container'>
          <Alert
            showDialog={regis.showDialog}
            error={regis.error}
            message={regis.dialogMessage}
            hideDialog={props.hideDialog}
          />
          <div className='row '>
            <div className='col-12 mt-4 col-md-6 mx-auto text-center justify-content-center'>
              <Image src='/static/img/logofinals.png' className='img-fluid mb-3' alt='wipcamp-logo' />
            </div>
            <div className='col-12 col-md-10 mx-auto text-center' >
              <FormRegis {...props} />
            </div>
          </div>
        </div>
      </BackgroundContainer>
    </div>
  )
}

export default compose(
  connect(
    state => ({
      regis: state.register
    }),
    { ...registerActions }
  ),
  reduxForm({
    form: 'register',
    validate,
    onSubmitFail: (err, __, ___, props) => props.onSubmitError(err)
  }),
  lifecycle({
    componentWillReceiveProps (nextProps) {
      if (this.props.regis.step === 1 && nextProps.regis.step === 2) {
        this.props.insertStaff()
      } else if (nextProps.regis.step > 2) {
        Router.push('/dashboard')
      }
    }
  })
)(MainRegister)
