import React from 'react'
import ProfileComponent from '../components/profile/MainProfile'
import { compose } from 'recompose'
import wrapper from '../store/wrapper'

const Profile = (props) => (
  <ProfileComponent {...props} />
)

export default compose(
  wrapper
)(Profile)
