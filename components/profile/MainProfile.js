import React from 'react'
import getCookie from '../util/cookie'
import api from '../util/axios'
import { compose, lifecycle } from 'recompose'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Router from 'next/router'

import { actions as profileActions } from '../../store/modules/profile'
import FormRegis from './FormProfile'
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
  const { profile } = props
  return (
    <div>
      <BackgroundContainer>
        <div className='container'>
          <Alert
            showDialog={profile.showDialog}
            error={profile.error}
            message={profile.dialogMessage}
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
      profile: state.profile
    }),
    { ...profileActions }
  ),
  reduxForm({
    form: 'profile',
    validate,
    onSubmitFail: (err, __, ___, props) => props.onSubmitError(err)
  }),
  lifecycle({
    async componentDidMount () {
      const user = window && await JSON.parse(window.localStorage.getItem('user'))
      const { token } = await getCookie({ req: false })
      const profile = await api.get(`/profiles/${user.id}`, {
        Authorization: `Bearer ${token}`
      })
      const userProfile = {
        ...profile.data,
        ...profile.data.profile_registrant
      }
      this.props.initialize(userProfile)
    },
    componentWillReceiveProps (nextProps) {
      if (nextProps.profile.step > 1) {
        Router.push('/complete')
      }
    }
  })
)(MainRegister)
