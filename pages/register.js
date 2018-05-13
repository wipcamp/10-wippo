import React from 'react'
import RegisterComponent from '../components/register/Main'
import { compose } from 'recompose'
import wrapper from '../store/wrapper'

const Regis = (props) => (
  <RegisterComponent {...props} />
)

export default compose(
  wrapper
)(Regis)
